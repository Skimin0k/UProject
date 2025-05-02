// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

// @title ERC721 proxy that stores dynamic encrypted metadata
contract ERC721Handler is IERC721Receiver {
    address private _erc721Contract;
    uint256 private _tokenID;
    address private _creator;
    address private _lotRoom;

    bytes[] private _encryptedHistory;
    event DataAppended(uint256 indexed tokenId, bytes encryptedData);

    constructor(address erc721Contract, uint256 tokenID, address creator) {
        _erc721Contract = erc721Contract;
        _tokenID = tokenID;
        _creator = creator;
    }

    // @notice Called by LotRoom to initialize lotRoom address
    function setLotRoom(address lotRoom) external {
        require(_lotRoom == address(0), "Already initialized");
        require(msg.sender == _creator, "Only creator");
        _lotRoom = lotRoom;
    }

    // @notice Append new encrypted data; only LotRoom contract can call
    function appendData(bytes calldata newData) external {
        require(msg.sender == _lotRoom, "Not authorized");
        _encryptedHistory.push(newData);
        emit DataAppended(_tokenID, newData);
    }

    // @notice Get full history; only owner of NFT
    function getDataHistory() external view returns (bytes[] memory) {
        return _encryptedHistory;
    }

    // @notice Get latest encrypted data; only owner
    function getLatestData() external view returns (bytes memory) {
        return _encryptedHistory[_encryptedHistory.length - 1];
    }

    // @notice Transfer NFT to new owner
    function transfer(address to) external {
        IERC721(_erc721Contract).safeTransferFrom(address(this), to, _tokenID);
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    // @notice Check ownership
    function isOwner(address account) external view returns (bool) {
        return IERC721(_erc721Contract).ownerOf(_tokenID) == account;
    }
}