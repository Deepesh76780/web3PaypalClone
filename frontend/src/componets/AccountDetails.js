import React, { useEffect } from "react";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import eth from "../eth.jpg";
import { Modal, Input } from "antd";
import { useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../abi.json";

function AccountDetails({ address, balance, name ,getNameAndBalance}) {
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
    address: "0xDC86B539E2707E077774CeA3A7bC58503E16332c",
    abi: ABI,
    functionName: "addName",
    args: [userName],
  });

  const { write, data } = useContractWrite(config);

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });


  useEffect(() => {
      getNameAndBalance();
  },[isSuccess]);


  return (
    <Card title="Account Details" style={{ width: "100%" }}>
      <Modal
        title="Enter Your Name"
        open={requestModal}
        onOk={() => {
          hideRequestModal();
          write?.();
        }}
        onCancel={hideRequestModal}
        okText="change Name"
        cancelText="Cancel"
      >
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
        <img src={eth} alt="ethLogo" width={25}  />
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
