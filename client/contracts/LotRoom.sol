// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./ERC721Handler.sol";
import "./RoomHandler.sol";

contract LotRoom {
    uint256 tokenID;

    uint256 initBlock;
    uint256 finalBlock;
    uint256 block_step = 4;
    uint256 waiting_status =4;

    uint256 ETH_step;
    uint256 price;
    uint256 deposit = 0.01 ether;

    address public owner;

    RoomHandler roomHandler = new RoomHandler();
    event RoomUpdated(uint roomLength);
    ERC721Handler nftHandler;
    event NFTOwnerUpdated(address _owner);

    constructor(
        ERC721Handler _nftHandler,
        uint256 _tokenID,
        uint256 _ETH_step,
        uint256 _price,
        address _owner
    ) {
        tokenID = _tokenID;

        ETH_step = _ETH_step * (1 wei);
        price = _price * (1 wei);
        initBlock = block.number;

        owner = _owner;
        nftHandler = _nftHandler;
    }

    receive() external payable {}

    function onlyWaiting() private view {
        require(
            block.number <= initBlock + waiting_status,
            "The room is not waiting any more"
        );
    }
    function onlyStarted() private view {
        require(
            block.number > initBlock + waiting_status,
            "The room has not started"
        );
    }
    function onlyOneInTheRoom() private view {
        require(
            roomHandler.getCountOfMembers() == 1,
            "Members != 1"
        );
    }

    function raiseHand() public payable {
        onlyWaiting();
        require(msg.value >= deposit, "Incorrect ether amount");
        roomHandler.push(msg.sender, msg.value);
        emit RoomUpdated(roomHandler.getCountOfMembers());
    }

    function downHand() public payable {
        onlyStarted();
        payable(msg.sender).transfer(roomHandler.getDepositFromAddress(msg.sender));
        roomHandler.remove(msg.sender);
        if (roomHandler.getCountOfMembers() == 1) {
            finalBlock = block.number - 1;
        }
        emit RoomUpdated(roomHandler.getCountOfMembers());
    }

    function buy() public payable {
        onlyOneInTheRoom();
        require(
            roomHandler.getCountOfMembers() == 1 && roomHandler.getDepositFromAddress(msg.sender) > 0,
            "Caller is not the winner"
        );
        require(!nftHandler.isOwner(msg.sender), "Already owned");
        uint256 finalPrice = getFinalPrice();
        uint256 _deposit = roomHandler.getDepositFromAddress(msg.sender);
        if (finalPrice > _deposit) {
            require(
                msg.value == (finalPrice - _deposit),
                "not enough money"
            );
            payable(owner).transfer(_deposit);
            payable(owner).transfer(msg.value);
        } else if (finalPrice == _deposit) {
            payable(owner).transfer(_deposit);
        } else {
            payable(owner).transfer(finalPrice);
            payable(msg.sender).transfer(_deposit - finalPrice);
        }
        nftHandler.transfer(msg.sender);
        emit NFTOwnerUpdated(msg.sender);
    }

    function getFinalPrice() public view returns (uint256) {
        if (getCountOfMembers() == 0
            || (finalBlock == 0 && getCountOfMembers() == 1)
            || block.number < initBlock + waiting_status
        ) {
            return price;
        }
        if(finalBlock > 0){
            return price + ((finalBlock - initBlock - waiting_status) / block_step) * ETH_step;
        }
        return price + ((block.number - initBlock - waiting_status) / block_step) * ETH_step;
    }

    function getStaticInfo()
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
        ETH_step,
        waiting_status,
        block_step
        );
    }

    function getCountOfMembers() public view returns (uint256) {
        return roomHandler.getCountOfMembers();
    }

    function isMember()
    public view returns(bool){
        return roomHandler.getDepositFromAddress(msg.sender) > 0;
    }

    function isNFTOwner()
    public view returns(bool){
        return nftHandler.isOwner(msg.sender);
    }
    function isWaiting()
    public view returns(bool){
        return block.number < initBlock + waiting_status;
    }
}
