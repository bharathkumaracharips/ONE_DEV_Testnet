import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20 Contract", async function () {
    let token: any;
    let owner: any;
    let addr1: any;

    this.beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("ERC20");
        token = await Token.deploy();
    })

    it("should mint tokens successfully", async function () {
        await token.minting(addr1.address, 100);
        const balance = await token.balanceof(addr1.address);
        expect(balance).to.equal(100);
    })

    it("should burn tokens successfully", async function () {
        await token.minting(owner.address, 100);
        await token.burn(20);
        const balance = await token.balanceof(owner.address);
        expect(balance).to.equal(80);
    });

    it("should transfer tokens successfully", async function () {
        await token.minting(owner.address, 100);
        await token.transfer(addr1.address, 50);
        const sendersbalance = await token.balanceof(owner.address);
        expect(sendersbalance).to.equal(50);
        const receiverBalance = await token.balanceof(addr1.address);
        expect(receiverBalance).to.equal(60);
    });
})