
import React from 'react';
import { motion } from 'framer-motion';

const FLOW_STEPS = [
  { id: "01", title: "진입 & 진단", icon: "🧬", desc: "나의 '유튜브 이키가이'를 찾습니다." },
  { id: "02", title: "데일리 루틴", icon: "☀️", desc: "PD가 전해주는 3가지 퀘스트 수행." },
  { id: "03", title: "본격 기획", icon: "📝", desc: "키워드 믹서로 실패 없는 제목 생성." },
  { id: "04", title: "제작 & 검증", icon: "🧪", desc: "AI 모의고사로 썸네일 미리보기." },
  { id: "05", title: "부스팅", icon: "🚀", desc: "알고리즘 골든 타임을 잡습니다." }
];

const ProcessFlow: React.FC = () => {
  return (
    <section className="py-40 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-6xl font-black mb-24"
        >
          지금 바로<br/>시작하는 성장 프로세스
        </motion.h2>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-highlight/20 hidden md:block -translate-y-1/2" />
          
          {FLOW_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(255,94,77,0.5)] mb-8 border-4 border-highlight">
                {step.icon}
              </div>
              <div className="text-highlight font-black mb-2 tracking-widest">{step.id}</div>
              <h3 className="text-xl font-black mb-4">{step.title}</h3>
              <p className="text-gray-500 font-bold text-sm max-w-[150px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
