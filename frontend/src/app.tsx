"use client";

import { use, useState } from "react";
import { ethers } from "ethers";
import ERC20 from "../../artifacts/contracts/ERC20.sol/ERC20.json";
import React from "react";

declare global {
    interface Window {
        ethereum?: any;
        contract?: any;
    }
}

export default function Home() {
    const [account, setAccount] = useState("");
    const [ethBalance, setEthBalance] = useState("");
    const [tokenBalance, setTokenBalance] = useState("0");
    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [totalSupply, setTokenSupply] = useState("0");

    const [mintAmount, setMintAmount] = useState("");
    const [mintAddress, setMintAddress] = useState("");

    const [burnAmount, setBurnAmount] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [transferAddress, setTransferAddress] = useState("");


    const contractAddress = "0xAd17f1EBdcd82E6edfc7A5ED69B12530279b02dA";
    const abi = ERC20.abi;
    async function loadTokenInfo(contract: any, userAccount: string) {
        const name = await contract.name();
        const symbol = await contract.symbol();
        const supply = await contract.totalSupply();
        const balance = await contract.balanceof(userAccount);

        setTokenName(name);
        setTokenSymbol(symbol);
        setTokenSupply(supply);
        setTokenBalance(balance);
    }
    async function connectWallet() {
        if (!window.ethereum) {
            alert("INSTALL METAMASK");
            return;
        }

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAccount = accounts[0];
        setAccount(userAccount);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const ethBal = await provider.getBalance(userAccount);

        const formatBal = parseFloat(ethers.formatEther(ethBal)).toFixed(4);
        setEthBalance(formatBal);

        const contract = new ethers.Contract(contractAddress, abi, signer);
        window.contract = contract;
        await loadTokenInfo(contract, userAccount);
    }
    async function fetchTokenDetails() {
        if (window.contract && account) {
            await loadTokenInfo(window.contract, account);
        }
    }
    async function handleMint() {
        if (!window.contract) return alert("connect wallet first");
        const tx = await window.contract.minting(mintAddress || account, mintAmount);
        await tx.wait();
        await fetchTokenDetails();
    }

    async function handleBurn() {
        const tx = await window.contract.burn(burnAmount);
        await tx.wait;
        await fetchTokenDetails();
    }

    async function handleTransfer() {
        const tx = await window.contract.transfer(transferAddress, transferAmount);
        await tx.wait();
        await fetchTokenDetails();
    }
    return (
        <div>
            <div>
                <h1>ERC20 DAPP</h1>
                <button onClick={connectWallet}>
                    Connect Wallet
                </button>
                <p><strong>Account : </strong>{account}</p>
                <p><strong>ETH Balance : </strong>{ethBalance}</p>

            </div>

            <div>
                <p><strong>Token Name : </strong>{tokenName}</p>
                <p><strong>Token Symbol : </strong>{tokenSymbol}</p>
                <p><strong>Token Supply : </strong>{totalSupply}</p>
                <p><strong>Token Balance : </strong>{tokenBalance}</p>
            </div>

            <div>
                <input type="text" placeholder="amount" value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} />
                <input type="text" placeholder="address" value={mintAddress} onChange={(e) => setMintAddress(e.target.value)} />
                <button onClick={handleMint}>Mint</button>
            </div>

            <div>
                <input type="text" placeholder="amount" value={burnAmount} onChange={(e) => setBurnAmount(e.target.value)} />
                <button onClick={handleBurn}>Burn</button>
            </div>

            <div>
                <input type="text" placeholder="amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
                <input type="text" placeholder="address" value={transferAddress} onChange={(e) => setTransferAddress(e.target.value)} />
                <button onClick={handleTransfer}>Transfer</button>
            </div>

        </div>
    );
}

