
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Layers, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const PositionalStage: React.FC<Props> = ({ tokens }) => {
  return (
    <div className="flex flex-col items-center w-full min-h-full py-12 px-6 relative overflow-y-auto custom-scrollbar">
      {/* Narrative Header */}
      <div className="text-center max-w-3xl mb-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-full text-[10px] font-black text-rose-400 uppercase tracking-widest mb-6"
        >
          <MapPin className="w-3.5 h-3.5" />
          Positional Injection
        </motion.div>
        
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
          The <span className="text-rose-500">Address</span> Math
        </h2>
        
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          We transform raw tokens into <span className="text-violet-400 font-bold">Contextualized Vectors</span> by merging their meaning with their position in the sequence.
        </p>
      </div>

      {/* Vertical Column of Token Merges */}
      <div className="w-full max-w-4xl flex flex-col gap-4 pb-20 z-10">
        <div className="flex items-center gap-2 mb-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
           <Layers className="w-3 h-3" />
           Per-Token Merging Operation
        </div>
        {tokens.map((token, i) => (
          <TokenMergeRow key={token.id} token={token} index={i} />
        ))}
      </div>

      {/* Concept Explanation Box */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl text-center bg-rose-500/5 p-8 rounded-[2.5rem] border border-rose-500/20 backdrop-blur-sm z-10"
      >
        <p className="text-slate-500 text-sm leading-relaxed">
          Think of this as attaching a <span className="text-white font-bold italic">Global GPS coordinate</span> to every word. Even if the words are processed in parallel on the GPU, they now carry their order within themselves.
        </p>
      </motion.div>

      {/* Global Background Decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-500/20 rounded-full blur-[120px]" />
      </div>
    </div>
  );
};

interface RowProps {
  token: Token;
  index: number;
}

const TokenMergeRow: React.FC<RowProps> = ({ token, index }) => {
  const duration = 4;
  const delay = index * 0.2;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-800/60 transition-colors backdrop-blur-sm overflow-hidden"
    >
      <div className="flex items-center gap-4 w-40 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-black text-white shadow-lg">
          {index}
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black text-white tracking-tight">{token.text}</span>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Token</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-8 relative h-16">
        <motion.div
          animate={{ 
            x: [0, 60, 60, 0],
            opacity: [1, 1, 0, 0],
            scale: [1, 1, 0.8, 1]
          }}
          transition={{ duration, repeat: Infinity, times: [0, 0.4, 0.5, 1], delay }}
          className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl"
        >
          <Layers className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">Semantic</span>
        </motion.div>

        <motion.div 
          animate={{ opacity: [1, 0, 0, 1] }}
          transition={{ duration, repeat: Infinity, times: [0, 0.4, 0.6, 1], delay }}
          className="text-slate-700 font-bold"
        >
          +
        </motion.div>

        <motion.div
          animate={{ 
            x: [0, -60, -60, 0],
            opacity: [1, 1, 0, 0],
            scale: [1, 1, 0.8, 1]
          }}
          transition={{ duration, repeat: Infinity, times: [0, 0.4, 0.5, 1], delay }}
          className="flex items-center gap-3 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-xl"
        >
          <MapPin className="w-4 h-4 text-rose-500" />
          <span className="text-[10px] font-black text-rose-400 uppercase tracking-tighter">Position</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0, 1, 1, 0],
            scale: [0, 0, 1.2, 1, 0.8],
          }}
          transition={{ duration, repeat: Infinity, times: [0, 0.4, 0.45, 0.8, 1], delay }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="flex items-center gap-3 px-8 py-3 bg-violet-500 border-2 border-violet-400 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.6)]">
             <Sparkles className="w-5 h-5 text-white" />
             <span className="text-xs font-black text-white uppercase tracking-widest">Contextual Vector</span>
          </div>
          <motion.div 
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 0.5, delay: delay + duration * 0.45 }}
            className="absolute w-20 h-20 bg-violet-400 rounded-full blur-xl"
          />
        </motion.div>
      </div>

      <div className="w-32 flex justify-end">
        <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
           <ArrowRight className="w-4 h-4 text-slate-600 mb-1" />
           <span className="text-[8px] font-mono text-slate-500">vec_{index} + pe_{index}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </motion.div>
  );
};

export default PositionalStage;
