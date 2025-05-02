// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ERC721Handler.sol";
import "./RoomHandler.sol";

/// @title Auction logic per lot, with token metadata updates
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
    RoomHandler private roomHandler;

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
        roomHandler = new RoomHandler();

        // initialize handler with this lot’s address
        nftHandler.setLotRoom(address(this));
    }

    modifier onlyWaiting() {
        require(block.number <= initBlock + waitingBlocks, "Not in waiting period");
        _;
    }

    modifier onlyStarted() {
        require(block.number > initBlock + waitingBlocks, "Auction not started");
        _;
    }

    modifier onlyCreator() {
        require(msg.sender == owner, "Not creator");
        _;
    }

    modifier onlySingleParticipant() {
        require(roomHandler.getCountOfMembers() == 1, "Must be single participant");
        _;
    }

    receive() external payable {}

    /// @notice Join the auction
    function raiseHand() external payable onlyWaiting nonReentrant {
        require(msg.value >= deposit, "Insufficient deposit");
        roomHandler.push(msg.sender, msg.value);
        emit RoomUpdated(roomHandler.getCountOfMembers());
    }

    /// @notice Withdraw from auction
    function downHand() external onlyStarted nonReentrant {
        uint256 userDeposit = roomHandler.getDepositFromAddress(msg.sender);
        require(userDeposit > 0, "Not a participant");
        roomHandler.remove(msg.sender);
        payable(msg.sender).transfer(userDeposit);
        if (roomHandler.getCountOfMembers() == 1) {
            finalBlock = block.number - 1;
        }
        emit RoomUpdated(roomHandler.getCountOfMembers());
    }

    /// @notice Update token metadata (e.g., freezing graph)
    function updateTokenData(bytes calldata newData) external onlyCreator {
        nftHandler.appendData(newData);
    }

    /// @notice Finalize purchase
    function buy() external payable onlySingleParticipant nonReentrant {
        uint256 userDeposit = roomHandler.getDepositFromAddress(msg.sender);
        require(userDeposit > 0, "Not eligible");
        require(!nftHandler.isOwner(msg.sender), "Already owner");

        uint256 finalPrice = getFinalPrice();
        if (finalPrice > userDeposit) {
            require(msg.value == finalPrice - userDeposit, "Incorrect payment");
            payable(owner).transfer(finalPrice);
        } else {
            payable(owner).transfer(finalPrice);
            if (userDeposit > finalPrice) {
                payable(msg.sender).transfer(userDeposit - finalPrice);
            }
        }

        nftHandler.transfer(msg.sender);
        emit NFTOwnerUpdated(msg.sender);
    }

    /// @notice Calculate current final price
    function getFinalPrice() public view returns (uint256) {
        uint256 count = roomHandler.getCountOfMembers();
        if (count == 0 || (finalBlock == 0 && count == 1) || block.number < initBlock + waitingBlocks) {
            return price;
        }
        uint256 elapsed = ((finalBlock > 0 ? finalBlock : block.number) - initBlock - waitingBlocks);
        return price + (elapsed / blockStep) * ethStep;
    }

    function getCountOfMembers() external view returns (uint256) {
        return roomHandler.getCountOfMembers();
    }

    function isMember(address user) external view returns (bool) {
        return roomHandler.getDepositFromAddress(user) > 0;
    }

    function isNFTOwner(address user) external view returns (bool) {
        return nftHandler.isOwner(user);
    }

    function isWaiting() external view returns (bool) {
        return block.number < initBlock + waitingBlocks;
    }

    function getLotRoomInfo()
    public
    view
    returns (
        uint256,
        uint256,
        uint256,
        uint256,
        uint256,
        uint256,
        uint256
    )
    {
        return (
            tokenID,
            initBlock,
            getFinalPrice(),
            deposit,
            ethStep,
            waitingBlocks,
            blockStep
        );
    }
}