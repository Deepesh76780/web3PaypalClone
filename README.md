# 📦 web3PaypalClone

![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node.js-%23459EAD.svg?style=flat&logo=node.js&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23000000.svg?style=flat&logo=solidity&logoColor=white)

## Project Overview

web3PaypalClone is a decentralized application designed to replicate the core functionalities of PayPal, facilitating cryptocurrency transactions on Ethereum networks. The project leverages modern JavaScript frameworks and smart contract technology to create a secure and efficient payment processing system.

The architecture comprises three main components: 

- **Backend**: A Node.js server that manages API requests, user accounts, and interacts with the blockchain.
- **Frontend**: A React-based client interface that allows users to view their balance, account details, and transaction history.
- **Smart Contracts**: Solidity code deployed on the Ethereum blockchain that handles payment logic and ensures secure transactions.

## 🌟 Features

- **User Account Management**: Users can create accounts, view balances, and check transaction history through an intuitive interface.
- **Payment Processing**: Implemented smart contracts allow for seamless peer-to-peer payments in Ethereum.
- **Recent Activity Tracking**: Users are able to see their latest transactions directly within the application.
- **Cross-chain Support**: Integrated support for multiple Ethereum chains (mainnet & sepolia) through Wagmi configuration.
- **Responsive Design**: The frontend is developed using Ant Design components for a visually appealing and responsive layout.

## Core Sections

### API Endpoints

| Endpoint               | Method | Description                          |
|-----------------------|--------|--------------------------------------|
| `/api/start`          | POST   | Start the backend server             |
| `/api/accounts`       | GET    | Retrieve user account information     |
| `/api/payments`       | POST   | Process payment transactions          |

### Installation Steps

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web3PaypalClone.git
   ```

2. Navigate to each directory and install dependencies:
   ```bash
   cd web3PaypalClone/backend
   npm install
   
   cd ../frontend
   npm install
   
   cd ../smartContract
   npm install
   ```

### Usage Instructions

To run the backend server:
```bash
cd web3PaypalClone/backend
npm start
```

To launch the frontend application:
```bash
cd web3PaypalClone/frontend
npm start
```

### Project Structure Overview

```
📁 web3PaypalClone/
  📄 .gitignore  
  📁 backend/
    📄 abi.json  
    📄 index.js  
    📄 package-lock.json  
    📄 package.json  
  📁 frontend/
    📁 build/
      ✔ asset-manifest.json  
      ✔ favicon.ico 
      ✔ index.html  
      🗎 static/
        ✔ css/
          ✔ main.css 
        ✔ js/
          ✔ main.js 
    📁 src/      
      👕 App.css    
      👕 App.js     
      👕 abi.json   
      👕 components/ 
  📁 smartContract/
    💼 Paypal.sol  
    ⬜ hardhat.config.js 
```

## Development and Deployment

For development purposes:

1. Ensure you have Node.js installed on your system.
2. To deploy smart contracts, navigate to `smartContract/scripts` and run:
   ```bash
   npx hardhat run deploy.js --network <network-name>
   ```

### Environment Variables Setup

Create a `.env` file in both `backend` and `smartContract` directories with necessary keys (example):

```
MORALIS_API_KEY=<Your_Moralis_API_Key>
ETHERSCAN_API_KEY=<Your_Etherscan_API_Key>
```

## License 

This project is currently not licensed.

---

Version: 1  
Last updated: 2025-03-24T08:41:38.864Z  

## Release Notes

- New features added in this version include user account management capabilities, payment processing through smart contracts, and recent activity tracking.
- Improvements made include enhanced UI responsiveness with Ant Design integration.
- Changes were released on March 24, 2025.