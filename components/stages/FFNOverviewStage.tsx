import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Box, ArrowDown, Zap, Maximize, Minimize, Brain, Layers, Cpu, ArrowRight, ShieldCheck, Database, Terminal } from 'lucide-react';
import FFNNetworkVisual from './FFNNetworkVisual';

interface Props {
  tokens: Token[];
}

const FFNOverviewStage: React.FC<Props> = ({ tokens }) => {
  const demoTokens = tokens.slice(0, 4);

  return (
    <div className="flex flex-col items-center py-12 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mb-12 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] font-black text-amber-400 uppercase tracking-widest mb-6">
          <Cpu className="w-3.5 h-3.5" />
          The Computation Core
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
          Feed-Forward <span className="text-amber-500">Block</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          The <strong>Feed-Forward Network (FFN)</strong> is where the model's actual "knowledge" lives. 
          While Attention moves information <i>between</i> words, this block is where each word 
          is processed <i>individually</i> through a dense neural circuit.
        </p>
      </div>

      <div className="w-full max-w-7xl mb-16 px-4">
        {/* The High-Fidelity Playground Visual */}
        <FFNNetworkVisual />
      </div>

      {/* NEW: Deep Knowledge Storage Section */}
      <div className="w-full max-w-6xl mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Database className="w-3.5 h-3.5" />
            Static Knowledge Storage
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Where the "Facts" are kept</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Many researchers believe that if Attention is the "working memory" (holding current conversation context), then the <strong>FFN weights</strong> are the "long-term memory." 
            <br/><br/>
            When you ask a model "Who is the King of France?", the answer isn't in the input text—it's encoded in the trillions of weight values inside these Feed-Forward layers.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <span className="text-[10px] font-black text-amber-500 uppercase block mb-1">Attention</span>
              <span className="text-xs text-slate-200">Contextual Mixing</span>
            </div>
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <span className="text-[10px] font-black text-rose-500 uppercase block mb-1">FFN</span>
              <span className="text-xs text-slate-200">Internal Reasoning</span>
            </div>
          </div>
        </div>
        <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[3rem] backdrop-blur-md relative overflow-hidden group">
          <Terminal className="absolute top-4 right-4 w-5 h-5 text-slate-700" />
          <div className="space-y-4 font-mono text-[11px] text-slate-500">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Operation:</span>
              <span className="text-amber-400 font-bold">Position-wise MLP</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Complexity:</span>
              <span className="text-white">O(n * d²)</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Weight Params:</span>
              <span className="text-white">2 * (d_model * d_ff)</span>
            </div>
            <p className="pt-4 leading-relaxed">
              In a standard Transformer, the FFN contains <strong>~66% of the total parameters</strong>. 
              This is the heaviest part of the model because it needs to store a compressed version of human knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Layer Descriptions Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10 mb-20">
         <div className="p-10 bg-slate-900/40 border border-slate-800 rounded-[3rem] relative overflow-hidden flex flex-col group hover:bg-slate-900/60 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Maximize className="w-24 h-24 text-amber-400" />
            </div>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30 font-black text-xs">01</div>
               <h4 className="text-xs font-black text-white uppercase tracking-widest">Dimension Expansion</h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
               The input vector is projected into a <strong>4x larger</strong> space. This high-dimensional manifold allows the model to separate complex linguistic concepts that might overlap in smaller spaces.
            </p>
            <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-amber-400 uppercase tracking-widest">
               Next: Expanding to 2048 dims <ArrowRight className="w-3 h-3" />
            </div>
         </div>

         <div className="p-10 bg-slate-900/40 border border-slate-800 rounded-[3rem] relative overflow-hidden flex flex-col group hover:bg-slate-900/60 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Zap className="w-24 h-24 text-rose-500" />
            </div>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/30 font-black text-xs">02</div>
               <h4 className="text-xs font-black text-white uppercase tracking-widest">Activation Gating</h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
               A non-linear function (ReLU or GELU) acts as a mathematical filter. It decides which neurons "fire" and which stay silent, allowing the model to learn complex logic and decision paths.
            </p>
            <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-rose-400 uppercase tracking-widest">
               Next: The Non-linear Shift <ArrowRight className="w-3 h-3" />
            </div>
         </div>

         <div className="p-10 bg-slate-900/40 border border-slate-800 rounded-[3rem] relative overflow-hidden flex flex-col group hover:bg-slate-900/60 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Minimize className="w-24 h-24 text-emerald-400" />
            </div>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 font-black text-xs">03</div>
               <h4 className="text-xs font-black text-white uppercase tracking-widest">Context Refinement</h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
               Finally, the expanded reasoning is compressed back down. This forces the model to distill its individual word thoughts into a compact, refined vector ready for the next block.
            </p>
            <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
               Next: Distilling the Result <ArrowRight className="w-3 h-3" />
            </div>
         </div>
      </div>

      {/* Logic Explained Panel */}
      <div className="w-full max-w-5xl p-12 bg-slate-900/20 border border-slate-800 rounded-[3rem] backdrop-blur-md text-center">
         <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
               <Brain className="w-8 h-8 text-amber-500" />
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Independent Processing</h3>
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
               Notice that in the visual above, there are no lines connecting word A to word B. 
               The <strong>FFN</strong> treats every word as a private island. It processes the context word by word, 
               applying the <strong>exact same weights</strong> to every position in the sentence.
            </p>
            <div className="flex gap-4">
              {demoTokens.map((t, i) => (
                <div key={i} className="px-5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-black text-slate-500">
                  {t.text}
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Same math applied to all 12 tokens in parallel</span>
         </div>
      </div>
    </div>
  );
};

export default FFNOverviewStage;