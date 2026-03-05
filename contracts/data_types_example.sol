pragma solidity ^0.8.0;

contract DataTypesExample{
    //integer types
    //uint int
    uint public positive_num=10;
    int public neg_num =-10;

    //boolean type

    bool public isActive = true;

    //address type

    address public owner;

    //string type

    string public message = "hello Students";
    //byte types

    bytes public dynamicData = "welcome to blockchian course";
    bytes1 public byte1 = 0x16;

    
}