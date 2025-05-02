// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

error AlreadyInitialized();
error NotAuthorized();

contract ERC721Handler is IERC721Receiver {
    address private _erc721Contract;
    uint256 private _tokenID;
    address private _creator;
    address private _lotRoom;
    bytes[] private _encryptedHistory;

    event DataAppended(uint256 indexed tokenId, bytes encryptedData);

    constructor(
        address erc721Contract,
        uint256 tokenID,
        address creator
    ) {
        _erc721Contract = erc721Contract;
        _tokenID = tokenID;
    }

    function setLotRoom(address lotRoom) external {
        if (_lotRoom != address(0)) revert AlreadyInitialized();
        _lotRoom = lotRoom;
    }

    function appendData(bytes calldata newData) external {
        if (msg.sender != _lotRoom) revert NotAuthorized();
        _encryptedHistory.push(newData);
        emit DataAppended(_tokenID, newData);
    }

    function getDataHistory() external view returns (bytes[] memory) {
        address owner = IERC721(_erc721Contract).ownerOf(_tokenID);
        require(msg.sender == owner, "Not NFT owner");
        return _encryptedHistory;
    }

    function transfer(address to) external {
        IERC721(_erc721Contract).safeTransferFrom(
            address(this),
            to,
            _tokenID
        );
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}