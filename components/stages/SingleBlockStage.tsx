
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Box, ArrowDown, Zap, RefreshCw, Layers } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const SingleBlockStage: React.FC<Props> = ({ tokens }) => {
  return (
    <div className="flex flex-col items-center py-16 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar">
      <div className="text-center max-w-2xl mb-12">
        <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] font-black text-amber-400 uppercase tracking-widest mb-6">
          <Box className="w-3.5 h-3.5" />
          The Layer Blueprint
        </motion.div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
          One <span className="text-amber-400">Transformer</span> Block
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          The "Context Pump" you saw is only half the story. A full block wraps 
          <strong> Self-Attention</strong> with a <strong>Reasoning Engine</strong> and 
          <strong> Identity Safeguards</strong>.
        </p>
      </div>

      {/* The Block Diagram */}
      <div className="relative w-full max-w-2xl bg-slate-900/40 border border-slate-800 rounded-[3rem] p-12 backdrop-blur-md shadow-2xl overflow-hidden mb-16">
         {/* Input Vector Flow */}
         <div className="flex flex-col items-center gap-4 mb-12">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Input: Contextual Vectors</span>
            <div className="flex gap-2">
               {tokens.slice(0, 4).map((_, i) => (
                 <motion.div key={i} className="w-8 h-2 bg-slate-700 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
               ))}
            </div>
            <ArrowDown className="w-4 h-4 text-slate-800" />
         </div>

         {/* Internal Stack */}
         <div className="space-y-6 relative z-10">
            {/* Attention Layer */}
            <div className="group relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative p-6 bg-slate-950 border border-slate-800 rounded-3xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/30 text-cyan-400">
                        <RefreshCw className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Multi-Head Attention</h4>
                        <p className="text-[10px] text-slate-500">The Context Pump: Sharing information across words.</p>
                     </div>
                  </div>
                  <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-[8px] font-black uppercase rounded-lg border border-cyan-500/30">Module A</div>
               </div>
            </div>

            <div className="flex justify-center h-4">
               <div className="w-0.5 h-full bg-slate-800" />
            </div>

            {/* Feed Forward Layer */}
            <div className="group relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative p-6 bg-slate-950 border border-slate-800 rounded-3xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/30 text-amber-400">
                        <Zap className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Feed-Forward (FFN)</h4>
                        <p className="text-[10px] text-slate-500">The Processor: Refining meaning word-by-word.</p>
                     </div>
                  </div>
                  <div className="px-3 py-1 bg-amber-500/20 text-amber-400 text-[8px] font-black uppercase rounded-lg border border-amber-500/30">Module B</div>
               </div>
            </div>
         </div>

         {/* Residual Bypass ("The Identity Safeguard") */}
         <div className="absolute left-6 top-24 bottom-24 w-12 border-l-2 border-dashed border-slate-700 rounded-l-3xl pointer-events-none">
            <div className="absolute top-0 -left-1 text-[8px] font-black text-slate-600 uppercase -rotate-90 origin-top-left -translate-x-4">Identity Stream</div>
            <motion.div 
               animate={{ y: [0, 200], opacity: [0, 1, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 -left-1 w-2 h-2 bg-slate-500 rounded-full blur-[1px]"
            />
         </div>

         {/* Output Vectors */}
         <div className="flex flex-col items-center gap-4 mt-12">
            <ArrowDown className="w-4 h-4 text-slate-800" />
            <div className="flex gap-2">
               {tokens.slice(0, 4).map((_, i) => (
                 <motion.div key={i} className="w-8 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
               ))}
            </div>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Output: Refined State</span>
         </div>
      </div>

      {/* Narrative Footer */}
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem]">
            <h5 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
               <RefreshCw className="w-4 h-4 text-cyan-400" />
               Part 1: Self-Attention
            </h5>
            <p className="text-sm text-slate-500 leading-relaxed">
               This is where words "talk" to each other. If "King" is near "Queen", this module ensures they exchange royal attributes to build a deeper context.
            </p>
         </div>
         <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem]">
            <h5 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
               <Zap className="w-4 h-4 text-amber-400" />
               Part 2: Feed Forward
            </h5>
            <p className="text-sm text-slate-500 leading-relaxed">
               After talking, each word "thinks" privately. It processes the new context it just received to update its own internal definition.
            </p>
         </div>
      </div>
    </div>
  );
};

export default SingleBlockStage;
