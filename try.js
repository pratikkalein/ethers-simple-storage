const ethers = require("ethers");

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const blockNumber = await provider.getBlockNumber();
  console.log("Current block number: " + blockNumber);

  const balance = await provider.getBalance(
    "0x5ab6947567e0907dfb8e23a82634174399efbf7554be4c89b5ec7259161c3094"
  );
  console.log("Balance: " + balance);
}

main();
