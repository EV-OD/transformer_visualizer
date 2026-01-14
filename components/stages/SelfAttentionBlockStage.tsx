
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import { Zap, Box, Layers, MousePointer2, Calculator, ArrowRight } from 'lucide-react';

interface Props {
  tokens: Token[];
}

/**
 * FIXED COORDINATES (px)
 * Based on a 1024 x 800 stage
 */
const CENTER_X = 512;
const Q_X = 240;
const K_X = 512;
const V_X = 784;

const INPUT_Y = 80;
const PROJ_Y = 220;
const MATH_Y = 440;
const MIX_Y = 620;
const OUT_Y = 750;

const SelfAttentionBlockStage: React.FC<Props> = ({ tokens }) => {
  const demoTokens = tokens.slice(0, 4);

  return (
    <div className="flex flex-col items-center py-12 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      <div className="text-center max-w-2xl mb-12 relative z-10">
        <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6">
          <Box className="w-3.5 h-3.5" />
          The Unified Block
        </motion.div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
          Self-Attention <span className="text-cyan-400">Circuit</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Behold the "Context Pump" in its geometric reality. A synchronized 
          split-and-merge architecture using <strong>Linear Algebra</strong>.
        </p>
      </div>

      {/* THE CIRCUIT BOARD STAGE */}
      <div className="relative w-[1024px] h-[850px] bg-slate-900/10 border border-slate-800/40 rounded-[4rem] overflow-hidden backdrop-blur-md shadow-inner">
        
        {/* SVG Wiring - Manhattan Routing */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#1e293b" />
            </marker>
          </defs>

          {/* 1. INPUT -> PROJECTIONS */}
          <g stroke="#334155" strokeWidth="2" fill="none">
             {/* Main Downstream */}
             <path d={`M ${CENTER_X} ${INPUT_Y + 40} V ${INPUT_Y + 80}`} />
             {/* Horizontal Split */}
             <path d={`M ${Q_X} ${INPUT_Y + 80} H ${V_X}`} />
             {/* Branches to Chips */}
             <path d={`M ${Q_X} ${INPUT_Y + 80} V ${PROJ_Y}`} />
             <path d={`M ${K_X} ${INPUT_Y + 80} V ${PROJ_Y}`} />
             <path d={`M ${V_X} ${INPUT_Y + 80} V ${PROJ_Y}`} />
          </g>

          {/* 2. Q & K -> MATH CORE */}
          <g stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.6">
             <path d={`M ${Q_X} ${PROJ_Y + 80} V 330 H ${CENTER_X - 40} V ${MATH_Y}`} />
             <path d={`M ${K_X} ${PROJ_Y + 80} V ${MATH_Y}`} />
          </g>

          {/* 3. VALUE (V) -> MIXER BYPASS */}
          <g stroke="#10b981" strokeWidth="2" fill="none" opacity="0.4">
             <path d={`M ${V_X} ${PROJ_Y + 80} V ${MIX_Y} H ${CENTER_X}`} />
          </g>

          {/* 4. MATH CORE -> MIXER */}
          <g stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.8">
             <path d={`M ${CENTER_X} ${MATH_Y + 110} V ${MIX_Y}`} />
          </g>

          {/* 5. MIXER -> OUTPUT */}
          <g stroke="#10b981" strokeWidth="3" fill="none">
             <path d={`M ${CENTER_X} ${MIX_Y + 60} V ${OUT_Y}`} />
          </g>

          {/* ANIMATED DATA PULSES */}
          <Pulse cx={CENTER_X} cy={INPUT_Y + 60} color="#fff" delay={0} />
          <Pulse cx={Q_X} cy={PROJ_Y - 20} color="#06b6d4" delay={0.5} />
          <Pulse cx={K_X} cy={PROJ_Y - 20} color="#06b6d4" delay={0.7} />
          <Pulse cx={V_X} cy={PROJ_Y - 20} color="#10b981" delay={0.9} />
          <Pulse cx={CENTER_X} cy={MATH_Y + 140} color="#8b5cf6" delay={2} />
        </svg>

        {/* COMPONENT LAYER (ABSOLUTELY POSITIONED) */}
        
        {/* 1. INPUT TOKENS */}
        <div 
          className="absolute flex gap-2 h-10" 
          style={{ left: CENTER_X, top: INPUT_Y, transform: 'translateX(-50%)' }}
        >
          {demoTokens.map((t, i) => (
            <TokenTag key={i} text={t.text} />
          ))}
        </div>

        {/* 2. PROJECTION CHIPS (Q, K, V) */}
        <div className="absolute" style={{ left: Q_X, top: PROJ_Y, transform: 'translateX(-50%)' }}>
           <Chip label="Query (Q)" sub="Target Vector" color="cyan" />
        </div>
        <div className="absolute" style={{ left: K_X, top: PROJ_Y, transform: 'translateX(-50%)' }}>
           <Chip label="Key (K)" sub="Memory Address" color="rose" />
        </div>
        <div className="absolute" style={{ left: V_X, top: PROJ_Y, transform: 'translateX(-50%)' }}>
           <Chip label="Value (V)" sub="Memory Content" color="emerald" />
        </div>

        {/* 3. SCALED DOT-PRODUCT ATTENTION CORE */}
        <div 
          className="absolute w-[450px] p-10 bg-slate-950 border-2 border-slate-800 rounded-[3rem] shadow-2xl flex flex-col items-center gap-4 z-10"
          style={{ left: CENTER_X, top: MATH_Y, transform: 'translateX(-50%)' }}
        >
          <div className="absolute -top-4 px-4 py-1.5 bg-violet-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-lg">
            Context Filter: Softmax
          </div>
          <div className="flex items-center gap-6">
             <Calculator className="w-8 h-8 text-violet-400" />
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white italic tracking-widest">softmax(QKᵀ / √d)</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">The Scaled Dot-Product Engine</span>
             </div>
          </div>
          <div className="w-full h-px bg-slate-800" />
          <p className="text-[10px] text-slate-500 italic text-center max-w-xs">
            Calculating how much word A likes word B, squashing the result to a probability between 0 and 1.
          </p>
        </div>

        {/* 4. SIGNAL MIXER (WEIGHTED SUM) */}
        <div 
          className="absolute z-20"
          style={{ left: CENTER_X, top: MIX_Y, transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 p-1 shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center justify-center">
             <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <Zap className="w-10 h-10 text-emerald-400 animate-pulse" />
             </div>
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-500 uppercase tracking-widest whitespace-nowrap">Aggregation Σ(W · V)</span>
        </div>

        {/* 5. OUTPUT TOKENS */}
        <div 
          className="absolute flex gap-2" 
          style={{ left: CENTER_X, top: OUT_Y, transform: 'translateX(-50%)' }}
        >
          {demoTokens.map((t, i) => (
            <div key={i} className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-[10px] font-black text-white shadow-xl flex items-center gap-2">
               {t.text}'
               <ArrowRight className="w-3 h-3 opacity-50" />
            </div>
          ))}
        </div>

      </div>

      {/* Floating Meta-Info */}
      <div className="max-w-4xl grid grid-cols-2 gap-8 mt-12 z-10">
         <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl flex items-start gap-4">
            <MousePointer2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
               Note: The <strong>Value (V)</strong> path is purely informational. It waits at the mixer until <strong>Softmax</strong> tells it how much signal to pass.
            </p>
         </div>
         <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl flex items-start gap-4">
            <Layers className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
               The final vectors at the bottom now contain "Contextual Wisdom," ready for the next layer in the stack.
            </p>
         </div>
      </div>
    </div>
  );
};

// Fixed TypeScript error: Added React.FC type to TokenTag component to correctly handle standard React props like 'key'
const TokenTag: React.FC<{ text: string }> = ({ text }) => (
  <div className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-tight">
    {text}
  </div>
);

const Chip = ({ label, sub, color }: { label: string, sub: string, color: string }) => {
  const styles: Record<string, string> = {
    cyan: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400 shadow-cyan-900/20',
    rose: 'border-rose-500/40 bg-rose-500/5 text-rose-400 shadow-rose-900/20',
    emerald: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-400 shadow-emerald-900/20'
  };
  return (
    <div className={`w-40 p-5 border-2 rounded-2xl flex flex-col items-center gap-1 shadow-2xl transition-transform hover:scale-105 ${styles[color]}`}>
       <span className="text-[11px] font-black uppercase tracking-wider">{label}</span>
       <span className="text-[9px] opacity-60 font-bold uppercase tracking-tighter text-center">{sub}</span>
    </div>
  );
};

const Pulse = ({ cx, cy, color, delay }: { cx: number, cy: number, color: string, delay: number }) => (
  <motion.circle 
    r="4" 
    fill={color} 
    animate={{ 
      cy: [cy, cy + 50], 
      opacity: [0, 1, 0] 
    }} 
    transition={{ 
      duration: 1.5, 
      repeat: Infinity, 
      delay 
    }} 
  />
);

export default SelfAttentionBlockStage;
