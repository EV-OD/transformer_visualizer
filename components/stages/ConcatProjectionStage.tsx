
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Layers, Combine, Cpu, ArrowRight, Zap, Info } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const ConcatProjectionStage: React.FC<Props> = ({ tokens }) => {
  const demoTokens = tokens.slice(0, 4);
  const colors = ['#06b6d4', '#8b5cf6', '#f43f5e', '#334155'];

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      <div className="text-center max-w-2xl mb-16 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full text-[10px] font-black text-violet-400 uppercase tracking-widest mb-6"
        >
          <Combine className="w-3.5 h-3.5" />
          The Unified Merge
        </motion.div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
          Concat <span className="text-violet-400">&</span> Projection
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          The many independent voices of the attention heads are joined together. 
          A final <strong>Linear Projection</strong> transforms this long array back into the model's core space.
        </p>
      </div>

      {/* Main Diagram Stage */}
      <div className="w-full max-w-6xl h-[700px] bg-slate-900/10 border border-slate-800/40 rounded-[4rem] relative overflow-hidden backdrop-blur-md shadow-inner flex flex-col items-center justify-center p-12">
        
        {/* SVG Wiring Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="concatGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.4)" />
            </linearGradient>
          </defs>
          
          {/* Top Connectors from Heads to Concat */}
          {[0, 1, 2, 3].map((i) => (
            <motion.path 
              key={i}
              d={`M ${200 + i * 200} 100 C ${200 + i * 200} 200, 512 200, 512 300`}
              fill="none"
              stroke={colors[i]}
              strokeWidth="2"
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ delay: i * 0.2, duration: 1 }}
            />
          ))}

          {/* Projection Output Path */}
          <motion.path 
            d="M 512 500 V 650"
            fill="none"
            stroke="url(#concatGrad)"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        </svg>

        {/* 1. INPUT: MULTI-HEAD CHUNKS */}
        <div className="absolute top-12 left-0 w-full flex justify-around px-10">
           {['HEAD 1', 'HEAD 2', 'HEAD 3', 'HEAD N'].map((label, i) => (
             <motion.div 
               key={i}
               initial={{ y: -20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: i * 0.1 }}
               className="flex flex-col items-center gap-2"
             >
                <div 
                  className="w-32 h-16 rounded-2xl border-2 flex flex-col items-center justify-center shadow-xl backdrop-blur-md"
                  style={{ borderColor: colors[i], backgroundColor: `${colors[i]}10` }}
                >
                   <span className="text-[10px] font-black text-white">{label}</span>
                   <div className="flex gap-1 mt-1">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="w-4 h-1 rounded-full opacity-40" style={{ backgroundColor: colors[i] }} />
                      ))}
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* 2. CONCATENATION STATION */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 w-[600px] p-8 bg-slate-950 border-2 border-slate-800 rounded-[3rem] shadow-2xl flex flex-col items-center"
        >
           <div className="absolute -top-4 px-6 py-2 bg-violet-600 rounded-full text-[11px] font-black text-white uppercase tracking-widest shadow-lg">
             Concatenation Operator
           </div>
           
           <div className="flex gap-1 p-2 bg-slate-900 border border-slate-800 rounded-2xl mb-4 overflow-hidden">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="flex gap-1 px-4 py-2" style={{ borderRight: i < 3 ? '1px solid #1e293b' : 'none' }}>
                   {[...Array(4)].map((_, j) => (
                     <div key={j} className="w-2 h-6 rounded-sm opacity-60" style={{ backgroundColor: colors[i] }} />
                   ))}
                </div>
              ))}
           </div>
           
           <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              X_Concat = [head_1; head_2; ...; head_h]
           </div>
        </motion.div>

        {/* 3. THE WEIGHTED PROJECTOR (Wo) */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 z-10 relative flex flex-col items-center"
        >
           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 p-1 shadow-[0_0_60px_rgba(139,92,246,0.3)]">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                 <Zap className="w-10 h-10 text-violet-400 animate-pulse" />
              </div>
           </div>
           <div className="mt-4 text-center">
              <h4 className="text-xl font-black text-white tracking-tighter italic">Linear Projection Matrix (Wᴼ)</h4>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Learned Spatial Re-Alignment</p>
           </div>
        </motion.div>

        {/* 4. FINAL OUTPUT VECTORS */}
        <div className="absolute bottom-12 w-full flex justify-center gap-4">
           {demoTokens.map((t, i) => (
             <motion.div 
               key={i}
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 1.8 + i * 0.1 }}
               className="px-6 py-4 bg-violet-500/20 border border-violet-500/40 rounded-3xl shadow-2xl flex flex-col items-center backdrop-blur-sm"
             >
                <span className="text-xs font-black text-white uppercase mb-2 tracking-tight">"{t.text}"</span>
                <div className="flex gap-1">
                   {[...Array(6)].map((_, j) => (
                     <div key={j} className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                   ))}
                </div>
                <div className="mt-2 text-[8px] font-black text-violet-500 uppercase tracking-tighter">d_model Vector</div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Mathematical Details Section */}
      <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 z-10">
         
         {/* Formula Plate */}
         <div className="md:col-span-7 p-10 bg-slate-900/40 border border-slate-800 rounded-[3rem] backdrop-blur-sm relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <Cpu className="w-32 h-32 text-white" />
            </div>
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">The Unification Formula</h4>
            <div className="bg-slate-950/80 p-8 rounded-2xl border border-slate-800 shadow-inner">
               <code className="text-2xl md:text-3xl font-mono font-bold text-white block mb-4">
                  MultiHead(Q, K, V) = Concat(head₁, ..., headₕ)Wᴼ
               </code>
               <div className="space-y-2">
                  <p className="text-[11px] text-slate-500 font-mono">
                    <span className="text-cyan-400">headᵢ</span> = Attention(QWᵢᵠ, KWᵢᴷ, VWᵢⱽ)
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    Where <span className="text-white font-bold italic">Wᴼ</span> is a learned weight matrix of size (h × dₖ, dₘₒₔₑₗ)
                  </p>
               </div>
            </div>
         </div>

         {/* Context Column */}
         <div className="md:col-span-5 flex flex-col gap-6">
            <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] backdrop-blur-sm">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                     <Layers className="w-4 h-4 text-violet-400" />
                  </div>
                  <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Dimension Management</h5>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed italic">
                 Each head is "small" (e.g., 64 dimensions). Concatenating 8 heads gives 512 dimensions—exactly matching the original model width.
               </p>
            </div>
            
            <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] backdrop-blur-sm">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                     <Info className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Why Project?</h5>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed italic">
                 Concatenation is just "stacking." The <strong>Wᴼ</strong> matrix allows the model to learn how to actually <strong>combine</strong> these different features into a single cohesive meaning.
               </p>
            </div>
         </div>

      </div>
    </div>
  );
};

export default ConcatProjectionStage;
