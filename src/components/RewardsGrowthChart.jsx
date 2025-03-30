import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useInView } from 'react-intersection-observer';

const RewardsGrowthChart = ({ isDarkMode }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const chartRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Generate labels from 0 to 10,000 in increments of 100
  const generateLabels = () => {
    const labels = [];
    for (let i = 0; i <= 10000; i += 100) {
      labels.push(i.toString());
    }
    return labels;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Generate chart data when component is first in view
  useEffect(() => {
    if (inView) {
      // Set the chart data with the provided values
      setChartData({
        labels: generateLabels(),
        datasets: [
          {
            label: 'Rewards',
            data: [
              0, 10.06708571, 20.06666443, 29.99924629,
              39.865338, 49.66544285, 59.40006076, 69.06968826,
              74.54140423, 77.21922398, 79.69633745, 82.00577814,
              84.17270015, 86.2167463, 88.15357962, 89.99591177,
              91.75421572, 93.43723316, 95.05234421, 96.60584227,
              98.10314203, 99.54893936, 100.94733601, 102.30193799,
              103.61593421, 104.89215987, 106.1331481, 107.34117242,
              108.51828187, 109.66633029, 110.78700098, 111.88182743,
              112.95221109, 113.9994364, 115.02468381, 116.02904099,
              117.01351252, 117.97902836, 118.92645123, 119.85658314,
              120.77017105, 121.66791192, 122.55045724, 123.41841692,
              124.27236293, 125.11283238, 125.94033043, 126.75533279,
              127.55828807, 128.3496198, 129.12972837, 129.89899267,
              130.6577717, 131.40640591, 132.14521856, 132.87451681,
              133.59459288, 134.30572494, 135.00817812, 135.70220523,
              136.38804762, 137.06593582, 137.73609022, 138.39872167,
              139.05403203, 139.70221469, 140.34345507, 140.97793101,
              141.60581324, 142.22726576, 142.84244616, 143.45150599,
              144.05459107, 144.65184179, 145.24339334, 145.82937603,
              146.4099155, 146.98513292, 147.55514526, 148.12006544,
              148.68000256, 149.23506203, 149.78534578, 150.33095238,
              150.87197723, 151.40851265, 151.94064806, 152.46847009,
              152.99206266, 153.51150716, 154.02688249, 154.53826523,
              155.04572967, 155.54934793, 156.04919004, 156.54532404,
              157.03781605, 157.52673031, 158.01212929, 158.49407376
            ],
            borderColor: '#FC72FF',
            backgroundColor: 'rgba(252, 114, 255, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 0, // Remove dots
            borderWidth: 6, // Increase line thickness
            pointHoverRadius: 0, // Remove hover dots
          },
        ],
      });
    }
  }, [inView]);

  // Animate chart drawing when scrolled into view
  useEffect(() => {
    if (inView && chartRef.current && chartData.datasets && chartData.datasets.length > 0) {
      const targetData = chartData.datasets[0].data; // Data with slope of 1
      const animationDuration = 1500; // 1.5 seconds
      const steps = 20;
      let currentStep = 0;
      
      // Handle the case when data is not yet loaded
      if (!targetData || targetData.length === 0) {
        return;
      }
      
      const initialData = Array(targetData.length).fill(0);
      
      // Create a copy of the chart data with zeroed values for animation
      const animatingData = {
        ...chartData,
        datasets: [{
          ...chartData.datasets[0],
          data: [...initialData]
        }]
      };
      
      // Update the chart with zeroed data
      if (chartRef.current) {
        chartRef.current.data = animatingData;
        chartRef.current.update();
      }
      
      // Animate from zero to final values
      const animateInterval = setInterval(() => {
        currentStep++;
        
        const progress = currentStep / steps;
        const currentData = targetData.map((value, index) => value * progress);
        
        if (chartRef.current) {
          chartRef.current.data.datasets[0].data = currentData;
          chartRef.current.update();
        }
        
        if (currentStep >= steps) {
          clearInterval(animateInterval);
        }
      }, animationDuration / steps);
      
      return () => clearInterval(animateInterval);
    }
  }, [inView, chartData]);

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
              <h2 className="text-3xl font-bold mb-6 bg-gradient text-transparent bg-clip-text">Maximize Your Swoupon Rewards</h2>
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                The more you swap, the greater your rewards. Watch as each transaction boosts your Swoupon balance, saving you on future swaps.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Earn Swoupons with every regular swap (paid in fees)</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Dynamic rewards grow larger with increased swap volume</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Redeem Swoupons to significantly reduce your future swap fees</span>
                </li>
              </ul>

              <button
                className="btn btn-gradient px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={scrollToTop}
              >
                Start Earning
              </button>
            </div>
          
          {/* Chart Side - Right */}
          <div 
            ref={ref} 
            className="w-full rounded-lg p-8 shadow-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'var(--text-color)',
              height: "375px"
            }}
          >
            <Line 
              ref={chartRef}
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                backgroundColor: 'transparent',
                animation: {
                  duration: 1000
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                    titleColor: isDarkMode ? '#fff' : '#333',
                    bodyColor: isDarkMode ? '#fff' : '#333',
                    borderColor: '#FC72FF',
                    borderWidth: 1,
                    callbacks: {
                      label: function(context) {
                        return `${context.parsed.y} Swoupons`;
                      }
                    }
                  }
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
      </div>
    </div>
  );
};

export default RewardsGrowthChart;
