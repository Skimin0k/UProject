// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./ERC721Handler.sol";

    error NotWaiting();    // Auction still in waiting period
    error NotStarted();    // Auction not yet started
    error NotSingle();     // Not single participant
    error NoDeposit();     // Insufficient or duplicate deposit
    error NoParticipant(); // User not in room
    error AlreadyOwner();  // Caller already NFT owner
    error BadPayment();    // Payment amount incorrect
    error NotCreator();    // Caller not lot creator

contract LotRoom {
    uint256 public id;        // tokenID
    uint256 public initB;     // initBlock
    uint256 public finalB;    // finalBlock when only one participant left
    uint256 public bStep = 4; // blockStep: blocks per price increment
    uint256 public waitB = 4; // waitingBlocks: grace period
    uint256 public step;      // ethStep (in wei)
    uint256 public start;     // starting price (in wei)
    uint256 public dep = 0.01 ether; // deposit amount

    address public owner;     // lot creator
    ERC721Handler public h;   // handler proxy

    mapping(address => uint256) private _d; // deposits mapping
    uint256 private _c;                   // member count

    // --- Events ---
    event R(uint256);    // RoomUpdated(count)
    event O(address);    // NFTOwnerUpdated(newOwner)

    constructor(
        ERC721Handler handler,
        uint256 _id,
        uint256 _step,
        uint256 _start,
        address _owner
    ) {
        id = _id;
        step = _step * 1 wei;
        start = _start * 1 wei;
        initB = block.number;
        owner = _owner;
        h = handler;
        handler.setLotRoom(address(this));
    }

    function raiseHand() external payable {
        if (block.number > initB + waitB) revert NotWaiting();
        if (msg.value < dep || _d[msg.sender] != 0) revert NoDeposit();
        _d[msg.sender] = msg.value;
        _c++;
        emit R(_c);
    }

    function downHand() external {
        if (block.number <= initB + waitB) revert NotStarted();
        uint256 d = _d[msg.sender];
        if (d == 0) revert NoParticipant();
        delete _d[msg.sender];
        _c--;
        payable(msg.sender).transfer(d);
        if (_c == 1) finalB = block.number - 1;
        emit R(_c);
    }

    function update(bytes calldata data) external {
        if (msg.sender != owner) revert NotCreator();
        h.appendData(data);
    }

    function buy() external payable {
        if (_c != 1) revert NotSingle();
        uint256 d = _d[msg.sender];
        if (d == 0) revert NoParticipant();
        if (h.getOwner() == msg.sender) revert AlreadyOwner();

        uint256 price = getPrice();
        if (price > d) {
            uint256 x = price - d;
            if (msg.value != x) revert BadPayment();
            payable(owner).transfer(price);
        } else {
            payable(owner).transfer(price);
            if (d > price) payable(msg.sender).transfer(d - price);
        }
        h.transfer(msg.sender);
        emit O(msg.sender);
    }

    function getPrice() public view returns (uint256) {
        if (_c == 0 || (finalB == 0 && _c == 1) || block.number < initB + waitB)
            return start;
        uint256 e = ((finalB > 0 ? finalB : block.number) - initB - waitB);
        return start + (e / bStep) * step;
    }

    function info()
    external
    view
    returns (
        uint256 _id,        // tokenID
        uint256 _initB,     // initial block
        uint256 _price,     // current price
        uint256 _dep,       // deposit amount
        uint256 _step,      // ethStep
        uint256 _waitB,     // waitingBlocks
        uint256 _bStep,     // blockStep
        uint256 _count,     // member count
        bool    _isWait,    // still in waiting period
        bool    _isMember,  // is caller a participant
        bool    _isOwner,   // is caller NFT owner
        bytes[] memory _h   // encrypted history
    )
    {
        return (
            id,
            initB,
            getPrice(),
            dep,
            step,
            waitB,
            bStep,
            _c,
            block.number < initB + waitB,
            _d[msg.sender] > 0,
            h.getOwner() == msg.sender,
            h.getDataHistory()
        );
    }
}