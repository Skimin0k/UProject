// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

    error AlreadyInitialized();
    error NotAuthorized();

contract ERC721Handler {
    address private _erc721;
    uint256 private _tokenId;
    address private _lotRoom;
    bytes[] private _encrypted;

    event DataAppended(uint256 indexed tokenId, bytes data);

    constructor(
        address erc721Contract,
        uint256 tokenID,
        bytes memory initial
    ) {
        _erc721 = erc721Contract;
        _tokenId = tokenID;
        _encrypted.push(initial);
    }

    function setLotRoom(address room) external {
        if (_lotRoom != address(0)) revert AlreadyInitialized();
        _lotRoom = room;
    }

    function appendData(bytes calldata d) external {
        if (msg.sender != _lotRoom) revert NotAuthorized();
        _encrypted.push(d);
        emit DataAppended(_tokenId, d);
    }

    function getDataHistory() external view returns (bytes[] memory) {
        return _encrypted;
    }

    function transfer(address to) external {
        IERC721(_erc721).transferFrom(address(this), to, _tokenId);
    }

    function getOwner() external view returns (address) {
        return IERC721(_erc721).ownerOf(_tokenId);
    }
}