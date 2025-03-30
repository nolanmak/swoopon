import { useEffect, useState } from 'react';
import './Hero.css';
import Swap from './Swap';

const Hero = ({ isDarkMode, isConnected, walletAddress, connectWallet }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/hero.png';
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden"> 
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0"> 
        <img
          src="/hero.png"
          alt="Hero Background"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Content Overlay Section - Positioning on the right but shifted left */}
      <div className="absolute right-5 md:right-15 lg:right-15 top-0 bottom-0 md:w-2/5 lg:w-1/3 flex items-center justify-center z-10"> 
          <Swap 
            isDarkMode={isDarkMode}
            walletAddress={walletAddress}
            isConnected={isConnected}
            connectWallet={connectWallet}
          />
      </div>
      
      {/* Scroll Down CTA */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center z-10">
        <div 
          className="scroll-cta flex items-center gap-3 cursor-pointer" 
          onClick={scrollToContent}
        >
          <span className="text-white mb-1 font-medium">How it works</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;