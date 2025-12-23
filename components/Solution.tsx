
import React from 'react';
import { motion } from 'framer-motion';

interface SolutionProps {
  onStartClick: () => void;
}

const KILLER_POINTS = [
  {
    title: "데이터의 '직관적 번역'",
    desc: "숫자 뭉치 대신 '구독자 쑥쑥 키워드'처럼 당신이 당장 해야 할 행동(Action)으로 번역해 드려요.",
    icon: "🗺️",
    badge: "Intuitive",
    color: "#FF5E4D"
  },
  {
    title: "크로스오버 키워드 믹서",
    desc: "뻔한 기획은 그만. '내 주제'와 '최신 트렌드'를 섞어 장원영의 사고방식 같은 떡상 제목을 만듭니다.",
    icon: "🌪️",
    badge: "Crossover",
    color: "#000000"
  },
  {
    title: "리텐션 기반 '필수 컷' 가이드",
    desc: "시청 지속 시간이 높은 장면만 분석해, 이 타이밍엔 어떤 컷을 찍어야 하는지 PD처럼 코칭합니다.",
    icon: "🎬",
    badge: "Retention",
    color: "#FF5E4D"
  }
];

const Solution: React.FC<SolutionProps> = ({ onStartClick }) => {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden flex flex-wrap gap-20 p-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-9xl font-black transform rotate-12">UPDIA</div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="w-20 h-20 bg-highlight/10 rounded-3xl flex items-center justify-center mx-auto mb-8"
            >
              <span className="text-4xl">🚀</span>
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight tracking-tighter">
              기존 툴이 '계기판'이라면,<br/>
              우리는 <span className="highlight">'네비게이션'</span>입니다.
            </h2>
            <p className="text-xl md:text-3xl text-gray-400 font-bold max-w-4xl mx-auto leading-relaxed">
              어디로 가야 할지 모르는 숫자는 버리세요.<br/>
              우리는 당신이 <span className="text-black">핸들을 꺾어야 할 타이밍</span>을 알려드립니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {KILLER_POINTS.map((kp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ 
                  y: -15, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="perspective-1000 p-12 rounded-[4rem] bg-gray-50 border border-gray-100 relative group overflow-hidden shadow-sm hover:shadow-2xl transition-all"
              >
                <motion.div 
                  className="absolute -right-5 -bottom-5 text-9xl opacity-[0.05] group-hover:opacity-10 transition-opacity"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5 }}
                >
                  {kp.icon}
                </motion.div>
                
                <span className="inline-block px-4 py-2 bg-black text-white text-xs font-black rounded-xl mb-8 uppercase tracking-widest">{kp.badge}</span>
                <div className="text-6xl mb-8">{kp.icon}</div>
                <h3 className="text-3xl font-black mb-6 leading-tight">{kp.title}</h3>
                <p className="text-xl text-gray-500 font-bold leading-relaxed">{kp.desc}</p>
                
                <motion.div 
                  className="mt-10 h-1.5 w-0 bg-highlight group-hover:w-full transition-all duration-700 rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to Action for this section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-black rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-highlight/20 blur-[80px]" />
          <h3 className="text-3xl md:text-5xl font-black mb-10 leading-tight">
            유튜브에 정답은 없지만,<br/><span className="highlight">해답은 당신 안에</span> 있습니다
          </h3>
          <motion.button
            onClick={onStartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-white text-black rounded-full text-xl font-black shadow-xl"
          >
            3분 만에 내 유튜브 운명 확인하기
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
