// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Paypal {

    //  Define owner of smartContract
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    // Create Struct and Mapping for request and transaction & name

    struct request{
        address requestor;
        uint256 amount;
        string message;
        string name;
    }

    struct sendReceive{
        string action;
        uint256 amount;
        string message;
        address otherPartyAddress;
        string otherPartyName;
    }

    struct userName{
        string name;
        bool hasName;
    }


    mapping(address => userName) names;
    mapping(address => request[]) requests;
    mapping(address => sendReceive[]) history;

    // Add name to wallet address

    function addName(string memory _name) public
    {   
        names[msg.sender] = userName(_name,true);
    }

    // create Request

    function createRequest(address user,uint256 _amount,string memory _message)
    public
    {   
        requests[user].push(request(msg.sender,_amount,_message,names[msg.sender].name));
    }

    // pay a request

    function payRequest(uint256 _request) public payable
    {
        require(_request < requests[msg.sender].length , "No Such Request");
        request[] storage myReq  = requests[msg.sender];
        request storage payReq = myReq[_request];

        uint256 toPay = payReq.amount * 1000000000000000000;
        require(msg.value == (toPay),"pay correct Amount");

        payable(payReq.requestor).transfer(msg.value);

        myReq[_request]=myReq[myReq.length - 1];
        myReq.pop();
    }

    // get all requests sent to a user
    
    



}