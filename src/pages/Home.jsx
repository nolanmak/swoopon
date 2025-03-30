import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check if dark mode is active
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    // Check initially
    checkDarkMode();
    
    // Set up a MutationObserver to detect changes to the class list
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="home-page container py-12">
      {/* Hero Section */}
      <div className="card text-center p-8 my-8">
        
        <h1 className="bg-clip-text text-transparent bg-uniswap-gradient mb-6">Welcome to Swoopon</h1>
        <p className="text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary text-xl mb-8">
          A decentralized application powered by Moralis
        </p>
        <div className="flex justify-center">
          <Link 
            to="/dashboard" 
            className="btn btn-gradient px-8 py-3"
            style={isDarkMode ? {boxShadow: '0 0 15px rgba(252, 114, 255, 0.5)'} : {}}
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      {/* Floating tokens background effect - similar to Uniswap */}
      <div className="floating-tokens-container">
        {/* Create tokens that are explicitly positioned across the entire page with better distribution */}
        {[
          // Top left quadrant
          { x: 5, y: 8 },
          { x: 12, y: 15 },
          { x: 8, y: 22 },
          { x: 15, y: 28 },
          { x: 22, y: 10 },
          { x: 18, y: 20 },
          
          // Top right quadrant
          { x: 78, y: 12 },
          { x: 85, y: 8 },
          { x: 92, y: 15 },
          { x: 82, y: 22 },
          { x: 95, y: 25 },
          { x: 88, y: 18 },
          
          // Bottom left quadrant
          { x: 8, y: 75 },
          { x: 15, y: 82 },
          { x: 22, y: 88 },
          { x: 12, y: 95 },
          { x: 18, y: 70 },
          { x: 5, y: 85 },
          
          // Bottom right quadrant
          { x: 85, y: 78 },
          { x: 92, y: 85 },
          { x: 78, y: 92 },
          { x: 88, y: 72 },
          { x: 82, y: 88 },
          { x: 95, y: 80 },
          
          // Center area - sparse to avoid crowding
          { x: 40, y: 30 },
          { x: 60, y: 40 },
          { x: 50, y: 60 },
          { x: 35, y: 65 },
          { x: 65, y: 35 },
          
          // Additional tokens for balanced distribution
          { x: 25, y: 45 },
          { x: 75, y: 55 },
          { x: 30, y: 80 },
          { x: 70, y: 20 },
          { x: 45, y: 15 },
          { x: 55, y: 85 }
        ].map((position, i) => {
          // Enhanced color selection
          const getColor = () => {
            if (isDarkMode) {
              // More varied colors in dark mode
              if (i % 5 === 0) return '#FFB23F'; // Uniswap yellow
              if (i % 5 === 1) return '#FC72FF'; // Uniswap pink
              if (i % 5 === 2) return '#FFA500'; // Orange
              if (i % 5 === 3) return '#4C82FB'; // Uniswap blue
              return '#E8B71D'; // Gold
            } else {
              // More varied colors in light mode
              if (i % 4 === 0) return '#FC72FF'; // Uniswap pink
              if (i % 4 === 1) return '#4C82FB'; // Uniswap blue
              if (i % 4 === 2) return '#1EC992'; // Uniswap green
              return '#7B61FF'; // Purple
            }
          };
          
          // Increased randomness to the predefined positions
          const xPos = position.x + (Math.random() * 8 - 4); // ±4% randomness
          const yPos = position.y + (Math.random() * 8 - 4); // ±4% randomness
          
          // More varied size distribution
          const size = Math.random() * (i % 3 === 0 ? 100 : 70) + (i % 2 === 0 ? 15 : 25); // 15-125px with variation
          
          // Determine if token should be square or circle
          const isSquare = i % 7 === 0;
          const borderRadius = isSquare ? '15%' : '50%';
          
          // Create unique animation parameters for each token
          const floatDuration = Math.random() * 25 + 15; // 15-40s
          const floatDistance = Math.floor(Math.random() * 30) + 10; // 10-40px
          const rotateDuration = Math.random() * 40 + 20; // 20-60s
          const delay = Math.random() * 15; // 0-15s delay
          
          return (
            <div 
              key={i}
              className="token"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: getColor(),
                borderRadius: borderRadius,
                left: `${xPos}%`,
                top: `${yPos}%`,
                opacity: Math.random() * 0.5 + 0.3,
                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                animation: `float-${i % 3} ${floatDuration}s ease-in-out infinite, rotate ${rotateDuration}s linear infinite`,
                animationDelay: `${delay}s`,
                // Enhanced glow effect based on color and position
                boxShadow: isDarkMode ? 
                  `0 0 ${Math.floor(size/5)}px ${getColor()}80` : 
                  (i % 5 === 0 ? `0 0 10px rgba(255, 255, 255, 0.3)` : 'none')
              }}
            />
          );
        })}
      </div>

      {/* Features Section */}
      <div className="py-12">
        <h2 className="text-center mb-12 text-uniswap-light-text dark:text-uniswap-dark-text">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-uniswap-pink bg-opacity-10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FC72FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                <path d="M18 12H9"></path>
              </svg>
            </div>
            <h3 className="text-uniswap-pink">Wallet Integration</h3>
            <p className="text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary">Connect your Web3 wallet to access blockchain data</p>
          </div>
          
          <div className="card hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-uniswap-blue bg-opacity-10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4C82FB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <h3 className="text-uniswap-blue">Token Balances</h3>
            <p className="text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary">View your native and ERC-20 token balances</p>
          </div>
          
          <div className="card hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-uniswap-green bg-opacity-10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1EC992" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <path d="M21 15l-5-5L5 21"></path>
              </svg>
            </div>
            <h3 className="text-uniswap-green">NFT Gallery</h3>
            <p className="text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary">Browse your NFT collection across multiple chains</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card p-8 text-center mt-8">
        <h2 className="mb-4">Ready to explore your crypto assets?</h2>
        <p className="text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary mb-6">
          Connect your wallet and start exploring your tokens and NFTs today.
        </p>
        <Link to="/dashboard" className="btn btn-gradient inline-block">
          Launch App
        </Link>
      </div>

      {/* Animation keyframes are now defined in Home.css */}
    </div>
  );
};

export default Home;
