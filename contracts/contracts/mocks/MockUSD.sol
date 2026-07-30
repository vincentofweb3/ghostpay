// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @notice Mintable testnet stand-in for USDC. This represents "the real,
/// unmodified public protocol" — GhostVault wraps THIS contract without
/// ever changing a line of it, which is the whole point of the challenge.
contract MockUSD is ERC20 {
    constructor() ERC20("Mock USD", "mUSD") {}

    function faucet(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
