
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Token } from '../../types';
import { RANDOM_EMBEDDING_TABLE, TRAINED_EMBEDDING_TABLE } from '../../constants';
import VectorSpace3D from './EmbeddingStage/VectorSpace3D';
import { Brain, Zap, MousePointer2, Sparkles, ArrowRightLeft } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const EmbeddingStage: React.FC<Props> = ({ tokens }) => {
  const [isTrained, setIsTrained] = useState(false);
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const currentEmbeddings = useMemo(() => {
    const table = isTrained ? TRAINED_EMBEDDING_TABLE : RANDOM_EMBEDDING_TABLE;
    return tokens.map((t, i) => ({
      ...t,
      embedding: table[i]
    }));
  }, [isTrained, tokens]);

  return (
    <div className="flex flex-col w-full h-full pt-20 overflow-hidden relative bg-slate-950">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center space-y-2 z-20 pointer-events-none w-full max-w-2xl px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mx-auto w-fit px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl border ${
            isTrained 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
              : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
          }`}
        >
          {isIntro ? 'Initialization Phase' : (isTrained ? 'Semantic Clustering Active' : 'Random Initial State')}
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,1)]"
        >
          {isIntro ? 'Encoding' : 'Latent'} <span className="text-cyan-500">Manifold</span>
        </motion.h2>
      </div>

      <div className="flex-1 w-full flex relative">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-80 flex flex-col gap-4 z-30">
           <motion.div 
             initial={{ x: -100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="p-8 bg-slate-900/90 border border-slate-800 rounded-[2.5rem] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
           >
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                Weight Control
              </h4>
              <p className="text-[12px] text-slate-400 mb-8 leading-relaxed">
                Initially, words are noise. Through training, the model pulls related words into geometric clusters. Notice how <span className="text-white font-bold">Gender</span> emerges as a consistent vector direction.
              </p>
              
              <button
                disabled={isIntro}
                onClick={() => setIsTrained(!isTrained)}
                className={`w-full py-5 rounded-[1.5rem] flex flex-col items-center justify-center gap-1 font-bold transition-all transform active:scale-95 group shadow-2xl disabled:opacity-50 ${
                  isTrained 
                    ? 'bg-emerald-600 text-white shadow-emerald-900/40' 
                    : 'bg-cyan-600 text-white shadow-cyan-900/40 hover:bg-cyan-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap className={`w-5 h-5 ${isTrained ? 'fill-current' : 'group-hover:animate-pulse'}`} />
                  {isTrained ? 'Reset State' : 'Learn Semantics'}
                </div>
                <span className="text-[9px] opacity-70 font-normal uppercase tracking-[0.1em]">Trigger Backpropagation</span>
              </button>
           </motion.div>

           {isTrained && (
             <motion.div
               initial={{ x: -100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-[2rem] backdrop-blur-md"
             >
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <ArrowRightLeft className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Semantic Analogy</span>
                </div>
                <p className="text-[11px] text-yellow-200/70 leading-tight italic">
                  "King - Queen ≈ Uncle - Aunt"<br/>
                  The yellow arrows represent the shared 'Gender Vector' found by the model.
                </p>
             </motion.div>
           )}

           <motion.div 
             initial={{ x: -100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.7 }}
             className="p-5 bg-slate-900/60 border border-slate-800/50 rounded-[2rem] backdrop-blur-md"
           >
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <MousePointer2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">3D Engine</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Orbit around the cluster to see the 4D-to-3D projection of semantics.
              </p>
           </motion.div>
        </div>

        <div className="flex-1 w-full h-full relative">
           <VectorSpace3D tokens={currentEmbeddings} isTrained={isTrained} isIntro={isIntro} />
           
           <AnimatePresence>
            {isIntro && (
              <motion.div 
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
              >
                <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20">
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
                  <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">Mapping High-D space...</span>
                </div>
              </motion.div>
            )}
           </AnimatePresence>
        </div>

        <div className="absolute bottom-10 right-10 flex flex-col gap-4 p-6 bg-slate-900/80 rounded-[2rem] border border-slate-800 backdrop-blur-xl z-30 pointer-events-none shadow-2xl">
           <div className="flex items-center gap-3">
             <div className="w-5 h-5 rounded-xl bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,1)]" />
             <span className="text-[11px] font-black uppercase tracking-widest text-slate-100">Word Embedding</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-10 h-1 bg-cyan-500 opacity-40 rounded-full" />
             <span className="text-[11px] font-black uppercase tracking-widest text-slate-100">Magnitude (L2)</span>
           </div>
           {isTrained && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-1 bg-yellow-400 rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-widest text-yellow-400">Gender Vector</span>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default EmbeddingStage;
