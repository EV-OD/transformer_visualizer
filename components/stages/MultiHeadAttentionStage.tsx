
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Cpu, Layers, Box, Info } from 'lucide-react';
import MultiHeadAttentionVisual from './MultiHeadAttentionStage/MultiHeadAttentionVisual';

interface Props {
  tokens: Token[];
}

const MultiHeadAttentionStage: React.FC<Props> = ({ tokens }) => {
  return (
    <div className="flex flex-col items-center py-12 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      <div className="text-center max-w-2xl mb-12 relative z-10">
        <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6">
          <Layers className="w-3.5 h-3.5" />
          Parallel Processing Array
        </motion.div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
          Multi-Head <span className="text-cyan-400">Expansion</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          The Transformer doesn't just run one circuit. It runs <strong>dozens in parallel</strong>. 
          Each "Head" learns to look for a different semantic pattern.
        </p>
      </div>

      {/* THREE.JS 3D STAGE */}
      <div className="relative w-full max-w-6xl h-[700px] bg-slate-900/20 border border-slate-800 rounded-[4rem] overflow-hidden backdrop-blur-md shadow-inner">
        <MultiHeadAttentionVisual />
        
        {/* Floating Narrative Labels - Overlaid on 3D */}
        <div className="absolute top-12 left-12 pointer-events-none space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
              <span className="text-[10px] font-black text-slate-100 uppercase tracking-widest">Independent State: Head 1</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-violet-500 shadow-[0_0_10px_#8b5cf6]" />
              <span className="text-[10px] font-black text-slate-100 uppercase tracking-widest">Independent State: Head 2</span>
           </div>
        </div>

        {/* Meta Info Overlay */}
        <div className="absolute bottom-8 right-8 max-w-xs p-6 bg-slate-950/80 border border-slate-800 rounded-3xl backdrop-blur-xl pointer-events-none">
           <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Info className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Independent Paths</span>
           </div>
           <p className="text-[11px] text-slate-500 italic leading-relaxed">
             Notice how the data remains separate. In this stage, Head 1 doesn't know what Head 2 is doing. 
             They are isolated processing silos. No data is joined yet.
           </p>
        </div>
      </div>

      {/* Logic Explained */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full z-10">
         <ExplanationCard 
            icon={<Cpu className="text-cyan-400" />}
            title="Isolated Weights"
            desc="Each head has its own unique Wq, Wk, and Wv matrices. This is why they can 'attend' to different words simultaneously."
         />
         <ExplanationCard 
            icon={<Box className="text-violet-400" />}
            title="Feature Divergence"
            desc="By initializing weights randomly, we force heads to diverge. One might become a 'Noun-Seer' while another looks for verbs."
         />
         <ExplanationCard 
            icon={<Layers className="text-rose-400" />}
            title="The Parallel Advantage"
            desc="Massive parallelism on the GPU allows all of these heads to compute their results at the exact same time."
         />
      </div>
    </div>
  );
};

const ExplanationCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] flex flex-col gap-4 backdrop-blur-sm hover:bg-slate-800/60 transition-colors">
    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">{icon}</div>
    <h4 className="text-xs font-black text-white uppercase tracking-widest">{title}</h4>
    <p className="text-[11px] text-slate-500 leading-relaxed italic">{desc}</p>
  </div>
);

export default MultiHeadAttentionStage;
