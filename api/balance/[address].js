import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

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
    
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }
    
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      chain: EvmChain.ETHEREUM,
      address,
    });
    
    res.status(200).json({
      address,
      balance: nativeBalance.result.balance.ether,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
