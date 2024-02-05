import React from "react";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import matic from "../matic.png";
import { Modal, Input } from "antd";
import { useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../abi.json";

function AccountDetails({ address, balance, name }) {
  const [requestModal, setRequestModal] = useState(false);
  const [userName,setUserName]=useState("John")

  const showRequestModal = () => {
    setRequestModal(true);
  };
  const hideRequestModal = () => {
    setRequestModal(false);
  };

  const { config } = usePrepareContractWrite({
    chainId: 11155111,
    address: "0x9e2806847Bcc839a9ddB705fc4B8a23674E088Ca",
    abi: ABI,
    functionName: "addName",
    args: [userName],
  });

  const { write, data } = useContractWrite(config);
  console.log(data)




  return (
    <Card title="Account Details" style={{ width: "100%" }}>
      <Modal
        title="Set userName"
        open={requestModal}
        onOk={() => {
          hideRequestModal();
          write?.();
        }}
        onCancel={hideRequestModal}
        okText="change Name"
        cancelText="Cancel"
      >
        <p>Enter Your Name</p>
        <Input
          placeholder="John..."
          value={userName}
          onChange={(val) => setUserName(val.target.value)}
        />
      </Modal>
      <div className="accountDetailRow">
        <UserOutlined style={{ color: "#767676", fontSize: "25px" }} />
        <div>
          <div className="accountDetailHead"> {name}</div>
          <div className="accountDetailBody">
            {" "}
            Address:{" "}
            {address.slice(0, 5) +
              "...." +
              address.slice(address.length - 5, address.length)}
          </div>
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
        <div
          className="extraOption"
          onClick={() => {
            showRequestModal();
          }}
        >
          Set Username
        </div>
        <div className="extraOption">Switch Accounts</div>
      </div>
    </Card>
  );
}

export default AccountDetails;
