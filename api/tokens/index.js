import Moralis from 'moralis';

// Initialize Moralis
async function startMoralis() {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });
  }
}

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await startMoralis();
    
    // For the root /api/tokens/ endpoint, return a helpful message
    res.status(200).json({
      message: "Please provide a wallet address, e.g., /api/tokens/0x123...",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
