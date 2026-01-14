
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Token } from '../../types';
import { Waves, Sparkles, Activity, Zap, Info, ArrowRight } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const EncodingStage: React.FC<Props> = ({ tokens }) => {
  const [activePos, setActivePos] = useState(0);

  // Auto-advance to show the scanning logic clearly
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePos((prev) => (prev + 1) % tokens.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [tokens.length]);

  return (
    <div className="flex flex-col items-center w-full min-h-full py-16 px-6 relative overflow-y-auto custom-scrollbar">
      {/* Narrative Header */}
      <div className="text-center max-w-3xl mb-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6"
        >
          <Activity className="w-3.5 h-3.5" />
          The Mathematical ID
        </motion.div>
        
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
          From Wave to <span className="text-cyan-400">Coordinate</span>
        </h2>
        
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          We use a <strong>Sine Wave</strong> as a measuring tape. By checking the height of the wave at each word's spot, we get a unique number—an <span className="text-white font-bold italic">Address Value</span>—that we "glue" to the word.
        </p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 mb-20">
        
        {/* Left: The Wave Scanner */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[3rem] backdrop-blur-md shadow-2xl relative overflow-hidden h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-2xl">
                       <Waves className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-white uppercase tracking-tight">The Sine Pattern</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Generating the Position ID</p>
                    </div>
                 </div>
                 <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex flex-col items-end">
                    <span className="text-[9px] font-black text-slate-600 uppercase">Input Word #{activePos}</span>
                    <span className="text-lg font-mono font-black text-cyan-400 italic">"{tokens[activePos].text}"</span>
                 </div>
              </div>

              {/* The Interactive Wave Area */}
              <div className="relative h-64 w-full bg-slate-950/50 rounded-3xl border border-slate-800/50 mb-8 flex items-center justify-center p-4">
                 <WaveGraph activePos={activePos} totalTokens={tokens.length} />
                 
                 {/* Value Display Box */}
                 <motion.div 
                   key={activePos}
                   initial={{ opacity: 0, scale: 0.9, x: 20 }}
                   animate={{ opacity: 1, scale: 1, x: 0 }}
                   className="absolute top-1/2 right-12 -translate-y-1/2 bg-cyan-500 p-4 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] z-20"
                 >
                    <div className="text-[8px] font-black text-cyan-900 uppercase mb-1">Captured Height</div>
                    <div className="text-2xl font-mono font-black text-white leading-none">
                       {Math.sin(activePos * (Math.PI / 4)).toFixed(3)}
                    </div>
                 </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                    <h5 className="text-[10px] font-black text-cyan-400 uppercase mb-2 flex items-center gap-2">
                       <Info className="w-3 h-3" />
                       Why this number?
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Without this height value, the word <span className="text-white">"The"</span> at the start looks identical to the <span className="text-white">"The"</span> in the middle. This number is their <span className="text-cyan-200">identity card</span>.
                    </p>
                 </div>
                 <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                    <h5 className="text-[10px] font-black text-rose-400 uppercase mb-2 flex items-center gap-2">
                       <Activity className="w-3 h-3" />
                       The Wave Secret
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      A sine wave is perfect because it never changes abruptly. Neighboring words get <span className="text-white italic">neighboring values</span>, helping the model understand distance.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: The Column Merge Animation */}
        <div className="lg:col-span-5 flex flex-col gap-4">
           <div className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Merging Meaning + Position
           </div>
           
           <div className="flex flex-col gap-3 h-full max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {tokens.map((token, i) => (
                <ValueMergeRow 
                  key={token.id} 
                  token={token} 
                  index={i} 
                  isActive={activePos === i} 
                />
              ))}
           </div>
        </div>
      </div>

      {/* Narrative Legend */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-4xl w-full bg-slate-900/40 p-10 rounded-[3rem] border border-slate-800 backdrop-blur-sm z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
           <div className="text-center md:text-left">
              <h4 className="text-xl font-black text-white mb-2 tracking-tighter">The "Bag of Words" Fix</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We take the <strong>Semantic Vector</strong> (what the word means) and add the <strong>Wave Value</strong> (where the word is). 
              </p>
           </div>
           <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-12 h-2 rounded-full bg-emerald-500/30 border border-emerald-400/50" />
                 <span className="text-[10px] font-black text-slate-400">Meaning</span>
              </div>
              <div className="text-slate-700 font-black">+</div>
              <div className="flex items-center gap-2">
                 <div className="w-12 h-2 rounded-full bg-cyan-500/30 border border-cyan-400/50" />
                 <span className="text-[10px] font-black text-slate-400">Sine Height</span>
              </div>
           </div>
           <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <div className="px-6 py-3 bg-cyan-500 rounded-2xl shadow-lg shadow-cyan-900/40 border border-cyan-400/30">
                 <span className="text-xs font-black text-white uppercase tracking-widest">Encoded Vector</span>
              </div>
              <span className="mt-3 text-[9px] text-slate-600 font-mono">Position information is now baked in!</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const WaveGraph = ({ activePos, totalTokens }: { activePos: number; totalTokens: number }) => {
  const points = totalTokens;
  const step = 800 / points;

  return (
    <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible">
      {/* Background Grid Lines */}
      {[...Array(points)].map((_, i) => (
        <line 
          key={i} 
          x1={i * step} y1="0" x2={i * step} y2="200" 
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" 
        />
      ))}
      <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* The Sine Wave Path */}
      <motion.path
        d={`M 0 100 ${[...Array(points)].map((_, i) => {
          const x = i * step;
          const y = 100 - Math.sin(i * (Math.PI / 4)) * 70;
          return `L ${x} ${y}`;
        }).join(' ')}`}
        fill="none"
        stroke="#06b6d4"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Active Scanner Line */}
      <motion.g
        animate={{ x: activePos * step }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <line x1="0" y1="0" x2="0" y2="200" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
        <circle 
          cx="0" 
          cy={100 - Math.sin(activePos * (Math.PI / 4)) * 70} 
          r="8" 
          fill="#fff" 
          stroke="#06b6d4" 
          strokeWidth="3" 
          className="shadow-lg"
        />
        <motion.circle 
           r="15" 
           fill="none" 
           stroke="#06b6d4" 
           strokeWidth="1"
           animate={{ scale: [1, 2], opacity: [1, 0] }}
           transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.g>

      {/* Position Labels */}
      {[...Array(points)].map((_, i) => (
        <text 
          key={i} 
          x={i * step} 
          y="195" 
          textAnchor="middle" 
          className={`text-[10px] font-mono transition-colors ${activePos === i ? 'fill-cyan-400 font-bold' : 'fill-slate-700'}`}
        >
          {i}
        </text>
      ))}
    </svg>
  );
};

