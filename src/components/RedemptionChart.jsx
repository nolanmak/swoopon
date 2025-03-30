import React from 'react';
import { Line } from 'react-chartjs-2';
import { Wallet, BarChart2, Gift } from 'lucide-react';

const RedemptionChart = ({ isDarkMode }) => {
  return (
    <div className="relative py-8 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4">
        {/* Glass Effect Container for entire component */}
        <div 
          className="rounded-lg p-8 pb-0 max-w-5xl mx-auto"
        >
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'var(--text-color)'
          }} className="py-12 flex flex-col items-center rounded-lg p-8 shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 bg-gradient text-transparent bg-clip-text">Redeem Your Swoupons</h2>
            </div>
            
            {/* Redemption Chart in Center */}
            <div className="w-full max-w-3xl mb-12">
              <div className="flex flex-col items-center">
                {/* Chart Canvas - Remove shadow and add class for transparent background */}
                <div className="w-full bg-transparent dark:bg-transparent p-6 rounded-lg mb-8">
                  <div className="chart-container">
                    <Line 
                      data={{
                        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                        datasets: [
                          {
                            label: 'Value',
                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
                            borderColor: '#FC72FF',
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 5,
                            pointBackgroundColor: '#FC72FF',
                            pointBorderColor: '#fff',
                            pointHoverRadius: 8,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        backgroundColor: 'transparent',
                        plugins: {
                          legend: {
                            display: false
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                  label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                  if (context.parsed.x === 10) {
                                    label += '100% Free Transaction!';
                                  } else {
                                    label += '0% - Keep Collecting!';
                                  }
                                }
                                return label;
                              }
                            }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                              display: true,
                              text: 'Discount (%)',
                              color: isDarkMode ? '#fff' : '#333',
                            },
                            grid: {
                              color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                              drawOnChartArea: true,
                              drawTicks: true,
                            },
                            ticks: {
                              color: isDarkMode ? '#fff' : '#333',
                            }
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Swoupons Collected',
                              color: isDarkMode ? '#fff' : '#333',
                            },
                            grid: {
                              display: false,
                              drawBorder: false,
                              color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                            },
                            ticks: {
                              color: isDarkMode ? '#fff' : '#333',
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                
                {/* Text Below Chart */}
                <div className="text-center max-w-2xl">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">How to Redeem Your Swoupons</h3>
                  <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                    Collect enoughs Swoupons and get a 100% free swap! Visit your dashboard 
                    to see how many you can redeem!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="dark:bg-gray-800 p-5 rounded-lg shadow">
                      <div 
                        className="flex items-center justify-center mx-auto mb-4" 
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          backgroundColor: "#FC72FF",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <Wallet className="text-white" size={20} />
                      </div>
                      <h4 className="font-bold mb-2">Collect</h4>
                      <p className="text-gray-600 dark:text-gray-400">Earn Swoupon based on the liquidity you provide.</p>
                    </div>
                    
                    <div className="dark:bg-gray-800 p-5 rounded-lg shadow">
                      <div 
                        className="flex items-center justify-center mx-auto mb-4" 
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          backgroundColor: "#FC72FF",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <BarChart2 className="text-white" size={20} />
                      </div>
                      <h4 className="font-bold mb-2">Track</h4>
                      <p className="text-gray-600 dark:text-gray-400">Monitor your progress on your dashboard.</p>
                    </div>
                    
                    <div className="dark:bg-gray-800 p-5 rounded-lg shadow">
                      <div 
                        className="flex items-center justify-center mx-auto mb-4" 
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          backgroundColor: "#FC72FF",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <Gift className="text-white" size={20} />
                      </div>
                      <h4 className="font-bold mb-2">Redeem</h4>
                      <p className="text-gray-600 dark:text-gray-400">Redeem Swoupons for free swaps.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedemptionChart;
