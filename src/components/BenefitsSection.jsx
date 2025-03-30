import React from 'react';
import { DollarSign, Zap, Github, Users } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <div className="py-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient text-transparent bg-clip-text">Why Choose Swoupon?</h2>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Swoupon revolutionizes DeFi transactions with unique benefits that put users first
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Dynamic Fees */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-full bg-gradient flex items-center justify-center mb-5 mx-auto">
              <DollarSign size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-white">Dynamic Fees</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Our fees adjust based on network conditions, ensuring you always get the best possible rate for your transactions.
            </p>
          </div>
          
          {/* Free Swaps */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-full bg-gradient flex items-center justify-center mb-5 mx-auto">
              <Zap size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-white">Free Swaps</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Redeem your earned Swoupons for completely fee-free swaps, putting more tokens in your wallet.
            </p>
          </div>
          
          {/* Open Source */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-full bg-gradient flex items-center justify-center mb-5 mx-auto">
              <Github size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-white">Open Source</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Our code is fully open-source and audited, promoting transparency and community-driven development.
            </p>
          </div>
          
          {/* Community Governance */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-full bg-gradient flex items-center justify-center mb-5 mx-auto">
              <Users size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-white">Community Governance</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Swoupon holders can vote on protocol upgrades and fee structures, ensuring a truly decentralized ecosystem.
            </p>
          </div>
          
          {/* Instant Liquidity */}
          <div className="hidden lg:block lg:col-span-4 bg-gradient mt-6 p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to start earning Swoupons?</h3>
            <a href="#swap" className="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-md">
              Make Your First Swap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
