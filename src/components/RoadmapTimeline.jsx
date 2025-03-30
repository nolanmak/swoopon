import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const RoadmapTimeline = () => {
  const roadmapItems = [
    {
      phase: 'March 2025',
      title: 'Testnet Launch',
      description: 'Initial testnet launch with core swapping and rewards functionality (hopefully)',
      completed: true
    },
    {
      phase: 'April 2025',
      title: 'Additional Token Pairs',
      description: 'Support for more ERC-20 token trading pairs beyond ETH/WBTC',
      completed: false
    },
    {
      phase: 'April 2025',
      title: 'Cross-Chain Launch',
      description: 'Expand to support additional blockchain networks beyond Ethereum',
      completed: false
    },    
    {
      phase: 'June 2025',
      title: 'Staking Rewards',
      description: 'Staking Swoupon tokens for multipliers on swap rewards proportional to amount staked',
      completed: false
    },
    {
      phase: 'August 2025',
      title: 'System Parameter Optimization',
      description: 'Recalibration of system variables based on market conditions and user behavior',
      completed: false
    },
    {
      phase: 'TBD',
      title: 'Oracle-Free Architecture',
      description: 'Eliminate reliance on external price oracles for increased security and decentralization',
      completed: false
    }
  ];

  return (
    <div className="py-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-48">
        <div 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'var(--text-color)'
          }} 
          className="flex flex-col items-center rounded-lg p-12 shadow-lg"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient text-transparent bg-clip-text">Roadmap</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              Our vision for the future of Swoupon
            </p>
          </div>
          
          <div className="w-full max-w-3xl">
            {roadmapItems.map((item, index) => (
              <div key={index} className="flex mb-8 last:mb-0">
                {/* Timeline connector */}
                <div className="flex flex-col items-center mr-6">
                  <div className="text-ourpink">
                    {item.completed ? (
                      <CheckCircle size={24} className="text-ourpink" />
                    ) : (
                      <Circle size={24} className="text-ourpink" strokeWidth={1.5} />
                    )}
                  </div>
                  {index < roadmapItems.length - 1 && (
                    <div className="w-px h-full bg-gradient-to-b from-ourpink to-transparent flex-grow my-2" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-grow pb-8">
                  <div className="flex items-baseline mb-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mr-3">{item.title}</h3>
                    <span className="text-sm text-ourpink font-medium">{item.phase}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapTimeline;
