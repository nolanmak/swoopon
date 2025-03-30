import React from 'react';

const PunchCardConcept = () => {
  // Function to scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative py-8 dark:bg-gray-900">
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
          
          {/* Text Side - Added glass effect */}
          <div 
            className="rounded-lg p-8 shadow-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'var(--text-color)'
            }}
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient text-transparent bg-clip-text">How Swoupon Works</h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              Remember those coffee shop punch cards? Each time you bought a coffee, you'd get a stamp - and after collecting enough stamps, you'd earn a free coffee.
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              <strong>Swoupon works similarly for your DeFi swaps:</strong>
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-ourpink font-bold text-lg mr-3 mt--1">1.</span>
                <span className="text-gray-700 dark:text-gray-300">Make a token swap through our platform</span>
              </li>
              <li className="flex items-start">
                <span className="text-ourpink font-bold text-lg mr-3 mt--1">2.</span>
                <span className="text-gray-700 dark:text-gray-300">Each swap earns you Swoupon automatically</span>
              </li>
              <li className="flex items-start">
                <span className="text-ourpink font-bold text-lg mr-3 mt--1">3.</span>
                <span className="text-gray-700 dark:text-gray-300">Accumulate Swoupon with every transaction you make</span>
              </li>
              <li className="flex items-start">
                <span className="text-ourpink font-bold text-lg mr-3 mt--1">4.</span>
                <span className="text-gray-700 dark:text-gray-300">Redeem your Swoupon for free swaps</span>
              </li>
            </ul>
            <button 
              className="btn btn-gradient px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={scrollToTop}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunchCardConcept;
