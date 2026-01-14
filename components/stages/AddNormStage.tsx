import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Plus, ShieldCheck, Combine, ArrowDown, Layers, Zap, Info } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const AddNormStage: React.FC<Props> = ({ tokens }) => {
  const demoTokens = tokens.slice(0, 4);

  return (
    <div className="flex flex-col items-center py-12 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar">
      {/* Educational Header */}
      <div className="text-center max-w-3xl mb-12 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6">
          <Combine className="w-3.5 h-3.5" />
          The Final Wrap-Up
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          Add <span className="text-cyan-400">&</span> Norm
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          Finally, the output of the Feed-Forward Network goes through one more <strong>Residual Connection</strong> 
          and another <strong>Layer Normalization</strong>.
        </p>
      </div>

      {/* Simplified Flow Diagram */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-8 mb-16 relative">
        
        {/* Step 1: Input & FFN Output */}
        <div className="grid grid-cols-2 gap-20 w-full relative">
          {/* Identity Path (Bypass) */}
          <div className="flex flex-col items-center gap-4 p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[8px] font-black text-slate-500 uppercase">Input Identity</div>
            <div className="flex gap-2">
              {demoTokens.map((t, i) => (
                <div key={i} className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-700">
                  {t.text[0]}
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Original Data (x)</span>
          </div>

          {/* FFN Result Path */}
          <div className="flex flex-col items-center gap-4 p-8 bg-amber-500/5 border border-amber-500/20 rounded-[2.5rem] relative">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-950 border border-amber-500/30 rounded-full text-[8px] font-black text-amber-500 uppercase">FFN Processed</div>
             <div className="flex gap-2">
              {demoTokens.map((t, i) => (
                <div key={i} className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-400 border border-amber-500/40">
                  {t.text[0]}*
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">New Context (f(x))</span>
          </div>

          {/* Connector Line to Sum */}
          <div className="absolute bottom-[-40px] left-1/4 w-px h-10 bg-slate-800" />
          <div className="absolute bottom-[-40px] right-1/4 w-px h-10 bg-slate-800" />
        </div>

        {/* Step 2: The Summation */}
        <div className="flex items-center justify-center relative py-4">
           <div className="w-20 h-20 rounded-full bg-slate-950 border-4 border-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] z-10">
              <Plus className="w-8 h-8 text-emerald-400" />
           </div>
           {/* Horizontal bars connecting to the sum */}
           <div className="absolute top-1/2 left-[-150px] right-[-150px] h-1 bg-slate-800 -z-0 rounded-full" />
        </div>

        <ArrowDown className="w-6 h-6 text-slate-800" />

        {/* Step 3: Layer Normalization */}
        <div className="w-full max-w-lg p-10 bg-slate-900/60 border border-slate-800 rounded-[3rem] backdrop-blur-md flex items-center justify-center gap-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/[0.03] pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">Layer Normalization</h4>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Statistical Signal Balancing</p>
          </div>
        </div>

        <ArrowDown className="w-6 h-6 text-slate-800" />

        {/* Final Block Result */}
        <div className="flex flex-col items-center gap-4">
           <div className="flex gap-3">
              {demoTokens.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="px-6 py-3 bg-cyan-600 border border-cyan-400 rounded-2xl text-sm font-black text-white shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                >
                  {t.text} (Final)
                </motion.div>
              ))}
           </div>
           <div className="text-[10px] font-mono font-black text-cyan-500 uppercase tracking-[0.3em] bg-slate-900 px-4 py-1.5 rounded-lg border border-slate-800">
             End of Block #1
           </div>
        </div>
      </div>

      {/* Detailed Textual Context Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[3.5rem] flex flex-col gap-4">
           <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Final Block Output</h4>
           </div>
           <p className="text-sm text-slate-400 leading-relaxed italic">
            The result of this is the final output of the entire <strong>"Transformer Block."</strong> This output is then passed as the input to the next block in the stack. By adding the original input back to the processed output, the model ensures that information isn't lost during the complex Feed-Forward transformation.
           </p>
        </div>

        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[3.5rem] flex flex-col gap-4">
           <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Stability Through Norm</h4>
           </div>
           <p className="text-sm text-slate-400 leading-relaxed italic">
            Layer Normalization acts as a <strong>safety valve</strong>. It ensures that the numerical values of the tokens don't grow too large as they pass through dozens of stacked layers, which would otherwise make the AI unstable or impossible to train.
           </p>
        </div>
      </div>

      {/* Summary Logic Panel */}
      <div className="w-full max-w-4xl mt-12 p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[3.5rem] backdrop-blur-md text-center">
         <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
               <Info className="w-5 h-5 text-emerald-500" />
               <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">Ready for the Next Block</h3>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-2xl">
               This finalized vector now carries both the <strong>Relational Context</strong> (from Attention) and the <strong>Refined Reasoning</strong> (from FFN). It is geometrically identical in size to the input, allowing the model to cycle this data through the next block in the stack.
            </p>
         </div>
      </div>
    </div>
  );
};

export default AddNormStage;