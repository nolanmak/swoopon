import express from 'express';
import cors from 'cors';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import dotenv from 'dotenv';
import axios from 'axios';

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

// Token addresses
const TOKEN_ADDRESSES = {
  ETH: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // Native ETH
  WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' // Wrapped BTC
};

// Helper function to get token prices from CoinGecko
async function getTokenPrices() {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: 'ethereum,bitcoin',
          vs_currencies: 'usd',
        },
      }
    );
    return {
      ETH: response.data.ethereum.usd,
      WBTC: response.data.bitcoin.usd,
    };
  } catch (error) {
    console.error('Error fetching token prices:', error);
    // Fallback prices if API fails
    return {
      ETH: 3500,
      WBTC: 62000,
    };
  }
}

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

// Token price endpoint
app.get('/api/prices', async (req, res) => {
  try {
    const prices = await getTokenPrices();
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get exchange rate between tokens
app.get('/api/exchange-rate', async (req, res) => {
  try {
    const { fromToken, toToken } = req.query;
    
    if (!fromToken || !toToken) {
      return res.status(400).json({ error: 'Both fromToken and toToken are required' });
    }
    
    if (!(fromToken in TOKEN_ADDRESSES) || !(toToken in TOKEN_ADDRESSES)) {
      return res.status(400).json({ error: 'Invalid token symbol' });
    }
    
    const prices = await getTokenPrices();
    
    // Calculate the exchange rate
    const rate = prices[toToken] / prices[fromToken];
    
    res.json({
      fromToken,
      toToken,
      rate,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Log swap for analytics and rewards
app.post('/api/log-swap', async (req, res) => {
  try {
    const { fromToken, toToken, amount, userAddress } = req.body;
    
    if (!fromToken || !toToken || !amount) {
      return res.status(400).json({ error: 'fromToken, toToken, and amount are required' });
    }
    
    // In a real app, you would log this to a database
    console.log(`Swap logged: ${amount} ${fromToken} to ${toToken} by ${userAddress || 'anonymous'}`);
    
    // Calculate swoupons earned (1 per swap for now)
    const swouponsEarned = 1;
    
    res.json({
      success: true,
      swouponsEarned,
      timestamp: Date.now()
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
