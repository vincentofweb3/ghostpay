// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Nox, euint256, externalEuint256} from "@iexec-nox/nox-protocol-contracts/contracts/sdk/Nox.sol";

import {GhostVault} from "./GhostVault.sol";

contract GhostPayRouter {
    GhostVault public immutable vault;

    struct Payment {
        address from;
        address to;
        euint256 amount;
        euint256 tag;
        uint256 timestamp;
    }

    // paymentId => Payment
    mapping(uint256 => Payment) public payments;

    // viewer => payment IDs they've been granted access to
    mapping(address => uint256[]) public receiptsForViewer;

    uint256 public nextPaymentId;

    event PrivatePaymentSent(
        uint256 indexed paymentId,
        address indexed from,
        address indexed to,
        uint256 timestamp
    );

    event ReceiptIssued(uint256 indexed paymentId, address indexed viewer);

    constructor(GhostVault vault_) {
        vault = vault_;
    }

    /// @notice Send a confidential payment tagged with an encrypted category.
    function sendPrivate(
        address to,
        externalEuint256 amountHandle,
        bytes calldata amountProof,
        externalEuint256 tagHandle,
        bytes calldata tagProof
    ) external returns (uint256 paymentId) {
        euint256 amount = Nox.fromExternal(amountHandle, amountProof);

        euint256 tag = Nox.fromExternal(tagHandle, tagProof);

        // TODO:
        // Replace with the real confidential transfer call
        // once the final Nox ERC-7984 transfer API is confirmed.

        // Contract can decrypt.
        Nox.allowThis(amount);
        Nox.allowThis(tag);

        // Sender can decrypt.
        Nox.allow(amount, msg.sender);
        Nox.allow(tag, msg.sender);

        // Recipient can decrypt.
        Nox.allow(amount, to);
        Nox.allow(tag, to);

        paymentId = nextPaymentId++;

        payments[paymentId] = Payment({
            from: msg.sender,
            to: to,
            amount: amount,
            tag: tag,
            timestamp: block.timestamp
        });

        emit PrivatePaymentSent(paymentId, msg.sender, to, block.timestamp);
    }

    /// @notice Grant another wallet permission to decrypt ONE payment.
    function issueReceipt(uint256 paymentId, address viewer) external {
        Payment storage p = payments[paymentId];

        require(
            msg.sender == p.from || msg.sender == p.to,
            "not a party to this payment"
        );

        // Allow viewer to decrypt ONLY this payment.
        Nox.allow(p.amount, viewer);
        Nox.allow(p.tag, viewer);

        // Store receipt ownership.
        receiptsForViewer[viewer].push(paymentId);

        emit ReceiptIssued(paymentId, viewer);
    }

    /// @notice Returns every payment shared with this viewer.
    function getViewerReceipts(
        address viewer
    ) external view returns (uint256[] memory) {
        return receiptsForViewer[viewer];
    }

    /// @notice Returns a payment.
    function getPayment(
        uint256 paymentId
    )
        external
        view
        returns (
            address from,
            address to,
            euint256 amount,
            euint256 tag,
            uint256 timestamp
        )
    {
        Payment storage p = payments[paymentId];

        return (p.from, p.to, p.amount, p.tag, p.timestamp);
    }
}
