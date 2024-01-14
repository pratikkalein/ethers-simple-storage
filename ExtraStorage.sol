// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "Storage/SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    //Virtual override in functions

    function store(uint256 _favNum) public override {
        favNum = _favNum + 5;
    }
}
