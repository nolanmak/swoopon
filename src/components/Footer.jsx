import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Built by{' '}
          <a href="https://x.com/VillageFarmerr" target="_blank" rel="noopener noreferrer" className="font-medium text-ourpink">Rafael</a>
          {' • '}
          <a href="https://x.com/NolanMakatche" target="_blank" rel="noopener noreferrer" className="font-medium text-ourpink">Nolan</a>
          {' • '}
          <a href="https://x.com/Cryptor256" target="_blank" rel="noopener noreferrer" className="font-medium text-ourpink">Joel</a>
          {' • '}
          <a href="https://x.com/derekmeegan" target="_blank" rel="noopener noreferrer" className="font-medium text-ourpink">Derek</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
