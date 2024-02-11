const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const ABI = require("./abi.json");
const path = require("path")

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

const __dirname1 = path.resolve();

app.get("/getNameAndBalance", async (req, res) => {
  const { userAddress } = req.query;
  const response = await Moralis.EvmApi.utils.runContractFunction({
    chain: "11155111",
    address: "0xDC86B539E2707E077774CeA3A7bC58503E16332c",
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
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  });

  const jsonThridPrice = (
    thirdResponse.raw.usdPrice * jsonRespnseBalance
  ).toFixed(2);

  const fourthResponse = await Moralis.EvmApi.utils.runContractFunction({
    chain: "11155111",
    address: "0xDC86B539E2707E077774CeA3A7bC58503E16332c",
    functionName: "getMyHistory",
    abi: ABI,
    params: {
      _user: userAddress,
    },
  });

  const jsonResponseHistory = convertArrayToObjects(fourthResponse.raw);

  const fiveResponse = await Moralis.EvmApi.utils.runContractFunction({
    chain: "11155111",
    address: "0xDC86B539E2707E077774CeA3A7bC58503E16332c",
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    console.log("API running successfully");
  });
}

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
