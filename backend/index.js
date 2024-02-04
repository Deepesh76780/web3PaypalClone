const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;
const ABI = require("./abi.json");

app.use(cors());
app.use(express.json());

function convertArrayToObjects(arr) {
  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    type: transaction[0],
    amount: transaction[1],
    message: transaction[2],
    address: `${transaction[3].slice(0, 4)}...${transaction[3].slice(0, 4)}`,
    subject: transaction[4],
  }));

  return dataArray.reverse();
}

app.get("/getNameAndBalance", async (req, res) => {
  const { userAddress } = req.query;
  const response = await Moralis.EvmApi.utils.runContractFunction({
    chain: "11155111",
    address: "0x9e2806847Bcc839a9ddB705fc4B8a23674E088Ca",
    functionName: "getMyName",
    abi: ABI,
    params: {
      _user: userAddress,
    },
  });

  const jsonResponseName = response.raw;

  const responseSecond = await Moralis.EvmApi.balance.getNativeBalance({
    chain: "11155111",
    address: userAddress,
  });

  const jsonRespnseBalance = (responseSecond.raw.balance / 1e18).toFixed(2);

  const thirdResponse = await Moralis.EvmApi.token.getTokenPrice({
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  });

  const jsonThridPrice = (
    thirdResponse.raw.usdPrice * jsonRespnseBalance
  ).toFixed(2);

  const fourthResponse = await Moralis.EvmApi.utils.runContractFunction({
    chain: "11155111",
    address: "0x9e2806847Bcc839a9ddB705fc4B8a23674E088Ca",
    functionName: "getMyHistory",
    abi: ABI,
    params: {
      _user: userAddress,
    },
  });

  const jsonResponseHistory = convertArrayToObjects(fourthResponse.raw);

  const fiveResponse = await Moralis.EvmApi.utils.runContractFunction({
    chain: "11155111",
    address: "0x9e2806847Bcc839a9ddB705fc4B8a23674E088Ca",
    functionName: "getMyRequests",
    abi: ABI,
    params: {
      _user: userAddress,
    },
  });

  const jsonResponseRequests = fiveResponse.raw;

  const jsonResponse = {
    name: jsonResponseName,
    balance: jsonRespnseBalance,
    dollars: jsonThridPrice,
    history: jsonResponseHistory,
    requests: jsonResponseRequests,

  };

  return res.status(200).json(jsonResponse);
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
