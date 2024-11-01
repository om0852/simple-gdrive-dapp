"use client";

import { useEffect, useState } from "react";
import Web3 from "web3";
import UploadAbi from "@/contracts/Upload.json";
import detectEthereumProvider from "@metamask/detect-provider";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const provider = await detectEthereumProvider();
        if (provider) {
          const web3 = new Web3(provider);
          const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
          const contract = new web3.eth.Contract(UploadAbi, contractAddress);
          setProvider(provider);
          setWeb3(web3);
          setContract(contract);
          await provider.request({ method: "eth_requestAccounts" });
        } else {
          console.error("Please install MetaMask!");
        }
      } catch (error) {
        alert("Try to install metamask!");
        console.log(error)
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const account = await web3.eth.getAccounts();
      setAccount(account[0]);
      console.log(account);
    };
    web3 && getAccount();
  }, [web3]);

  return <></>;
}
