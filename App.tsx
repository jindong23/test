
import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import ProblemAgitation from './components/ProblemAgitation';
import Solution from './components/Solution';
import ProcessFlow from './components/ProcessFlow';
import ContactCTA from './components/ContactCTA';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import DiagnosticTool from './components/DiagnosticTool';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'diagnostic'>('landing');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const startDiagnostic = () => {
    setView('diagnostic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('landing');
  };

  return (
    <div className="relative min-h-screen selection:bg-[#FF5E4D] selection:text-white overflow-x-hidden">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-highlight z-50 origin-left"
              style={{ scaleX }}
            />
            <Header onStartClick={startDiagnostic} />
            <main>
              <Hero onStartClick={startDiagnostic} />
              <ProblemAgitation />
              <Solution onStartClick={startDiagnostic} />
              <ProcessFlow />
              <ContactCTA />
            </main>
            <footer className="py-20 bg-black text-white flex flex-col items-center justify-center text-sm">
              <div className="text-2xl font-black mb-6">UP<span className="text-highlight">DIA</span></div>
              <p className="opacity-50">© 2025 UPDIA. All rights reserved.</p>
              <p className="mt-2 opacity-50 italic text-xs">데이터를 행동으로 번역하는 당신의 AI 유튜브 PD</p>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="diagnostic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DiagnosticTool onBack={goHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
