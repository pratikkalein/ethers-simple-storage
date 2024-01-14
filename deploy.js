const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

  const wallet = new ethers.Wallet(
    "0x89799380d541c94ebfcee98ae8c0aaa23b653c685f99a3c8877a1570a9874d38",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, Please Wait....");
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment(1);
  const currentFavNumber = await contract.retrieve();
  console.log(`Current Favorite Number : ${currentFavNumber.toString()}`);
  const transactionResponse = await contract.store(14);
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavNumber = await contract.retrieve();
  console.log(`Updated Favorite Number : ${updatedFavNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
