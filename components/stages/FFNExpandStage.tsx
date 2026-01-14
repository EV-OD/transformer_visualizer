
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Maximize, Cpu, Calculator, Layers, X } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const FFNExpandStage: React.FC<Props> = ({ tokens }) => {
  // We'll use a representative token (e.g., "king")
  const currentToken = tokens[1] || tokens[0]; 

  return (
    <div className="flex flex-col items-center py-12 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      {/* Educational Header */}
      <div className="text-center max-w-3xl mb-16 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] font-black text-amber-400 uppercase tracking-widest mb-6">
          <Cpu className="w-3.5 h-3.5" />
          Dimensional Upgrade
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          FFN <span className="text-amber-500">Expansion</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          The Feed-Forward Network begins by <strong>multiplying</strong> the token's vector 
          to increase its capacity. In standard Transformers, we expand by exactly <strong>4x</strong>.
        </p>
      </div>

      {/* Meaningful Transformation Stage */}
      <div className="w-full max-w-6xl p-12 bg-slate-900/30 border border-slate-800 rounded-[3rem] backdrop-blur-md relative overflow-hidden mb-12">
        
        {/* The Math Visual Flow */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-4 relative z-10 min-h-[400px]">
          
          {/* 1. INPUT (d_model) */}
          <div className="flex flex-col items-center gap-6 w-48">
            <div className="text-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2">Input Vector</span>
              <div className="px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-white mb-2 shadow-xl">
                "{currentToken.text}"
              </div>
            </div>

            {/* A single column representing d_model - Static High Fidelity */}
            <div className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-xl border border-slate-800/50">
              {[...Array(16)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="w-10 h-2.5 rounded-sm bg-slate-700 shadow-[inset_0_1px_rgba(255,255,255,0.05)]"
                />
              ))}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-2 font-bold uppercase">Size: 512 (d_model)</div>
          </div>

          {/* MULTIPLICATION SYMBOL */}
          <div className="flex items-center justify-center">
             <div className="text-amber-500/40 p-4">
                <X className="w-12 h-12 stroke-[3px]" />
             </div>
          </div>

          {/* 2. THE MULTIPLIER (W1) */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative group">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 bg-amber-500/10 blur-3xl rounded-full"
               />
               <div className="w-36 h-36 rounded-[2.5rem] bg-slate-950 border-2 border-slate-800 flex flex-col items-center justify-center shadow-2xl relative z-10 overflow-hidden group-hover:border-amber-500/50 transition-colors">
                  <div className="grid grid-cols-4 gap-1 opacity-20 absolute inset-0 p-5">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="bg-amber-500 rounded-sm w-full h-full" />
                    ))}
                  </div>
                  <Maximize className="w-12 h-12 text-amber-500 relative z-20 mb-1" />
                  <span className="text-[10px] font-black text-white relative z-20 uppercase tracking-widest">W₁ Matrix</span>
               </div>
            </div>
            
            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-px bg-slate-800" />
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] italic">Projection Step</span>
              <div className="w-10 h-px bg-slate-800" />
            </div>
          </div>

          {/* EQUALS SYMBOL */}
          <div className="flex items-center justify-center text-4xl font-black text-slate-800">
             =
          </div>

          {/* 3. EXPANDED OUTPUT (d_ff = 4 * d_model) */}
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] block mb-2">Expanded Result</span>
              <div className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[10px] font-black text-amber-400 mb-2 uppercase tracking-widest">
                4x Resolution
              </div>
            </div>

            {/* 4 columns representing the 4x expansion - Static Result */}
            <div className="flex gap-2 p-3 bg-amber-500/[0.03] border border-amber-500/10 rounded-2xl">
              {[0, 1, 2, 3].map((colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                   {[...Array(16)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        backgroundColor: i % 2 === 0 ? '#f59e0b' : '#b45309'
                      }}
                      transition={{ delay: 0.5 + colIdx * 0.1 + i * 0.02 }}
                      className="w-5 h-2.5 rounded-sm shadow-[inset_0_1px_rgba(255,255,255,0.1)]"
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="text-[10px] font-mono text-amber-500 mt-2 font-black uppercase">Size: 2048 (d_ff)</div>
          </div>

        </div>
      </div>

      {/* Logic Explained */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem]">
           <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-5 h-5 text-amber-500" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Why Expand?</h4>
           </div>
           <p className="text-sm text-slate-500 leading-relaxed italic">
             Expanding the vector is like <strong>upgrading to a higher-resolution screen</strong>. 
             It gives the model more "mathematical pixels" to store nuances about the current word 
             that would be squashed in a smaller vector.
           </p>
        </div>

        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem]">
           <div className="flex items-center gap-3 mb-4">
              <Layers className="w-5 h-5 text-amber-500" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">The Linear Step</h4>
           </div>
           <p className="text-sm text-slate-500 leading-relaxed italic">
             This is a simple <strong>Linear Projection</strong>. Each new dimension in the 2048-size vector 
             is a weighted combination of the original 512 dimensions. No "intelligence" is added yet—only 
             <strong>capacity</strong>.
           </p>
        </div>
      </div>
    </div>
  );
};

export default FFNExpandStage;
