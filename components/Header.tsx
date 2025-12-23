
import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onStartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartClick }) => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter cursor-pointer"
          onClick={() => window.location.reload()}
        >
          UP<span className="highlight">DIA</span>
        </motion.div>
        
        {/* Navigation links removed as per user request */}
        
        <motion.button
          onClick={scrollToContact}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-black text-white rounded-full text-sm font-bold shadow-lg hover:shadow-highlight/20 transition-all"
        >
          지금 바로 문의하기
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
