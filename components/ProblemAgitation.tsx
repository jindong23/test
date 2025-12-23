
import React from 'react';
import { motion } from 'framer-motion';

const PERSONAS = [
  {
    role: "직장인",
    target: "퇴사 후 새로운 삶",
    question: "퇴사하고 유튜브나 해볼까 생각만 하다가 n년째 고민 중인 직장인",
    emoji: "💼"
  },
  {
    role: "꿈나무",
    target: "스타 유튜버 지망",
    question: "남들 다 하는 거 따라는 해야 할 것 같은데, 막상 뭘 해야 할지 모르겠는 스타 유튜버 꿈나무",
    emoji: "🎧"
  },
  {
    role: "1인 대표",
    target: "비즈니스 스케일업",
    question: "내가 만든 서비스로 사업 키우고 싶은데 마케팅이 막막한 1인 대표",
    emoji: "📈"
  },
  {
    role: "5-60대",
    target: "제2의 인생 도전",
    question: "정년퇴임 후에 다른 도전을 해봐야 할 것 같긴 한데 막막한 5-60대",
    emoji: "⛳"
  },
  {
    role: "어머니",
    target: "경제적 독립",
    question: "전업 주부로 경제적 부담을 덜어주기 위해 유튜브 시작하고 싶은 어머니",
    emoji: "🍳"
  }
];

const ProblemAgitation: React.FC = () => {
  return (
    <section className="py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-highlight font-black tracking-widest uppercase text-sm mb-4 block">Current Reality</span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
            성공의 의지는 충분하지만,<br/><span className="highlight">막막함</span>이 앞을 가로막고 있나요?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PERSONAS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, borderColor: '#FF5E4D' }}
              className="bg-white p-10 rounded-[3rem] shadow-sm border-2 border-transparent flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="text-5xl mb-6">{p.emoji}</div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-black text-white text-[10px] font-black px-2 py-1 rounded-md">{p.role}</span>
                  <span className="text-gray-400 font-bold text-xs">{p.target}</span>
                </div>
                <p className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
                  {p.question}
                </p>
              </div>
              <div className="mt-10 h-1 w-12 bg-gray-100 group-hover:w-full group-hover:bg-highlight transition-all duration-500" />
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-black p-10 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center text-center text-white space-y-6"
          >
            <h3 className="text-3xl font-black italic">"당신의 진심이<br/>가치 있는 성과로<br/>이어지도록 돕습니다."</h3>
            <p className="text-gray-400 font-bold text-sm">UPDIA와 함께 시작하세요.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemAgitation;
