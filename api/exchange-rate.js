import axios from 'axios';

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

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    
    res.status(200).json({
      fromToken,
      toToken,
      rate,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
