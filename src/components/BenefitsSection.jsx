import React from 'react';
import { DollarSign, Zap, Shield, RefreshCcw } from 'lucide-react';

const BenefitsSection = () => {
  // Function to scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="py-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-12 flex flex-col items-center">
      <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'var(--text-color)',
            width: 'fit-content',
          }} className="px-24 py-12 flex flex-col items-center rounded-lg shadow-lg">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-8 bg-gradient text-transparent bg-clip-text">Why swap with us?</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl">
          {/* Dynamic Fees */}
          <div className=" dark:bg-gray-800 p-6 rounded-lg transition-all">
            <div 
              className="flex items-center justify-center mb-5 mx-auto bg-gradient"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <DollarSign size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-white">Dynamic Fees</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center font-light">
              Adaptive rates based on network conditions
            </p>
          </div>
          
          {/* Free Swaps */}
          <div className=" dark:bg-gray-800 p-6 rounded-lg transition-all">
            <div 
              className="flex items-center justify-center mb-5 mx-auto bg-gradient"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <Zap size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-white">Free Swaps</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center font-light">
              Redeem Swoupons for zero-fee transactions
            </p>
          </div>
          
          {/* Security */}
          <div className=" dark:bg-gray-800 p-6 rounded-lg transition-all">
            <div 
              className="flex items-center justify-center mb-5 mx-auto bg-gradient"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <Shield size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-white">Enhanced Security</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center font-light">
              Industry-leading security protocols
            </p>
          </div>
          
          {/* Continuous Improvement */}
          <div className=" dark:bg-gray-800 p-6 rounded-lg transition-all">
            <div 
              className="flex items-center justify-center mb-5 mx-auto bg-gradient"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <RefreshCcw size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-white">Continuous Updates</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center font-light">
              Regular platform improvements
            </p>
          </div>
          
        </div>
        
        <div className="mt-12 text-center">
          <button 
            className="btn btn-gradient px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            onClick={scrollToTop}
          >
            Swap
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
