// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// GhostVault
// ----------
// Wraps any existing, unmodified ERC-20 into a confidential ERC-7984 token
// using Nox's ERC20ToERC7984Wrapper. This is the "layering, not modifying"
// piece the WTF brief asks for: the underlying token contract (e.g. a
// testnet USDC) is never touched. Users opt in by wrapping; everyone else
// keeps using the public token exactly as before.
//
// wrap()            -> one step, public amount, mints confidential balance 1:1
// unwrap()           -> step 1 of 2, burns confidential balance, returns a request id
// finalizeUnwrap()   -> step 2 of 2, called after off-chain decryption, releases ERC-20

import {ERC20ToERC7984Wrapper} from "@iexec-nox/nox-confidential-contracts/contracts/token/extensions/ERC20ToERC7984Wrapper.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GhostVault is ERC20ToERC7984Wrapper {
    constructor(IERC20 underlyingToken)
        ERC20ToERC7984Wrapper("Ghost USD", "gUSD", "", underlyingToken)
    {}
}
