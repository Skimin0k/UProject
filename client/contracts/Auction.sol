// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./LotRoom.sol";

contract Auction is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address[] lots;

    event LotsListUpdated(address[] newLots);

    constructor() ERC721("Japanese Auction", "Lots"){}

    function createLot( uint _ETH_step, uint _price) public payable returns(address){
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        ERC721Handler handler = new ERC721Handler(address(this), newTokenId);
        LotRoom lot = new LotRoom(handler, newTokenId, _ETH_step, _price, msg.sender);
        address lotsAddress = address(lot);
        lots.push(lotsAddress);
        _mint(address(handler), newTokenId);
        emit LotsListUpdated(lots);
        return lotsAddress;
    }

    function getLots() public view returns(address[] memory){
        return lots;
    }

    function shouldExist(address addr)
    private view
    {
        bool found = false;
        for(uint i = 0; i< lots.length; i++){
            if(lots[i] == addr) {
                found = true;
            }
        }
        require(found == true, "Lot doesn't exist");
    }

    function removeLot(address addr) public payable{
        shouldExist(addr);
        bool swap = false;
        for (uint i = 0; i < lots.length - 1; i++) {
            if(lots[i] == addr) {
                swap = true;
            }
            if(swap == true) {
                lots[i] = lots[i + 1];
            }
        }
        lots.pop();
        emit LotsListUpdated(lots);
    }
}

