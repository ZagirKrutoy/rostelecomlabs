"use client";
import { useState } from "react";
import { getContract, Address } from "viem";
import { ConnectPublicClient } from "./client";
import { erc20Abi } from "./erc20Abi";

export default function ERC20Component() {
  const [contractAddress, setContractAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);

  async function handleClick() {
    try {
      const publicClient = ConnectPublicClient();

      const contract = getContract({
        address: contractAddress as Address,
        abi: erc20Abi,
        client: publicClient,
      });

      const name = await contract.read.name();
      const symbol = await contract.read.symbol();
      const balance = await contract.read.balanceOf([
        walletAddress as Address,
      ]);

      alert(
        `Token: ${name} (${symbol})\nBalance: ${balance.toString()}`
      );
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  return (
    <div className="card">
      <label>
        Token Address:
        <input
          placeholder="ERC20 contract"
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        />
      </label>

      <label>
        Wallet Address:
        <input
          placeholder="User address"
          value={walletAddress}
          onChange={setValue(setWalletAddress)}
        />
      </label>

      <button
        className="px-8 py-2 w-full mt-4 bg-green-600 text-white"
        onClick={handleClick}
      >
        Get Token Balance
      </button>
    </div>
  );
}