
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Token } from '../../../types';

interface Props {
  tokens: Token[];
}

const TokenizationVisualizer: React.FC<Props> = ({ tokens }) => {
  const [phase, setPhase] = useState<'text' | 'splitting' | 'tokens'>('text');
  const fullText = tokens.map(t => t.text).join(' ');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('splitting'), 1800);
    const timer2 = setTimeout(() => setPhase('tokens'), 3600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full min-h-[300px] flex items-center justify-center relative py-8">
      <AnimatePresence mode="wait">
        {phase === 'text' && (
          <motion.div
            key="raw-text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
            className="flex flex-col items-center px-4 w-full"
          >
            <div className="text-2xl md:text-4xl font-black text-slate-100 tracking-tight text-center max-w-5xl leading-tight uppercase">
              {fullText}
            </div>
            <div className="w-full max-w-md mt-6 h-1 bg-slate-800 rounded-full relative overflow-hidden">
               <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 bg-cyan-500 origin-left rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              />
            </div>
            <div className="mt-4 text-slate-500 font-mono text-[10px] uppercase tracking-widest">Character Stream Ingestion</div>
          </motion.div>
        )}

        {phase === 'splitting' && (
          <motion.div
            key="splitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-wrap justify-center gap-0.5 max-w-6xl px-4 relative"
          >
            {fullText.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.005 }}
                className={`text-xl md:text-2xl font-black ${char === ' ' ? 'mx-1' : 'text-slate-400'}`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <motion.div 
              animate={{ x: [-200, 200], opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-1 bg-cyan-400 shadow-[0_0_30px_rgba(6,182,212,1)]"
            />
          </motion.div>
        )}

        {phase === 'tokens' && (
          <motion.div
            key="tokens"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-full px-4"
          >
            {tokens.map((token, i) => (
              <motion.div
                key={token.id}
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 30,
                  delay: i * 0.05 
                }}
                className="group relative"
              >
                <div className="px-4 py-5 bg-slate-900 border border-slate-800 rounded-[1.25rem] shadow-2xl flex flex-col items-center border-b-cyan-500/50 min-w-[85px] group-hover:border-cyan-500 transition-colors">
                  <span className="text-sm font-black text-white tracking-tight">{token.text}</span>
                  <div className="mt-2 flex flex-col items-center">
                    <div className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">ID-MAP</div>
                    <div className="text-[9px] font-mono text-cyan-500/80">0x{i.toString(16).padStart(2, '0')}</div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -inset-1 bg-cyan-500/10 blur-xl rounded-2xl -z-10"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TokenizationVisualizer;
