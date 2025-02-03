// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TransferTrust is ReentrancyGuard, ERC721Enumerable is ERC721, Ownable {
    // Struct to store comprehensive car details
    struct CarDetails {
        string vin;
        string make;
        string model;
        uint256 year;
        uint256 currentMileage;
        string cpuErrors;
        uint256 lastServiceMileage;
        string serviceHistory;
        string insuranceHistory;
        uint256 price;
        uint256 saleProposalTimestamp;
    }

    // Mapping of token ID to car details
    mapping(uint256 => CarDetails) public carDetails;

    // Mapping to track active sale proposals
    struct SaleProposal {
        address buyer;
        uint256 price;
        bool isActive;
    }
    mapping(uint256 => SaleProposal) public saleProposals;

    // Stable coin contract for payments (USDC as an example)
    IERC20 public constant STABLE_COIN =
        IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48); // USDC mainnet address

    // Constants
    uint256 public constant SALE_PROPOSAL_DURATION = 24 hours;

    // Events to log important actions
    event CarStatusCertificateCreated(
        uint256 indexed tokenId,
        address indexed owner,
        string uniqueIdentifier
    );
    event SaleProposed(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );
    event SaleProposalCancelled(uint256 indexed tokenId);
    event SaleCompleted(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer
    );

    constructor(
        address owner
    ) Ownable(owner) ERC721("TransferTrust", "TRTST") {}

    // Create a unique identifier based on timestamp
    function _generateUniqueIdentifier() private view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    _getCurrentDateString(),
                    "_",
                    _getCurrentTimeString()
                )
            );
    }

    // Helper function to get current date string (simplified)
    function _getCurrentDateString() private view returns (string memory) {
        // This is a simplified representation and would need a more robust implementation
        return
            string(
                abi.encodePacked(
                    _uint2str(((block.timestamp / (1 days)) % 31) + 1),
                    _getMonthAbbreviation(block.timestamp),
                    _uint2str(block.timestamp / (365 days) + 1970)
                )
            );
    }

    // Helper function to get current time string (simplified)
    function _getCurrentTimeString() private view returns (string memory) {
        uint256 time = block.timestamp % 1 days;
        uint256 hourPart = time / 3600;
        uint256 minutePart = (time % 3600) / 60;
        uint256 secondPart = time % 60;

        return
            string(
                abi.encodePacked(
                    _padZero(hourPart),
                    _padZero(minutePart),
                    _padZero(secondPart)
                )
            );
    }

    // Utility functions for string conversions and formatting
    function _uint2str(
        uint _i
    ) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function _padZero(uint256 num) internal pure returns (string memory) {
        if (num < 10) {
            return string(abi.encodePacked("0", _uint2str(num)));
        }
        return _uint2str(num);
    }

    function _getMonthAbbreviation(
        uint256 timestamp
    ) internal pure returns (string memory) {
        // Simplified month mapping
        string[12] memory months = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ];
        return months[(timestamp / (30 days)) % 12];
    }

    // Create a new car status certificate (NFT)
    function createCarStatusCertificate(
        string memory _vin,
        string memory _make,
        string memory _model,
        uint256 _year,
        uint256 _currentMileage,
        string memory _cpuErrors,
        uint256 _lastServiceMileage,
        string memory _serviceHistory,
        string memory _insuranceHistory,
        uint256 _price
    ) external returns (uint256) {
        // Generate unique token ID (using incrementing counter)
        uint256 newTokenId = totalSupply() + 1;

        // Generate unique identifier
        string memory uniqueIdentifier = _generateUniqueIdentifier();

        // Mint NFT to the sender (current car owner)
        _safeMint(msg.sender, newTokenId);

        // Store car details
        carDetails[newTokenId] = CarDetails({
            vin: _vin,
            make: _make,
            model: _model,
            year: _year,
            currentMileage: _currentMileage,
            cpuErrors: _cpuErrors,
            lastServiceMileage: _lastServiceMileage,
            serviceHistory: _serviceHistory,
            insuranceHistory: _insuranceHistory,
            price: _price,
            saleProposalTimestamp: 0
        });

        emit CarStatusCertificateCreated(
            newTokenId,
            msg.sender,
            uniqueIdentifier
        );
        return newTokenId;
    }

    // Propose sale to a specific buyer
    function proposeSale(
        uint256 _tokenId,
        address _buyer,
        uint256 _price
    ) external {
        // Verify the sender is the current owner of the token
        require(
            ownerOf(_tokenId) == msg.sender,
            "Only current owner can propose sale"
        );

        // Update price and create sale proposal
        carDetails[_tokenId].price = _price;
        saleProposals[_tokenId] = SaleProposal({
            buyer: _buyer,
            price: _price,
            isActive: true
        });

        // Record sale proposal timestamp
        carDetails[_tokenId].saleProposalTimestamp = block.timestamp;

        emit SaleProposed(_tokenId, msg.sender, _buyer, _price);
    }

    // Cancel sale proposal (only by seller)
    function cancelSaleProposal(uint256 _tokenId) external {
        // Verify the sender is the current owner of the token
        require(
            ownerOf(_tokenId) == msg.sender,
            "Only current owner can cancel sale"
        );

        // Ensure sale proposal exists and is active
        require(saleProposals[_tokenId].isActive, "No active sale proposal");

        // Clear sale proposal
        delete saleProposals[_tokenId];
        carDetails[_tokenId].saleProposalTimestamp = 0;

        emit SaleProposalCancelled(_tokenId);
    }

    // Complete the sale transaction
    function completeSale(uint256 _tokenId) external nonReentrant {
        SaleProposal memory proposal = saleProposals[_tokenId];
        address seller = ownerOf(_tokenId);

        // Verify the transaction
        require(
            msg.sender == proposal.buyer,
            "Only proposed buyer can complete sale"
        );
        require(proposal.isActive, "No active sale proposal");

        // Check sale proposal is still valid (within 24 hours)
        require(
            block.timestamp <=
                carDetails[_tokenId].saleProposalTimestamp +
                    SALE_PROPOSAL_DURATION,
            "Sale proposal expired"
        );

        uint256 salePrice = proposal.price;

        // Check buyer has sufficient balance
        require(
            STABLE_COIN.balanceOf(proposal.buyer) >= salePrice,
            "Insufficient funds"
        );

        // Approve transfer from buyer to seller
        require(
            STABLE_COIN.transferFrom(proposal.buyer, seller, salePrice),
            "Payment transfer failed"
        );

        // Transfer NFT ownership
        _safeTransfer(seller, proposal.buyer, _tokenId);

        // Clear the sale proposal
        delete saleProposals[_tokenId];
        carDetails[_tokenId].saleProposalTimestamp = 0;

        emit SaleCompleted(_tokenId, seller, proposal.buyer);
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    // Utility function to get car details
    function getCarDetails(
        uint256 _tokenId
    ) external view returns (CarDetails memory) {
        return carDetails[_tokenId];
    }
}
