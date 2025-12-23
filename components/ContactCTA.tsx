
import React from 'react';
import { motion } from 'framer-motion';

const ContactCTA: React.FC = () => {
  const benefits = [
    {
      title: "2026년 유튜브 카테고리별 트렌드",
      desc: "데이터로 예측한 미래의 떡상 키워드 리포트",
      icon: "📈"
    },
    {
      title: "유튜버 심층 유형 테스트(총 55문항) 결과",
      desc: "리포트 및 맞춤형 첫 영상 스크립트 포함",
      icon: "🧬"
    },
    {
      title: "무료 유튜버 성장 로드맵 컨설팅",
      desc: "전문 PD의 시선으로 분석한 1:1 진단",
      icon: "🚀"
    }
  ];

  return (
    <section id="contact-section" className="py-40 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-gray-50 rounded-[5rem] p-12 md:p-24 text-center border-4 border-black relative overflow-hidden shadow-[20px_20px_0px_0px_#FF5E4D]">
          <div className="absolute top-0 left-0 w-full h-3 bg-highlight" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="inline-block px-6 py-2 bg-highlight text-white text-sm font-black rounded-full mb-8 shadow-lg shadow-highlight/20"
            >
              LIMITED OFFER: ONLY 7 DAYS
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight">
              고민은 배송만 늦출 뿐,<br/>
              <span className="highlight">성장</span>은 채용에서 시작됩니다.
            </h2>
            
            {/* Benefits List */}
            <div className="max-w-3xl mx-auto mb-16 space-y-6 text-left">
              <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest text-center mb-8">
                지금 받을 수 있는 혜택
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center space-x-6 bg-white p-6 rounded-3xl border-2 border-black/5 hover:border-highlight/30 transition-colors"
                  >
                    <div className="text-3xl">{benefit.icon}</div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900">{benefit.title}</h4>
                      <p className="text-gray-500 font-bold text-sm">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255, 94, 77, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-16 py-9 bg-black text-white rounded-[2.5rem] text-2xl md:text-3xl font-black shadow-2xl flex items-center justify-center space-x-4"
              >
                <span>단 7일, 무료로 AI 유튜브 PD 채용하기</span>
                <span className="text-highlight animate-pulse">✨</span>
              </motion.button>
            </div>

            <p className="mt-12 text-gray-400 font-bold text-sm">
              * 선착순 월 10분께만 제공되는 프리미엄 진단 리포트가 포함됩니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
