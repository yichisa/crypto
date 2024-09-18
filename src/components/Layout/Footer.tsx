// src/components/Layout/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
<footer className="bg-gray-800 text-white py-4"> {/* Reduced margin */}
  <div className="container mx-auto text-center">
    <hr className="border-gray-700 mb-4" /> {/* Divider line */}
    <p>&copy; {new Date().getFullYear()} LiveCoinTracker</p>
    <div className="flex justify-center space-x-4">
      {/* Social Media Icons */}
    </div>
  </div>
</footer>

  );
};

export default Footer;
