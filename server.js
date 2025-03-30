import express from 'express';
import cors from 'cors';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Initialize Moralis
const startMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
};

// API Routes
app.get('/api/balance/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      chain: EvmChain.ETHEREUM,
      address,
    });
    
    res.json({
      address,
      balance: nativeBalance.result.balance.ether,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tokens/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: EvmChain.ETHEREUM,
      address,
    });
    
    res.json({
      address,
      tokens: tokenBalances.result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/nfts/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: EvmChain.ETHEREUM,
      address,
      limit: 10,
    });
    
    res.json({
      address,
      nfts: nfts.result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
startMoralis()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start Moralis:', error);
  });
