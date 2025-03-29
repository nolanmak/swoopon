# SwouponApp

A decentralized application built with Vite, React, and Moralis that allows users to connect their wallets and view their blockchain data.

## Features

- Wallet connection using MetaMask
- View native token balances (ETH)
- View ERC-20 token balances
- Browse NFT collections
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Moralis API key (get one from [Moralis](https://moralis.io/))

## Project Structure

```
SwouponApp/
├── public/              # Static files
├── src/                 # React application source
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── server.js            # Express server for Moralis API
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Get a Moralis API key:
   - Sign up at [Moralis](https://moralis.io/)
   - Create a new API key in your dashboard

4. Configure environment variables:
   - Open the `.env` file
   - Replace `your_moralis_api_key_here` with your actual Moralis API key

## Running the Application

1. Start the server:
   ```
   node server.js
   ```

2. In a separate terminal, start the Vite development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Using the Application

1. Connect your wallet by clicking the "Connect Wallet" button in the navigation bar
2. Navigate to the Dashboard to view your blockchain data
3. Use the tabs to switch between token balances and NFTs
4. Click "Refresh Data" to update the information

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory.

## Additional Dependencies

- react-router-dom - For application routing
- axios - For API requests
- dotenv - For environment variable management
- express - For the backend server
- cors - For handling cross-origin requests

## License

ISC
# SwouponStarterApp
