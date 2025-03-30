import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useInView } from 'react-intersection-observer';

const RewardsGrowthChart = ({ isDarkMode }) => {
  const [chartData, setChartData] = useState({
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        label: 'Swoupon Rewards',
        data: Array(11).fill(0), // Initialize with zeros for animation
        borderColor: '#FC72FF',
        backgroundColor: 'rgba(252, 114, 255, 0.2)',
        tension: 0.1,
        fill: true,
      },
    ],
  });
  
  const chartRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  
  // Animate chart drawing when scrolled into view
  useEffect(() => {
    if (inView && chartRef.current) {
      const targetData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Data with slope of 1
      const animationDuration = 1500; // 1.5 seconds
      const steps = 20;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        if (currentStep <= steps) {
          const progress = currentStep / steps;
          const newData = targetData.map(value => value * progress);
          
          setChartData(prevData => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newData,
              },
            ],
          }));
          
          currentStep++;
        } else {
          clearInterval(interval);
        }
      }, animationDuration / steps);
      
      return () => clearInterval(interval);
    }
  }, [inView]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative py-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center px-12"
          >
          {/* Explanation Side - Left */}
          <div
            className="rounded-lg p-8 shadow-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'var(--text-color)'
            }}
            >
            <h2 className="text-3xl font-bold mb-6 bg-gradient text-transparent bg-clip-text">Watch Your Rewards Grow</h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              The more swaps you make, the more Swoupon you earn. Visualize your rewards growing linearly with each transaction.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">1</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Each point on the line represents a swap</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">2</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Every swap earns you 1 Swoupon</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">3</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">After 10 swaps, redeem for a free transaction</span>
              </li>
            </ul>
            
            <button 
              className="btn btn-gradient px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={scrollToTop}
            >
              Earn Rewards
            </button>
          </div>
          
          {/* Chart Side - Right */}
          <div 
            ref={ref} 
            className="w-full bg-white dark:bg-black p-6 rounded-lg shadow-lg"
          >
            <Line 
              ref={chartRef}
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                  duration: 0 // Disable default animations
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Swoupon Earned',
                      color: isDarkMode ? '#fff' : '#333',
                    },
                    grid: {
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    },
                    ticks: {
                      color: isDarkMode ? '#fff' : '#333',
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Number of Swaps',
                      color: isDarkMode ? '#fff' : '#333',
                    },
                    grid: {
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    },
                    ticks: {
                      color: isDarkMode ? '#fff' : '#333',
                    }
                  }
                },
                plugins: {
                  legend: {
                    labels: {
                      color: isDarkMode ? '#fff' : '#333',
                    }
                  },
                  tooltip: {
                    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                    titleColor: isDarkMode ? '#fff' : '#333',
                    bodyColor: isDarkMode ? '#fff' : '#333',
                    borderColor: '#FC72FF',
                    borderWidth: 1,
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsGrowthChart;
