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
        
        addHistory(msg.sender, payReq.requestor, payReq.amount, payReq.message);

        myReq[_request]=myReq[myReq.length - 1];
        myReq.pop();
    }

    function addHistory(address sender , address receiver , uint _amount , string memory _message) private
    { 
        history[sender].push(sendReceive("-",_amount,_message,receiver,names[receiver].name));
        history[receiver].push(sendReceive("+",_amount,_message,sender,names[sender].name));

    }


    // get all requests send to user


    function getMyRequests(address _user) public view returns(
            address[] memory, 
            uint256[] memory, 
            string[] memory, 
            string[] memory
    ){

            address[] memory addrs = new address[](requests[_user].length);
            uint256[] memory amnt = new uint256[](requests[_user].length);
            string[] memory msge = new string[](requests[_user].length);
            string[] memory nme = new string[](requests[_user].length);
            
            for (uint i = 0; i < requests[_user].length; i++) {
                request storage myRequests = requests[_user][i];
                addrs[i] = myRequests.requestor;
                amnt[i] = myRequests.amount;
                msge[i] = myRequests.message;
                nme[i] = myRequests.name;
            }
            
            return (addrs, amnt, msge, nme);        
            

    }



    function getMyHistory(address _user) public view returns(sendReceive[] memory){
            return history[_user];
    }

    function getMyName(address _user) public view returns(userName memory){
            return names[_user];
    }




}