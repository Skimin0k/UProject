// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ERC721Handler.sol";

error NotWaiting();
error AuctionNotStarted();
error SingleParticipantRequired();
error InsufficientDeposit();
error NotParticipant();
error AlreadyOwner();
error IncorrectPayment();
error NotCreator();

contract LotRoom is ReentrancyGuard {
    uint256 public tokenID;
    uint256 public initBlock;
    uint256 public finalBlock;
    uint256 public blockStep = 4;
    uint256 public waitingBlocks = 4;
    uint256 public ethStep;
    uint256 public price;
    uint256 public deposit = 0.01 ether;

    address public owner;
    ERC721Handler public nftHandler;

    // internal deposit manager
    mapping(address => uint256) private _deposits;
    uint256 private _memberCount;

    event RoomUpdated(uint256 roomLength);
    event NFTOwnerUpdated(address newOwner);

    constructor(
        ERC721Handler _nftHandler,
        uint256 _tokenID,
        uint256 _ethStep,
        uint256 _price,
        address _owner
    ) {
        tokenID = _tokenID;
        ethStep = _ethStep * 1 wei;
        price = _price * 1 wei;
        initBlock = block.number;
        owner = _owner;
        nftHandler = _nftHandler;

        // initialize handler with this lot’s address
        nftHandler.setLotRoom(address(this));
    }

    modifier onlyWaiting() {
        if (block.number > initBlock + waitingBlocks) revert NotWaiting();
        _;
    }

    modifier onlyStarted() {
        if (block.number <= initBlock + waitingBlocks)
            revert AuctionNotStarted();
        _;
    }

    modifier onlyCreator() {
        if (msg.sender != owner) revert NotCreator();
        _;
    }

    modifier onlySingleParticipant() {
        if (_memberCount != 1) revert SingleParticipantRequired();
        _;
    }

    receive() external payable {}

    function raiseHand() external payable onlyWaiting nonReentrant {
        if (msg.value < deposit) revert InsufficientDeposit();
        if (_deposits[msg.sender] != 0) revert InsufficientDeposit();
        _deposits[msg.sender] = msg.value;
        _memberCount++;
        emit RoomUpdated(_memberCount);
    }

    function downHand() external onlyStarted nonReentrant {
        uint256 userDep = _deposits[msg.sender];
        if (userDep == 0) revert NotParticipant();
        delete _deposits[msg.sender];
        _memberCount--;
        payable(msg.sender).transfer(userDep);
        if (_memberCount == 1) {
            finalBlock = block.number - 1;
        }
        emit RoomUpdated(_memberCount);
    }

    function updateTokenData(bytes calldata newData)
    external
    onlyCreator
    {
        nftHandler.appendData(newData);
    }

    function buy() external payable onlySingleParticipant nonReentrant {
        uint256 userDep = _deposits[msg.sender];
        if (userDep == 0) revert NotParticipant();

        address realOwner = IERC721(address(nftHandler)).ownerOf(tokenID);
        if (realOwner == msg.sender) revert AlreadyOwner();

        uint256 finalPrice = getFinalPrice();
        if (finalPrice > userDep) {
            uint256 diff = finalPrice - userDep;
            if (msg.value != diff) revert IncorrectPayment();
            payable(owner).transfer(finalPrice);
        } else {
            payable(owner).transfer(finalPrice);
            if (userDep > finalPrice) {
                payable(msg.sender).transfer(userDep - finalPrice);
            }
        }

        nftHandler.transfer(msg.sender);
        emit NFTOwnerUpdated(msg.sender);
    }

    function getFinalPrice() public view returns (uint256) {
        if (_memberCount == 0 ||
        (finalBlock == 0 && _memberCount == 1) ||
            block.number < initBlock + waitingBlocks) {
            return price;
        }
        uint256 elapsed =
        ((finalBlock > 0 ? finalBlock : block.number)
        - initBlock
            - waitingBlocks);
        return price + (elapsed / blockStep) * ethStep;
    }

    function isMember(address user) external view returns (bool) {
        return _deposits[user] > 0;
    }

    function isNFTOwner(address user) external view returns (bool) {
        return IERC721(address(nftHandler)).ownerOf(tokenID) == user;
    }

    function getLotRoomInfo()
    external
    view
    returns (
        uint256 _tokenID,
        uint256 _initBlock,
        uint256 _currentPrice,
        uint256 _deposit,
        uint256 _ethStep,
        uint256 _waitingBlocks,
        uint256 _blockStep,
        uint256 _memberCount,
        bool _isWaiting
    )
    {
        return (
            tokenID,
            initBlock,
            getFinalPrice(),
            deposit,
            ethStep,
            waitingBlocks,
            blockStep,
            _memberCount,
            block.number < initBlock + waitingBlocks
        );
    }
}