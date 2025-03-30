import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useInView } from 'react-intersection-observer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Hero from '../components/Hero';
import FloatingTokens from '../components/FloatingTokens';
import PunchCardConcept from '../components/PunchCardConcept';
import RedemptionChart from '../components/RedemptionChart';
import RewardsGrowthChart from '../components/RewardsGrowthChart';
import BenefitsSection from '../components/BenefitsSection';
import Footer from '../components/Footer';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = ({ isConnected, walletAddress, connectWallet }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check if dark mode is active
  useEffect(() => {
    const checkDarkMode = () => {
      if (document.documentElement.classList.contains('dark')) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };
    
    // Check initially
    checkDarkMode();
    
    // Create a mutation observer to watch for class changes on the html element
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
      <Hero 
        isDarkMode={isDarkMode} 
        isConnected={isConnected}
        walletAddress={walletAddress}
        connectWallet={connectWallet}
      />

      {/* Content Sections with Floating Tokens Background */}
      <div className="relative">
        {/* Floating Tokens Background */}
        <FloatingTokens isDarkMode={isDarkMode} />
        
        {/* Content Sections */}
        <div className="relative z-10">
          {/* Punch Card Concept Section */}
          <PunchCardConcept />

          {/* Redemption Chart Section */}
          <RedemptionChart isDarkMode={isDarkMode} />

          {/* Rewards Growth Chart Section */}
          <RewardsGrowthChart isDarkMode={isDarkMode} />
          
          {/* Benefits Section */}
          <BenefitsSection />
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
