import express from "express";
// Import Moralis
import Moralis from "moralis";
// Import the EvmChain dataType
import { EvmChain } from "@moralisweb3/common-evm-utils";
// Import dotenv
import dotenv from "dotenv";
dotenv.config({ path: './src/.env' });

const app = express();
const port = 3000;

// Add a variable for the API key, address, and chain
const MORALIS_API_KEY = process.env.moralisAPI;
const address = process.env.address;
const chain = EvmChain.SEPOLIA;

console.log("Moralis API Key:", MORALIS_API_KEY);
console.log("Address:", address);

async function getDemoData() {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
    });

    // Format the native balance formatted in ether via the .ether getter
    const native = nativeBalance.result.balance.ether;

    // Get token balances
    const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
    });

    // Format the balances to a readable output with the .display() method
    const tokens = tokenBalances.result.map((token) => token.display());

    // Get the nfts
    const nftsBalances = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
        limit: 10,
    });

    // Format the output to return name, amount and metadata
    const nfts = nftsBalances.result.map((nft) => ({
        name: nft.result.name,
        amount: nft.result.amount,
        metadata: nft.result.metadata,
    }));

    return { native, tokens, nfts };
}

app.get("/demo", async (req, res) => {
    try {
        // Get and return the crypto data
        const data = await getDemoData();
        res.status(200);
        res.json(data);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500);
        res.json({ error: error.message });
    }
});

const startServer = async () => {
    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

startServer();