import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Layers, ChevronUp, Brain, Database, ArrowRight, Repeat } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const StackStage: React.FC<Props> = ({ tokens }) => {
  const demoTokens = tokens.slice(0, 4);

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      {/* Educational Header */}
      <div className="text-center max-w-3xl mb-12 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full text-[10px] font-black text-violet-400 uppercase tracking-widest mb-6">
          <Repeat className="w-3.5 h-3.5" />
          Passing the Torch
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          The Block <span className="text-violet-400">Handover</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          The output of the first block's <strong>Add & Norm</strong> is exactly the same size as the input. 
          This allows us to pipe the data directly into the next block in a massive stack.
        </p>
      </div>

      {/* Visualizing the Loop/Handover */}
      <div className="w-full max-w-5xl flex flex-col items-center gap-12 mb-20 relative">
        
        {/* Block N */}
        <div className="w-full max-w-2xl p-8 bg-slate-900/40 border-2 border-slate-800 rounded-[3rem] relative group opacity-60">
           <div className="absolute -top-3 left-8 px-4 py-1 bg-slate-900 border border-slate-700 rounded-full text-[10px] font-black text-slate-500 uppercase">Current: Block #1</div>
           <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                 <span className="text-[10px] font-black text-slate-600 uppercase">Final State Output</span>
                 <div className="flex gap-2">
                    {demoTokens.map((t, i) => (
                      <div key={i} className="w-6 h-1.5 rounded-full bg-cyan-500/50" />
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* The Connection Pipe */}
        <div className="flex flex-col items-center gap-4 relative">
           <motion.div 
             animate={{ height: [40, 60, 40], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-1 bg-gradient-to-b from-cyan-500 to-violet-500 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)]"
           />
           <div className="px-6 py-2 bg-slate-950 border border-violet-500/40 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-md">
              <ArrowRight className="w-4 h-4 text-violet-400 rotate-90" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Piping to Next Block</span>
           </div>
        </div>

        {/* Block N+1 */}
        <div className="w-full max-w-2xl p-10 bg-violet-500/5 border-2 border-violet-500/40 rounded-[3rem] relative shadow-[0_0_50px_rgba(139,92,246,0.1)]">
           <div className="absolute -top-4 left-8 px-6 py-1.5 bg-violet-600 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-lg">New Input: Block #2</div>
           
           <div className="space-y-6">
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl flex items-center justify-between group-hover:border-violet-500/50 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                       <Layers className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                       <h4 className="text-xs font-black text-white uppercase tracking-widest">Self-Attention Loop</h4>
                       <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">Recalculating context with refined vectors</p>
                    </div>
                 </div>
                 <div className="w-12 h-1.5 bg-violet-500/20 rounded-full" />
              </div>
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                       <Brain className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                       <h4 className="text-xs font-black text-white uppercase tracking-widest">Feed-Forward Loop</h4>
                       <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">Applying deeper semantic reasoning</p>
                    </div>
                 </div>
                 <div className="w-12 h-1.5 bg-violet-500/20 rounded-full" />
              </div>
           </div>
        </div>
      </div>

      {/* Narrative Context Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[3rem] flex flex-col gap-4">
           <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-violet-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Iterative Refinement</h4>
           </div>
           <p className="text-sm text-slate-400 leading-relaxed italic">
            Each block adds a new layer of "thinking." The first block might just figure out grammar, but by the 12th block, the model understands the hidden emotions and complex facts in the sentence.
           </p>
        </div>

        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[3rem] flex flex-col gap-4">
           <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-violet-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Standardized Interface</h4>
           </div>
           <p className="text-sm text-slate-400 leading-relaxed italic">
            This modular design is why Transformers are so powerful. Because the input and output sizes are identical, you can stack 6, 12, or even 100 blocks without changing the code—you just need more GPU memory!
           </p>
        </div>
      </div>

      {/* Final Meta-Logic */}
      <div className="w-full max-w-4xl mt-12 p-10 bg-violet-500/5 border border-violet-500/20 rounded-[3rem] backdrop-blur-md text-center">
         <p className="text-slate-500 text-xs leading-relaxed max-w-2xl mx-auto">
            After the vectors have passed through the <strong>final block</strong> in the stack, they carry the cumulative "wisdom" of the entire architecture. Only then are they ready to be decoded back into human words.
         </p>
      </div>
    </div>
  );
};

export default StackStage;