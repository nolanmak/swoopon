import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';

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
    <div>
      {/* Hero Section */}
      <Hero isDarkMode={isDarkMode} />

      {/* Punch Card Concept Section */}
      <div className="relative py-16 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center px-12">
            {/* Image Side */}
            <div className="flex justify-center">
              <img 
                src="/punch_card.png" 
                alt="Liquidity Swap Punch Card" 
                className="rounded-lg shadow-lg w-128 h-auto"
              />
            </div>
            
            {/* Text Side */}
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient text-transparent bg-clip-text">How Swoupon Works</h2>
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                Remember those coffee shop punch cards? Each time you bought a coffee, you'd get a stamp - and after collecting enough stamps, you'd earn a free coffee.
              </p>
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                <strong>Swoupon works similarly for your DeFi swaps:</strong>
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Make a token swap through our platform</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Each swap earns you Swoupon automatically</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Accumulate Swoupon with every transaction you make</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">4</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Redeem your Swoupon for free swaps</span>
                </li>
              </ul>
              <button className="btn btn-gradient px-6 py-3 mt-2 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with floating background tokens */}
      <div className="relative max-w-7xl mx-auto px-4 py-12 z-10 min-h-[600px]">
        {/* Floating tokens background effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none -z-10">
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
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
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
        
        {/* Actual content */}
        <div className="relative z-10">
          {/* Call to Action */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center mt-8">
            <h2 className="text-2xl font-bold mb-4 text-uniswap-light-text dark:text-uniswap-dark-text">Ready to explore your crypto assets?</h2>
            <p className="text-uniswap-light-text-secondary dark:text-uniswap-dark-text-secondary mb-6">
              Connect your wallet and start exploring your tokens and NFTs today.
            </p>
            <Link to="/dashboard" className="btn btn-gradient inline-block px-8 py-3 transition-transform hover:-translate-y-1">
              Launch App
            </Link>
          </div>
        </div>

        {/* Add keyframes for animations */}
        <style jsx>{`
          @keyframes float-0 {
            0% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
            50% { transform: translate(-50%, -50%) translateY(-25px) rotate(180deg); }
            100% { transform: translate(-50%, -50%) translateY(0px) rotate(360deg); }
          }
          
          @keyframes float-1 {
            0% { transform: translate(-50%, -50%) translateX(0px) rotate(0deg); }
            33% { transform: translate(-50%, -50%) translateX(15px) rotate(120deg); }
            66% { transform: translate(-50%, -50%) translateX(-15px) rotate(240deg); }
            100% { transform: translate(-50%, -50%) translateX(0px) rotate(360deg); }
          }
          
          @keyframes float-2 {
            0% { transform: translate(-50%, -50%) translate(0px, 0px) rotate(0deg); }
            25% { transform: translate(-50%, -50%) translate(10px, 10px) rotate(90deg); }
            50% { transform: translate(-50%, -50%) translate(0px, 20px) rotate(180deg); }
            75% { transform: translate(-50%, -50%) translate(-10px, 10px) rotate(270deg); }
            100% { transform: translate(-50%, -50%) translate(0px, 0px) rotate(360deg); }
          }
          
          @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
