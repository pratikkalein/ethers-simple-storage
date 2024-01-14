// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "Storage/SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] public simpleStorageArray;
		
		// A new SimpleStorage contract is created and it's address is stored in the Array
    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage); 
    }

    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public  {
			 //uses the store function from SimpleStorage
       simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
    }

    function sfGet(uint256 _simpleStorageIndex) public view returns(uint256) {
				//uses the retrieve function from SimpleStorage
        return simpleStorageArray[_simpleStorageIndex].retrieve();
	    }

}