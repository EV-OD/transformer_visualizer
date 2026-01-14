
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import GPUParallelVisual from './PositionalStage/GPUParallelVisual';
import { Cpu, Info } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const HardwareStage: React.FC<Props> = ({ tokens }) => {
  return (
    <div className="flex flex-col items-center w-full min-h-full py-10 px-6 relative overflow-y-auto custom-scrollbar">
      {/* Hardware Context Header */}
      <div className="text-center max-w-3xl mb-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6"
        >
          <Cpu className="w-3.5 h-3.5" />
          Hardware Layer: Massive Parallelism
        </motion.div>
        
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
          The <span className="text-emerald-400">Parallel</span> Processing Reality
        </h2>
        
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          Transformers use GPUs to process every word <span className="text-white font-bold italic underline decoration-emerald-500/50">simultaneously</span>. This speed is amazing, but it creates a problem: without extra data, the GPU doesn't know the order of words.
        </p>
      </div>

      {/* 3D GPU Simulation Container */}
      <div className="w-full max-w-6xl h-[600px] bg-slate-900/40 border border-slate-800 rounded-[3rem] mb-16 relative overflow-hidden backdrop-blur-sm group shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="absolute top-8 left-8 z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">H100 Parallel Compute Simulation</span>
          </div>
        </div>

        <GPUParallelVisual tokens={tokens} />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 bg-slate-950/80 px-6 py-3 rounded-2xl border border-slate-800 backdrop-blur-md">
           <Info className="w-4 h-4 text-emerald-500 shrink-0" />
           <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
             Observe: All tokens travel through roads into GPU ports <span className="text-white">simultaneously</span>
           </p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-2xl text-center bg-emerald-500/5 p-8 rounded-[2.5rem] border border-emerald-500/20 backdrop-blur-sm"
      >
        <p className="text-slate-500 text-sm leading-relaxed">
          While this parallelism is the secret to modern AI speed, it strips away the natural sequence of language. The GPU sees a "bag of words." In the next step, we'll see how we inject "Addresses" to fix this.
        </p>
      </motion.div>
    </div>
  );
};

export default HardwareStage;
