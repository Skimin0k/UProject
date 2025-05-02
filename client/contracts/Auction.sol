// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./LotRoom.sol";
import "./ERC721Handler.sol";

    error NotAdmin();
    error LotDoesNotExist();

contract Auction is ERC721 {
    address public admin;
    uint256 private _nextTokenId;
    address[] private lots;
    bytes private _auctionStaticData;

    event LotsListUpdated(address[] newLots);

    constructor(bytes memory auctionData) ERC721("Japanese Auction", "LOTS") {
        admin = msg.sender;
        _auctionStaticData = auctionData;
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) revert NotAdmin();
        _;
    }

    /// @notice Статические данные аукциона
    function getAuctionData() external view returns (bytes memory) {
        return _auctionStaticData;
    }

    /// @notice Количество лотов
    function getLotsCount() external view returns (uint256) {
        return lots.length;
    }

    /// @notice Полный список лотов
    function getLots() public view returns(address[] memory){
        return lots;
    }

    /// @notice Создать новый лот
    function createLot(
        uint256 ethStep,
        uint256 startingPrice,
        bytes memory initialData
    ) external returns (address) {
        _nextTokenId++;
        uint256 tokenId = _nextTokenId;

        // Деплой прокси и комнаты
        ERC721Handler handler = new ERC721Handler(address(this), tokenId, initialData);
        LotRoom lot = new LotRoom(handler, tokenId, ethStep, startingPrice, msg.sender);

        lots.push(address(lot));
        _mint(address(handler), tokenId);

        emit LotsListUpdated(lots);
        return address(lot);
    }

    /// @notice Удалить лот (только админ)
    function removeLot(address lotAddress) external onlyAdmin {
        uint256 len = lots.length;
        for (uint256 i = 0; i < len; i++) {
            if (lots[i] == lotAddress) {
                lots[i] = lots[len - 1];
                lots.pop();
                emit LotsListUpdated(lots);
                return;
            }
        }
        revert LotDoesNotExist();
    }
}