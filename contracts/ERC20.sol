// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20{
    string public name = "ONE DEV";
    string public symbol = "OD";
    uint public totalSupply;
    address public owner;
    mapping (address=>uint)public balanceof;
    constructor(){
        owner=msg.sender;
    }

    function minting(address recipient, uint amount)public{
        require(msg.sender==owner,"Only owner can mint the tokens");
        totalSupply+=amount;
        balanceof[recipient]+=amount;
    }

    function burn(uint amount)public {
        require(balanceof[msg.sender]>=amount,"Insufficient tokens");
        balanceof[msg.sender]-=amount;
        totalSupply-=amount;
    }

    function transfer(address recipient, uint amount)public returns(bool){
        require(balanceof[msg.sender]>=amount,"not enough tokens");
        balanceof[msg.sender]-=amount;
        balanceof[recipient]+=amount;
        return true;
    }

}