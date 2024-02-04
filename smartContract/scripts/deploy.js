const hre = require("hardhat");

async function main() {

  const Paypal = await hre.ethers.deployContract("Paypal");
  await Paypal.waitForDeployment();

  console.log("Paypal deployed to ", await Paypal.getAddress())
  // 0x9e2806847Bcc839a9ddB705fc4B8a23674E088Ca
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
