import React from "react";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import matic from "../matic.png";

function AccountDetails({ address ,balance,name }) {
  return (
    <Card title="Account Details" style={{ width: "100%" }}>
      <div className="accountDetailRow">
        <UserOutlined style={{ color: "#767676", fontSize: "25px" }} />
        <div>
          <div className="accountDetailHead"> {name}</div>
          <div className="accountDetailBody"> Address: {address.slice(0,5)+"...."+address.slice(address.length - 5,address.length)}</div>
        </div>
      </div>
      <div className="accountDetailRow">
        <img src={matic} alt="maticLogo" width={25} />
        <div>
          <div className="accountDetailHead"> Native Ethereum Coin </div>
        <div className="accountDetailBody">{balance} ETH</div>
        </div>
      </div>
      <div className="balanceOptions">
        <div className="extraOption">Set Username</div>
        <div className="extraOption">Switch Accounts</div>
      </div>
    </Card>
  );
}

export default AccountDetails;