interface RowProps {
  token: Token;
  index: number;
  isActive: boolean;
}

const ValueMergeRow: React.FC<RowProps> = ({ token, index, isActive }) => {
  const val = Math.sin(index * (Math.PI / 4));
  
  return (
    <motion.div 
      animate={{ 
        scale: isActive ? 1.02 : 1,
        borderColor: isActive ? 'rgba(6, 182, 212, 0.4)' : 'rgba(30, 41, 59, 0.5)',
        backgroundColor: isActive ? 'rgba(15, 23, 42, 0.8)' : 'rgba(15, 23, 42, 0.4)'
      }}
      className="relative flex items-center gap-4 p-4 border rounded-2xl transition-colors overflow-hidden"
    >
       {/* 1. Identity */}
       <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-black text-slate-100 text-xs">
          {index}
       </div>

       {/* 2. Visual Equation */}
       <div className="flex-1 flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-sm font-black text-white uppercase">{token.text}</span>
             <span className="text-[8px] font-bold text-slate-600 uppercase">Meaning</span>
          </div>

          <div className="text-slate-800 font-bold mx-2">+</div>

          <div className="flex flex-col items-center">
             <div className="flex items-center gap-1.5 h-4 mb-1">
                {/* A "Geometric Profile" of the value */}
                {[...Array(4)].map((_, j) => (
                  <motion.div 
                    key={j}
                    animate={{ height: isActive ? 12 : 4, opacity: isActive ? 1 : 0.3 }}
                    className="w-1 rounded-full"
                    style={{ 
                      backgroundColor: val > 0 ? '#06b6d4' : '#ec4899',
                      height: `${Math.abs(val) * (10 + j * 4)}px`
                    }}
                  />
                ))}
             </div>
             <span className={`text-[9px] font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
               {val.toFixed(2)}
             </span>
          </div>

          <div className="mx-4">
             <ArrowRight className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-800'}`} />
          </div>

          {/* Result Tag */}
          <div className={`px-3 py-1.5 rounded-lg border transition-all ${isActive ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-slate-900 border-slate-800'}`}>
             <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`} />
                <span className={`text-[8px] font-black uppercase tracking-tighter ${isActive ? 'text-white' : 'text-slate-600'}`}>
                   ID_{index}
                </span>
             </div>
          </div>
       </div>

       {/* Background Active Glow */}
       <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-transparent pointer-events-none"
            />
          )}
       </AnimatePresence>
    </motion.div>
  );
};

export default EncodingStage;
