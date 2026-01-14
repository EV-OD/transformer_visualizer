
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Token } from '../../types';
import { Clock, Timer, Milestone, HelpCircle, ChevronRight } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const SignalStage: React.FC<Props> = ({ tokens }) => {
  const [activePos, setActivePos] = useState(0);

  // Auto-advance the demonstration position
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePos((prev) => (prev + 1) % tokens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tokens.length]);

  return (
    <div className="flex flex-col items-center w-full min-h-full py-16 px-6 relative overflow-y-auto custom-scrollbar">
      {/* Friendly Header */}
      <div className="text-center max-w-3xl mb-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full text-[10px] font-black text-violet-400 uppercase tracking-widest mb-6"
        >
          <Timer className="w-3.5 h-3.5" />
          The Word Clock
        </motion.div>
        
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
          How to tell <span className="text-violet-400">Time</span> in a Sentence
        </h2>
        
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          Think of the Transformer as giving every word a unique <span className="text-white font-bold italic">Pocket Watch</span>. The hands move as you go from the start of the sentence to the end.
        </p>
      </div>

      {/* Main Interactive Metaphor Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 mb-20">
        
        {/* Left: The Word List Selector */}
        <div className="lg:col-span-4 flex flex-col gap-2">
           <div className="px-4 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">Select a word</div>
           {tokens.map((token, i) => (
             <motion.button
               key={token.id}
               onClick={() => setActivePos(i)}
               whileHover={{ x: 5 }}
               className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                 activePos === i 
                   ? 'bg-violet-500 border-violet-400 text-white shadow-lg shadow-violet-900/40' 
                   : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
               }`}
             >
               <div className="flex items-center gap-3">
                 <span className={`text-[10px] font-mono ${activePos === i ? 'text-violet-200' : 'text-slate-600'}`}>0{i}</span>
                 <span className="font-black uppercase tracking-tight">{token.text}</span>
               </div>
               <ChevronRight className={`w-4 h-4 transition-transform ${activePos === i ? 'rotate-0' : 'opacity-0'}`} />
             </motion.button>
           ))}
        </div>

        {/* Right: The Clock Visualization */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <motion.div 
            key={activePos}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/60 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-md shadow-2xl relative overflow-hidden"
          >
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center border-2 border-violet-500/50">
                      <span className="text-3xl font-black text-white">{activePos}</span>
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-white">Position #{activePos}</h4>
                      <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">Unique Address Signature</p>
                   </div>
                </div>
                <div className="hidden md:block">
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Token Identity</span>
                      <span className="text-lg font-black text-white uppercase italic tracking-tighter">"{tokens[activePos].text}"</span>
                   </div>
                </div>
             </div>

             {/* The Clocks Grid */}
             <div className="grid grid-cols-4 sm:grid-cols-8 gap-6 mb-12">
                {[...Array(8)].map((_, dim) => (
                  <ClockDial key={dim} dim={dim} pos={activePos} totalDims={8} />
                ))}
             </div>

             <div className="flex items-start gap-4 p-5 bg-violet-500/5 border border-violet-500/20 rounded-2xl">
                <HelpCircle className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Notice how the <span className="text-violet-300 font-bold">Fast Hands</span> (left) move a lot for every word, while the <span className="text-violet-300 font-bold">Slow Hands</span> (right) barely move at all. Together, they create a "time stamp" that never repeats!
                </p>
             </div>
          </motion.div>

          {/* Logic Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
                <div className="flex items-center gap-3 mb-3">
                   <Milestone className="w-5 h-5 text-emerald-400" />
                   <h5 className="text-sm font-black text-white uppercase tracking-widest">Relative Distance</h5>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Because these patterns follow waves, the model knows that word 1 is "closer" to word 2 than word 10, just by looking at how much the clock hands shifted.
                </p>
             </div>
             <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
                <div className="flex items-center gap-3 mb-3">
                   <Clock className="w-5 h-5 text-rose-400" />
                   <h5 className="text-sm font-black text-white uppercase tracking-widest">No Max Length</h5>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Unlike a fixed numbering system (1, 2, 3...), these waves can keep generating unique patterns for sentences that are thousands of words long.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-2xl text-center bg-violet-500/5 p-8 rounded-[2.5rem] border border-violet-500/20 backdrop-blur-sm z-10"
      >
        <p className="text-slate-500 text-sm leading-relaxed">
          The result? The Transformer now has a <span className="text-white font-bold italic">Geometric Barcode</span> for every word. It's ready to start paying <strong>Attention</strong>.
        </p>
      </motion.div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3),transparent_70%)]" />
      </div>
    </div>
  );
};

interface ClockProps {
  dim: number;
  pos: number;
  totalDims: number;
}

const ClockDial: React.FC<ClockProps> = ({ dim, pos, totalDims }) => {
  // Use a simplified version of the PE math for visual representation
  // Low dims rotate fast, high dims rotate slow
  const frequency = Math.pow(10, (dim / (totalDims - 1)) * 2);
  const angle = (pos * 360) / (frequency * 2);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-14 h-14 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center shadow-inner">
        {/* Clock Ticks */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-0.5 h-1.5 bg-slate-800" 
            style={{ transform: `rotate(${i * 90}deg) translateY(-22px)` }}
          />
        ))}
        
        {/* The Hand */}
        <motion.div 
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="absolute w-1 h-6 bg-gradient-to-t from-violet-600 to-violet-400 rounded-full origin-bottom"
          style={{ bottom: '50%' }}
        />
        
        {/* Center Point */}
        <div className="w-2 h-2 rounded-full bg-white z-10 shadow-[0_0_10px_white]" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">
          {dim === 0 ? 'FAST' : (dim === totalDims - 1 ? 'SLOW' : `DIM ${dim}`)}
        </span>
      </div>
    </div>
  );
}

export default SignalStage;
