import { ethers } from "hardhat";

async function main() {
    const lock = await ethers.getContractAt('Lock', "0x9406aAaeC7550a0D0cA5B776D92a88306de20DD8");
    console.log(
        await lock.owner()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });