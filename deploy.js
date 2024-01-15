const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  //Create a provider by passing the RPC URL
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  //Create a wallet with the provider using your private key
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  //Compiled abi file
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  //Compiled binary file
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  //Create new contract by passing the abi, binary and wallet
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, Please Wait....");
  // Wait for contract to deploy (at least one block is generated)
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment(1);
  // Call the retrieve function to print the current fav number
  const currentFavNumber = await contract.retrieve();
  console.log(`Current Favorite Number : ${currentFavNumber.toString()}`);
  // Call the store function
  const transactionResponse = await contract.store(6969);
  const transactionReceipt = await transactionResponse.wait(1);
  // Retrieve the updated fav number
  const updatedFavNumber = await contract.retrieve();
  console.log(`Updated Favorite Number : ${updatedFavNumber.toString()}`);
  console.log(`Contract Address : ${contract.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
