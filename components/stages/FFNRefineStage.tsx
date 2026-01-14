
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Minimize, CheckCircle2, RefreshCcw, X, Zap, Cpu, Target } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const FFNRefineStage: React.FC<Props> = ({ tokens }) => {
  const currentToken = tokens[1] || tokens[0];

  return (
    <div className="flex flex-col items-center py-12 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      {/* Educational Header */}
      <div className="text-center max-w-3xl mb-12 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6">
          <RefreshCcw className="w-3.5 h-3.5" />
          The Final Distillation
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          The <span className="text-emerald-400">Contraction</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          After expanding to find complex patterns, the model must <strong>compress</strong> that reasoning back 
          into its core vector size. This is the "conclusion" phase of the thought cycle.
        </p>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 z-10 items-stretch mb-10">
        
        {/* Main Math Flow Visual */}
        <div className="lg:col-span-8 p-12 bg-slate-900/60 border border-slate-800 rounded-[3rem] backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden h-[550px]">
          <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none" />
          
          <div className="flex items-center justify-around w-full relative z-10">
            
            {/* 1. EXPANDED INPUT (d_ff = 2048) - Static */}
            <div className="flex flex-col items-center gap-6">
               <div className="text-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2">High-Dim Search Space</span>
                  <div className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[10px] font-black text-amber-400 mb-2 uppercase tracking-widest">
                    d_ff = 2048
                  </div>
               </div>
               
               {/* 4 columns representing the 4x expansion, static state */}
               <div className="flex gap-1.5 p-2 bg-amber-500/[0.03] border border-amber-500/10 rounded-2xl opacity-40">
                {[0, 1, 2, 3].map((colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-0.5">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-4 h-1.5 rounded-full bg-amber-500" />
                    ))}
                  </div>
                ))}
               </div>
            </div>

            {/* MULTIPLICATION SYMBOL */}
            <div className="flex items-center justify-center">
               <div className="text-emerald-500/40 p-4">
                  <X className="w-12 h-12 stroke-[3px]" />
               </div>
            </div>

            {/* 2. REFINEMENT OPERATOR (W2) */}
            <div className="flex flex-col items-center gap-4">
               <div className="relative group">
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-10 bg-emerald-500/10 blur-3xl rounded-full"
                  />
                  <div className="w-36 h-36 rounded-[2.5rem] bg-slate-950 border-2 border-slate-800 flex flex-col items-center justify-center shadow-2xl relative z-10 overflow-hidden group-hover:border-emerald-500/50 transition-colors">
                     <div className="grid grid-cols-4 gap-1 opacity-20 absolute inset-0 p-5">
                       {[...Array(16)].map((_, i) => (
                         <div key={i} className="bg-emerald-500 rounded-sm w-full h-full opacity-30" />
                       ))}
                     </div>
                     <Minimize className="w-12 h-12 text-emerald-500 relative z-20 mb-1" />
                     <span className="text-[10px] font-black text-white relative z-20 uppercase tracking-widest">W₂ Matrix</span>
                  </div>
               </div>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] italic">Projection Down</span>
            </div>

            {/* EQUALS SYMBOL */}
            <div className="flex items-center justify-center text-4xl font-black text-slate-800">
               =
            </div>

            {/* 3. REFINED OUTPUT (d_model = 512) - Static Stable */}
            <div className="flex flex-col items-center gap-6">
               <div className="text-center">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] block mb-2">Distilled Conclusion</span>
                  <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-[10px] font-black text-emerald-400 mb-2 uppercase tracking-widest">
                    d_model = 512
                  </div>
               </div>
               
               <div className="flex flex-col gap-1 px-4 py-6 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="w-12 h-2.5 rounded-full shadow-lg" 
                      style={{ backgroundColor: i % 2 === 0 ? '#10b981' : '#064e3b' }}
                    />
                  ))}
               </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-slate-950 border border-slate-800 rounded-xl">
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Equation:</span>
             <code className="text-[11px] text-white font-mono ml-3 italic">Output = LayerNorm(x + f(x * W₁) * W₂)</code>
          </div>
        </div>

        {/* Right: Technical Context */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                 <Target className="w-5 h-5 text-emerald-400" />
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">Why Contract?</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed italic mb-8">
                If we stayed at 2048 dimensions, the model would become too heavy to run. 
                The <strong>Contraction</strong> phase forces the model to summarize what it learned. 
              </p>
              
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-1">
                       <Zap className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                       <span className="text-xs font-black text-white block uppercase mb-1">Bottleneck Intelligence</span>
                       <span className="text-[10px] text-slate-500 leading-tight block italic">By squeezing the "thought" through a narrower pipe, we filter out noise and retain only the most critical semantic features.</span>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-1">
                       <Cpu className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                       <span className="text-xs font-black text-white block uppercase mb-1">Residual Compatibility</span>
                       <span className="text-[10px] text-slate-500 leading-tight block italic">The output must be 512-dim so it can be added back to the original input vector (Identity Stream).</span>
                    </div>
                 </div>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-4">
                 <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                 <div>
                   <span className="text-xs font-black text-white uppercase block">Block Cycle Complete</span>
                   <span className="text-[10px] text-slate-500 leading-tight block uppercase font-bold tracking-tighter">Ready for Residual Addition</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FFNRefineStage;
