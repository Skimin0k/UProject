// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// @title Internal deposit manager
contract RoomHandler {
    mapping(address => uint256) private _deposits;
    uint256 private _memberCount;

    function push(address addr, uint256 deposit) external {
        require(_deposits[addr] == 0, "Already in room");
        _deposits[addr] = deposit;
        _memberCount++;
    }

    function remove(address addr) external {
        require(_deposits[addr] != 0, "Not in room");
        delete _deposits[addr];
        _memberCount--;
    }

    function getDepositFromAddress(address addr) external view returns (uint256) {
        return _deposits[addr];
    }

    function getCountOfMembers() external view returns (uint256) {
        return _memberCount;
    }
}