import "./App.css";
import logo from "./regex.png";
import { Layout, Button } from "antd";
import CurrentBalance from "./componets/CurrentBalance";
import RequestAndPay from "./componets/RequestAndPay";
import AccountDetails from "./componets/AccountDetails";
import RecentActivity from "./componets/RecentActivity";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import axios from "axios";
import { useState, useEffect } from "react";

const { Header, Content } = Layout;
function App() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const [name, setName] = useState("...");
  const [balance, setBalance] = useState("...");
  const [dollars, setDollars] = useState("...");
  const [history, setHistory] = useState(null);
  const [requests, setRequests] = useState({ 1: [0], 0: [] });

  function disconnectAndSetNull() {
    disconnect();
    setName("...");
    setBalance("...");
    setDollars("...");
    setHistory(null);
    setRequests({ 1: [0], 0: [] });
  }

  async function getNameAndBalance() {
    const res = await axios.get(`https://web3-defi.onrender.com/getNameAndBalance`, {
      params: { userAddress: address },
    });

    const response = res.data;
    console.log(response);
    if (response.name[1]) {
      setName(response.name[0]);
    }
    setBalance(String(response.balance));
    setDollars(String(response.dollars));
    setHistory(response.history);
    setRequests(response.requests);
  }

  useEffect(() => {
    if (!isConnected) return;
    getNameAndBalance();
  }, [isConnected]);

  const handleConnect = () => {
    isConnected ? disconnectAndSetNull() : connect();
  };
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="headerLeft">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <Button type={"primary"} onClick={handleConnect}>
            {isConnected ? "Disconnect wallet" : "Connect Wallet"}
          </Button>
        </Header>
        <Content className="contentBody">
          {isConnected ? (
            <>
              <div className="firstColumn">
                <AccountDetails
                  address={address}
                  balance={balance}
                  name={name}
                  getNameAndBalance={getNameAndBalance}
                />
                <RequestAndPay
                  requests={requests}
                  getNameAndBalance={getNameAndBalance}
                />
                <CurrentBalance dollars={dollars} />
              </div>
              <div className="secondColumn">
                <RecentActivity history={history} />
              </div>
            </>
          ) : (
            <div className="disconnect-head">
              <div className="disconnect">
                Please connect your wallet to continue
              </div>
              <div className="loader"></div>
            </div>
          )}
        </Content>

        <div
          style={{
            position: "fixed",

            zIndex: 100,
            bottom: "4px",
            right: "4px",
            color: "red",
            fontSize: "12px",
          }}
        >
          * deployed on sepolia testnet{" "}
        </div>
      </Layout>
    </div>
  );
}

export default App;
