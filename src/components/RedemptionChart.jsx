import React from 'react';
import { Line } from 'react-chartjs-2';
import { Wallet, BarChart2, Gift } from 'lucide-react';

const RedemptionChart = ({ isDarkMode }) => {
  // Generate labels from 0 to 10,000 in increments of 100
  const generateLabels = () => {
    const labels = [];
    for (let i = 0; i <= 10000; i += 100) {
      labels.push(i.toString());
    }
    return labels;
  };
  
  return (
    <div className="relative py-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto pt-12 pb-0 px-48">
        <div 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'var(--text-color)'
          }} className="flex flex-col items-center rounded-lg p-8 shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 bg-gradient text-transparent bg-clip-text">Redeem Your Swoupons</h2>
            </div>
            
            <div className="w-full max-w-3xl mb-12">
              <div className="flex flex-col items-center">
                {/* Chart Canvas - Remove shadow and add class for transparent background */}
                <div className="w-full bg-transparent dark:bg-transparent p-6 rounded-lg">
                  <div 
                  className="w-full rounded-lg"
                  style={{
                    height: "375px"
                  }}>
                    <Line 
                      data={{
                        labels: generateLabels(),
                        datasets: [
                          {
                            label: 'Value',
                            data: [
                              0, 30.20125712, 60.19999328, 89.99773888,
                              119.59601401, 148.99632856, 178.20018227, 207.20906478,
                              236.02445573, 264.64782478, 293.0806317, 321.32432642,
                              349.38034912, 377.25013024, 404.93509058, 432.43664137,
                              459.75618427, 486.89511152, 513.85480592, 540.63664093,
                              567.24198073, 593.67218024, 619.92858525, 646.0125324,
                              671.9253493, 697.66835453, 723.24285776, 748.65015975,
                              773.89155244, 798.968319, 823.88173387, 848.63306285,
                              873.2235631, 897.65448326, 921.92706345, 946.04253534,
                              970.00212224, 993.80703908, 1017.45849254, 1040.95768105,
                              1064.30579486, 1087.5040161, 1110.55351882, 1133.45546904,
                              1156.21102481, 1178.82133627, 1201.28754565, 1223.6107874,
                              1245.79218817, 1267.8328669, 1289.73393485, 1311.49649566,
                              1333.12164538, 1354.61047255, 1375.96405821, 1397.183476,
                              1418.26979213, 1439.22406551, 1460.04734774, 1480.74068318,
                              1501.30510899, 1521.74165519, 1542.05134468, 1562.2351933,
                              1582.29420989, 1602.22939628, 1622.04174743, 1641.73225138,
                              1661.30188933, 1680.75163571, 1700.08245818, 1719.2953177,
                              1738.39116858, 1757.37095848, 1776.2356285, 1794.9861132,
                              1813.62334065, 1832.14823245, 1850.56170382, 1868.86466357,
                              1887.05801421, 1905.14265196, 1923.11946678, 1940.98934242,
                              1958.75315648, 1976.41178041, 1993.96607959, 2011.41691335,
                              2028.76513499, 2046.01159185, 2063.15712535, 2080.20257099,
                              2097.14875843, 2113.99651151, 2130.74664828, 2147.39998105,
                              2163.95731643, 2180.41945536, 2196.78719312, 2213.06131943
                            ],
                            borderColor: '#FC72FF',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0, // Remove dots
                            borderWidth: 6, // Increase line thickness
                            pointHoverRadius: 0, // Remove hover dots
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
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Swoupons Required',
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
                              text: 'Swap Spot Value',
                              color: isDarkMode ? '#fff' : '#333',
                            },
                            grid: {
                              display: false,
                              drawBorder: false,
                              color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                            },
                            ticks: {
                              color: isDarkMode ? '#fff' : '#333',
                              maxTicksLimit: 10, // Only show a subset of ticks for readability
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                
                {/* Text Below Chart */}
                <div className="text-center max-w-2xl">
                  <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 p-8">
                    <b className="text-ourpink">How: </b>Collect enough Swoupons based on your swap volume to unlock a 100% free swap! Visit your dashboard to see your current volume weighted exchange rate.
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
  );
};

export default RedemptionChart;
