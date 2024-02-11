const hre = require("hardhat");

async function main() {

  const Paypal = await hre.ethers.deployContract("Paypal");
  await Paypal.waitForDeployment();

  console.log("Paypal deployed to ", await Paypal.getAddress())
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
