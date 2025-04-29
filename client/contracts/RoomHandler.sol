// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract RoomHandler{
    mapping(address => uint) room;
    uint mapSize = 0;

    function doesExist(address addr) public view returns(bool){
        return room[addr] > 0;
    }

    function push(address addr, uint deposit) public{
        require(room[addr] == 0, "The address is already exists in the room");
        room[addr] = deposit;
        mapSize++;
    }

    function remove(address addr) public{
        require(room[addr] != 0, "The address doesn't exist in the room");
        delete room[addr];
        mapSize--;
    }

    function getDepositFromAddress(address addr) public view returns(uint){
        return room[addr];
    }

    function getCountOfMembers() public view returns(uint){
        return mapSize;
    }
}