// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract ERC721Handler is IERC721Receiver{
    address private ERC721Storage;
    uint256 tokenID;

    constructor(address _ERC721Storage, uint256 _tokenID){
        ERC721Storage = _ERC721Storage;
        tokenID = _tokenID;
    }
    function transfer(address _to) public payable{
        IERC721(ERC721Storage).safeTransferFrom(address(this), _to, tokenID);
    }
    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
    function isOwner(address _sender) public view returns(bool){
        return ERC721(ERC721Storage).ownerOf(tokenID) == _sender;
    }
}