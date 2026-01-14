import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Token } from '../../types';
import { Target, Zap, Sparkles, Activity, Search, Languages, ChevronRight } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const VOCAB_SAMPLE = [
  { word: "throne", prob: 0.45, color: '#10b981' },
  { word: "crown", prob: 0.22, color: '#34d399' },
  { word: "castle", prob: 0.15, color: '#6ee7b7' },
  { word: "palace", prob: 0.08, color: '#a7f3d0' },
  { word: "realm", prob: 0.04, color: '#d1fae5' },
  { word: "guards", prob: 0.02, color: '#ecfdf5' }
];

const OutputStage: React.FC<Props> = ({ tokens }) => {
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIdx(prev => (prev + 1) % VOCAB_SAMPLE.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar">
      {/* Educational Header */}
      <div className="text-center max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6">
          <Languages className="w-3.5 h-3.5" />
          The Grand Finale
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          Final <span className="text-emerald-400">Projection</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          The complex vectors from the last block represent the model's total understanding. 
          We project them back into the <strong>Vocabulary</strong> to predict the next word.
        </p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
         
         {/* Left: The Decoding Visual */}
         <div className="lg:col-span-8 p-12 bg-slate-900/60 border border-slate-800 rounded-[3.5rem] backdrop-blur-md relative overflow-hidden flex flex-col justify-center min-h-[550px]">
            <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none" />
            
            <div className="relative h-96 flex items-center justify-around">
               
               {/* 1. Final Hidden State Vector */}
               <div className="flex flex-col items-center gap-4 z-10">
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -inset-8 bg-violet-600/30 blur-3xl rounded-full"
                    />
                    <div className="w-24 h-24 rounded-[2.5rem] bg-violet-600 border-4 border-violet-400 shadow-2xl flex items-center justify-center relative z-10">
                       <Sparkles className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest block">Final Context</span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase italic">d=512 Hidden State</span>
                  </div>
               </div>

               {/* 2. The Projection Ray */}
               <div className="flex-1 flex items-center justify-center px-8 relative">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                     <defs>
                        <linearGradient id="rayGrad" x1="0" y1="0" x2="1" y2="0">
                           <stop offset="0%" stopColor="#7c3aed" />
                           <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                     </defs>
                     <motion.line 
                        x1="10%" y1="50%" x2="90%" y2="50%"
                        stroke="url(#rayGrad)" strokeWidth="4" strokeDasharray="10 5"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                     />
                  </svg>
                  <div className="z-10 px-4 py-2 bg-slate-950 border-2 border-slate-800 rounded-full flex items-center gap-3 shadow-xl">
                     <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                     <span className="text-[9px] font-black text-white uppercase tracking-widest italic">Linear Un-Embedding</span>
                  </div>
               </div>

               {/* 3. The Probability Cloud */}
               <div className="w-64 flex flex-col gap-2 z-10">
                  {VOCAB_SAMPLE.map((item, i) => (
                    <motion.div 
                       key={item.word}
                       animate={{ 
                         backgroundColor: activeWordIdx === i ? 'rgba(16, 185, 129, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                         borderColor: activeWordIdx === i ? item.color : 'rgba(30, 41, 59, 1)',
                         scale: activeWordIdx === i ? 1.05 : 1,
                       }}
                       className="p-3 rounded-xl border flex items-center justify-between transition-all"
                    >
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${activeWordIdx === i ? 'animate-pulse' : 'opacity-20'}`} style={{ backgroundColor: item.color }} />
                          <span className={`text-[11px] font-black uppercase tracking-tight ${activeWordIdx === i ? 'text-white' : 'text-slate-600'}`}>"{item.word}"</span>
                       </div>
                       <span className={`text-[10px] font-mono font-bold ${activeWordIdx === i ? 'text-emerald-400' : 'text-slate-800'}`}>{(item.prob * 100).toFixed(0)}%</span>
                    </motion.div>
                  ))}
               </div>

            </div>
         </div>

         {/* Right: The Logic Column */}
         <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[3rem] flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Softmax Winner</h4>
               </div>
               <p className="text-sm text-slate-400 leading-relaxed italic">
                 The model doesn't just "know" the word. It calculates scores for all 50,000+ words in its vocabulary. The word with the highest probability is usually chosen as the prediction.
               </p>
            </div>

            <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[3rem] flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-slate-500" />
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Auto-Regression</h4>
               </div>
               <p className="text-sm text-slate-400 leading-relaxed italic">
                 Once <strong>"{VOCAB_SAMPLE[0].word}"</strong> is picked, it is added back to the input as a new token. The whole machine starts over from Step 1 to predict the next word in the sequence.
               </p>
            </div>

            <div className="mt-auto p-6 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase">Current Prediction</span>
                  <span className="text-xl font-black text-white italic tracking-tighter">"throne"</span>
               </div>
               <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                  <ChevronRight className="w-6 h-6 text-white" />
               </div>
            </div>
         </div>

      </div>

      {/* Closing Statement */}
      <div className="w-full max-w-4xl p-10 bg-slate-900/20 border border-slate-800 rounded-[3.5rem] backdrop-blur-md text-center">
         <div className="flex flex-col items-center gap-4">
            <Sparkles className="w-8 h-8 text-emerald-400" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
               And that is the life of a token. From a raw character to a high-dimensional concept, and back to a human word. You've just seen the heartbeat of modern intelligence.
            </p>
         </div>
      </div>
    </div>
  );
};

export default OutputStage;