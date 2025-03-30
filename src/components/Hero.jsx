import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = ({ isDarkMode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/ChatGPT_Image.png'; // Corrected path for public folder
    img.onload = () => setImageLoaded(true);
    img.onerror = () => console.error('Failed to load hero image');
  }, []);

  const handleConnectWallet = () => {
    console.log('Connect Wallet clicked');
  };

  return (
    <div className="relative min-h-screen overflow-hidden"> 
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0"> 
        <img
          src="/ChatGPT_Image.png"
          alt="Hero Background"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Content Overlay Section - Positioning on the right but shifted left */}
      <div className="absolute right-5-percent md:right-15-percent lg:right-15-percent top-0 bottom-0 w-full md:w-2/5 lg:w-1/3 flex items-center justify-center z-10"> 
        <div className="bg-white/30 backdrop-blur-lg dark:bg-black/40 dark:backdrop-blur-xl rounded-xl border border-white/30 p-8 shadow-xl w-full max-w-md mx-4 text-center transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Earn Rewards with Swoupon
          </h2>
          <p className="text-lg text-gray-200 dark:text-gray-300 mb-8">
            Connect your wallet to access decentralized features.
          </p>
          <button
            onClick={handleConnectWallet}
            className="btn btn-gradient px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-offset-black"
            style={
              isDarkMode
                ? { boxShadow: '0 0 20px rgba(252, 114, 255, 0.6)' }
                : { boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }
            }
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;