import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, run } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFactoryAndPaymasterFixture() {
    await run('gaslessDeploy');
  }

  describe("Deployment", function () {
    it("Should deploy lock contract without paying gas", async function () {
      // first deployment will pay gas only for the factory contract
      await deployFactoryAndPaymasterFixture();
      // in the future deployments the balance won't change
      const [account] = await ethers.getSigners();
      const balanceBefore = ethers.formatEther(await ethers.provider.getBalance(account.address));
      console.log(`balance Before ${balanceBefore}`);
      // deploy lock contract
      await run('gaslessDeploy');
      const balanceAfter = ethers.formatEther(await ethers.provider.getBalance(account.address));
      console.log(`balance After ${balanceAfter}`);
      expect(balanceBefore).to.eq(balanceAfter);
    });
  });
});
