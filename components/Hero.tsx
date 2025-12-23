
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface HeroProps {
  onStartClick: () => void;
}

const LeftPlanningElements = () => (
  <div className="hidden xl:block absolute left-10 top-1/2 -translate-y-1/2 w-72 pointer-events-none">
    <motion.div 
      animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 mb-8 relative"
    >
      <div className="flex space-x-1 mb-4">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="space-y-3">
        <div className="h-24 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl">🎬</div>
        <div className="h-2 w-full bg-gray-100 rounded" />
        <div className="h-2 w-2/3 bg-gray-100 rounded" />
      </div>
      <div className="absolute -top-3 -right-3 bg-highlight text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
        PLANNING...
      </div>
    </motion.div>
    
    <motion.div 
      animate={{ x: [-10, 10, -10], y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
      className="bg-black text-white p-5 rounded-3xl shadow-xl ml-10 flex items-center space-x-3 w-max"
    >
      <span className="text-2xl">💡</span>
      <span className="text-xs font-bold leading-tight">AI가 제안하는<br/>미친 기획력</span>
    </motion.div>
  </div>
);

const RightGrowthElements = () => (
  <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 w-72 pointer-events-none">
    <motion.div 
      animate={{ y: [0, 20, 0], rotate: [2, -2, 2] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 mb-8 relative"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-black text-gray-400 tracking-tighter uppercase">Algorithm</span>
        <span className="text-highlight font-black text-[10px]">SUCCESS</span>
      </div>
      <div className="h-24 flex items-end space-x-2">
        {[30, 50, 40, 70, 60, 100].map((h, i) => (
          <motion.div 
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 1, delay: 1.5 + (i * 0.1) }}
            className="flex-1 bg-highlight rounded-t-lg"
          />
        ))}
      </div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center shadow-xl text-xl"
      >
        🏆
      </motion.div>
    </motion.div>

    <motion.div 
      animate={{ y: [-10, 10, -10] }}
      transition={{ repeat: Infinity, duration: 5, delay: 1 }}
      className="bg-white p-5 rounded-3xl shadow-xl mr-10 flex items-center space-x-3 w-max ml-auto border border-gray-50"
    >
      <span className="text-2xl">📈</span>
      <span className="text-xs font-black text-gray-800 leading-tight">실시간<br/>조회수 폭발</span>
    </motion.div>
  </div>
);

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-white text-center">
      {/* Side Illustrations */}
      <LeftPlanningElements />
      <RightGrowthElements />

      {/* Animated Background Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#FF5E4D]/5 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-black/5 rounded-full blur-[100px] pointer-events-none" 
      />

      <motion.div 
        className="max-w-6xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-3 rounded-full bg-[#FF5E4D] text-white text-lg md:text-xl font-medium tracking-tight shadow-xl shadow-[#FF5E4D]/20 cursor-default"
          >
            콘텐츠는 넘쳐나지만, 정작 무엇을 찍어야 할지 모르시겠죠?
          </motion.span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-7xl font-black mb-10 leading-[1.2] tracking-tighter text-gray-900"
        >
          나만의 <span className="highlight">AI 유튜브 PD</span>와 함께<br />
          <span className="relative inline-block px-4">
            100만 구독자
            <motion.svg 
              className="absolute -bottom-3 md:-bottom-5 left-0 w-full h-10 pointer-events-none" 
              viewBox="0 0 400 40" 
              fill="none" 
              preserveAspectRatio="none"
            >
              <motion.path 
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }} 
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                d="M10,25 C100,15 250,45 390,20" 
                stroke="#FF5E4D" 
                strokeWidth="12" 
                strokeLinecap="round" 
                className="opacity-90"
              />
              <motion.path 
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }} 
                transition={{ duration: 1.2, delay: 1.5, ease: "easeInOut" }}
                d="M20,32 C120,25 280,35 380,30" 
                stroke="#FF5E4D" 
                strokeWidth="6" 
                strokeLinecap="round" 
                opacity="0.4"
              />
            </motion.svg>
          </span> 달성해 보세요!
        </motion.h1>

        <motion.div variants={itemVariants} className="mb-12 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-bold">
            24시간 쉬지 않는 AI PD가 당신의 '유튜브 필승 포지션'을 찾아내고,<br className="hidden md:block"/>
            기획부터 대본, 성장 로드맵까지 실시간으로 가이드합니다.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-10">
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-black text-gray-800 italic">
              "나는 어떤 유튜브를 해야 떡상할까...?"
            </p>
            <motion.button
              onClick={onStartClick}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 30px 60px -12px rgba(255, 94, 77, 0.5)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-8 bg-black text-white rounded-[2.5rem] text-xl md:text-3xl font-black shadow-2xl transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">[무료] 3분만에 나만의 유튜브 유형 테스트 진단받기</span>
              <motion.div 
                className="absolute inset-0 bg-highlight"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="pt-20"
          >
             <p className="text-gray-300 font-black tracking-[0.5em] text-[10px] uppercase">
              SCROLL TO DISCOVER
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
