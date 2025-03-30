import { useState } from 'react';

const Swap = () => {
  const [activeTab, setActiveTab] = useState('sell'); // 'sell' or 'buy'
  const [sellAmount, setSellAmount] = useState('0');
  const [buyAmount, setBuyAmount] = useState('0');
  
  const handleSellAmountChange = (e) => {
    setSellAmount(e.target.value);
  };
  
  const handleBuyAmountChange = (e) => {
    setBuyAmount(e.target.value);
  };

  const toggleSwapDirection = () => {
    setActiveTab(activeTab === 'sell' ? 'buy' : 'sell');
  };

  return (
    <div className="swap-container w-full mx-auto rounded-3xl shadow-xl overflow-hidden mb-64 mt-16 px-4 md:px-0 min-h-[90vh] max-w-none bg-gray-50 dark:bg-gray-900">
      {/* Sell Section */}
      <div className={`p-8 md:p-10 ${activeTab === 'sell' ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} rounded-t-3xl mb-0`}>
        <div className="text-3xl font-medium text-gray-700 dark:text-gray-300 mb-4 pl-2">
          Sell
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-6 p-6 relative hover:shadow-md transition-shadow duration-200">
          <input
            type="text"
            value={sellAmount}
            onChange={handleSellAmountChange}
            className="absolute inset-0 opacity-0 z-10 cursor-text w-full h-full"
            placeholder="0"
            aria-label="Enter amount to sell"
          />
          <div className="flex items-center justify-between">
            <div className="text-6xl font-light text-gray-800 dark:text-gray-200 w-full">
              {sellAmount || '0'}
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-3 border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <svg viewBox="0 0 128 128" width="24" height="24">
                  <path d="M63.988 4.53v44.435l37.599 16.81-37.599-61.245z" fill="#fff"/>
                  <path d="M63.988 4.53l-37.599 61.245 37.599-16.81V4.53z" fill="#fff" fillOpacity="0.8"/>
                  <path d="M63.988 123.467v-35.102l-37.599-21.131 37.599 56.233z" fill="#fff"/>
                  <path d="M63.988 88.365v35.102l37.599-56.233-37.599 21.131z" fill="#fff" fillOpacity="0.8"/>
                  <path d="M63.988 82.965l37.599-21.131-37.599-16.81v37.941z" fill="#fff"/>
                  <path d="M26.389 61.834l37.599 21.131V45.024l-37.599 16.81z" fill="#fff" fillOpacity="0.8"/>
                </svg>
              </div>
              <span className="text-lg font-medium">ETH</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xl mt-2">
            ${sellAmount === '0' ? '0.00' : '0.00'}
          </div>
        </div>
      </div>

      {/* Switch Button */}
      <div className="flex justify-center relative py-6">
        <div className="absolute -mt-0.5 w-full"></div>
        <button 
          onClick={toggleSwapDirection}
          className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-md hover:shadow-lg z-10 transition-all duration-200 transform hover:scale-105"
          aria-label="Toggle swap direction"
        >
          {activeTab === 'sell' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16">
              <path fill="currentColor" fillRule="evenodd" d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14" clipRule="evenodd"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16">
              <path fill="currentColor" fillRule="evenodd" d="M8 2a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.22 3.22V2.75A.75.75 0 0 1 8 2" clipRule="evenodd"/>
            </svg>
          )}
        </button>
      </div>

      {/* Buy Section */}
      <div className={`p-8 md:p-10 ${activeTab === 'buy' ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} rounded-b-3xl mb-0`}>
        <div className="text-3xl font-medium text-gray-700 dark:text-gray-300 mb-4 pl-2">
          Buy
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-6 p-6 relative hover:shadow-md transition-shadow duration-200">
          <input
            type="text"
            value={buyAmount}
            onChange={handleBuyAmountChange}
            className="absolute inset-0 opacity-0 z-10 cursor-text w-full h-full"
            placeholder="0"
            aria-label="Enter amount to buy"
          />
          <div className="flex items-center justify-between">
            <div className="text-6xl font-light text-gray-800 dark:text-gray-200 w-full">
              {buyAmount || '0'}
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-3 border border-gray-200 dark:border-gray-700">
              {activeTab === 'buy' ? (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium whitespace-nowrap">Select token</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg viewBox="0 0 128 128" width="24" height="24">
                      <path d="M63.988 4.53v44.435l37.599 16.81-37.599-61.245z" fill="#fff"/>
                      <path d="M63.988 4.53l-37.599 61.245 37.599-16.81V4.53z" fill="#fff" fillOpacity="0.8"/>
                      <path d="M63.988 123.467v-35.102l-37.599-21.131 37.599 56.233z" fill="#fff"/>
                      <path d="M63.988 88.365v35.102l37.599-56.233-37.599 21.131z" fill="#fff" fillOpacity="0.8"/>
                      <path d="M63.988 82.965l37.599-21.131-37.599-16.81v37.941z" fill="#fff"/>
                      <path d="M26.389 61.834l37.599 21.131V45.024l-37.599 16.81z" fill="#fff" fillOpacity="0.8"/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium">ETH</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xl mt-2">
            ${buyAmount === '0' ? '0.00' : '0.00'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
