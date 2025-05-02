// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./LotRoom.sol";

// @title Auction: static encrypted metadata per lot
contract Auction is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address[] public lots;

    bytes private _auctionStaticData;

    event LotsListUpdated(address[] newLots);

    constructor(bytes memory auctionData) ERC721("Japanese Auction", "LOTS") {
        _auctionStaticData = auctionData;
    }

    /// @notice Get static encrypted data
    function getAuctionData() external view returns (bytes memory) {
        return _auctionStaticData;
    }

    /// @notice Create auction lot with static encrypted data
    function createLot(
        uint256 ethStep,
        uint256 startingPrice
    ) external returns (address) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        // Deploy handler and auction room
        ERC721Handler handler = new ERC721Handler(address(this), tokenId, msg.sender);
        LotRoom lot = new LotRoom(handler, tokenId, ethStep, startingPrice, msg.sender);
        address lotAddress = address(lot);

        // Store lot and mint NFT to handler
        lots.push(lotAddress);
        _mint(address(handler), tokenId);
        emit LotsListUpdated(lots);

        return lotAddress;
    }

    function isValidLot(address lotAddress) public view returns (bool) {
        for (uint256 i = 0; i < lots.length; i++) {
            if (lots[i] == lotAddress) return true;
        }
        return false;
    }

    /// @notice Remove a lot; only owner
    function removeLot(address lotAddress) external onlyOwner nonReentrant {
        require(isValidLot(lotAddress), "Lot doesn't exist");
        uint256 length = lots.length;
        for (uint256 i = 0; i < length; i++) {
            if (lots[i] == lotAddress) {
                lots[i] = lots[length - 1];
                lots.pop();
                break;
            }
        }
        emit LotsListUpdated(lots);
    }
}

