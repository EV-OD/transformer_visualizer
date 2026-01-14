
import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Token, TransformerState, AttentionHeadData } from '../types';
import { dotProduct, softmax, VECTOR_DIM, matrixVectorMul } from '../constants';
import { Brain, ShieldAlert, Database, Cpu, Zap, Play, Pause } from 'lucide-react';

interface Props {
  state: TransformerState;
  head: AttentionHeadData;
  onWeightChange: (headIndex: number, matrixKey: 'Wq' | 'Wk' | 'Wv', row: number, col: number, value: number) => void;
}

/** 
 * PIXEL-PERFECT GRID CONSTANTS
 */
const VIS_WIDTH = 800;
const TOKEN_SIZE = 110; 
const HORIZ_GAP = 50;
const PITCH = TOKEN_SIZE + HORIZ_GAP;
const X_OFFSET = 105;

const PIPE_HEIGHT = 200; 
const TOKEN_TOP_Y = 0;
const SVG_START_Y = TOKEN_SIZE; 
const TOKEN_BOTTOM_Y = SVG_START_Y + PIPE_HEIGHT;

const AttentionHead: React.FC<Props> = ({ state, head }) => {
  const demoTokens = state.tokens.slice(0, 4);
  const [activeIdx, setActiveIdx] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % demoTokens.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [demoTokens.length, isPaused]);

  const projections = useMemo(() => {
    return demoTokens.map(token => ({
      q: matrixVectorMul(head.Wq, token.embedding),
      k: matrixVectorMul(head.Wk, token.embedding),
      v: matrixVectorMul(head.Wv, token.embedding), 
    }));
  }, [demoTokens, head]);

  const activeScores = useMemo(() => {
    const scores: number[] = [];
    for (let j = 0; j < demoTokens.length; j++) {
      if (j > activeIdx) {
        scores.push(-Infinity);
      } else {
        const dot = dotProduct(projections[activeIdx].q, projections[j].k);
        scores.push(dot / Math.sqrt(VECTOR_DIM));
      }
    }
    return softmax(scores);
  }, [activeIdx, projections, demoTokens.length]);

  return (
    <div className="w-full min-h-full flex flex-col items-center py-12 px-6 bg-slate-950 overflow-y-auto custom-scrollbar">
      
      {/* Header Info */}
      <div className="text-center max-w-2xl mb-16">
        <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6">
          <Database className="w-3.5 h-3.5" />
          Linear Algebra Pipeline
        </motion.div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 text-center">
          The <span className="text-cyan-400">Context</span> Pump
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed text-center">
          Watch as <strong>Contextual Signals</strong> flow from memory to the target. 
          The model weights regulate the pipe thickness based on semantic relevance.
        </p>
      </div>

      {/* THE ABSOLUTE WORKSPACE */}
      <div 
        className="relative" 
        style={{ width: VIS_WIDTH, height: TOKEN_BOTTOM_Y + TOKEN_SIZE + 40 }}
      >
        
        {/* TOP ROW: Memory Storage (Keys/Values) */}
        {demoTokens.map((token, i) => (
          <AbsoluteToken 
            key={`src-${token.id}`}
            token={token}
            index={i}
            x={X_OFFSET + i * PITCH}
            y={TOKEN_TOP_Y}
            isActive={i <= activeIdx}
            score={activeScores[i]}
            isSource
            isTarget={false}
            onClick={() => { setActiveIdx(i); setIsPaused(true); }}
          />
        ))}

        {/* MIDDLE: THE PIPELINE SVG */}
        <div 
          className="absolute left-0 pointer-events-none" 
          style={{ top: SVG_START_Y, width: VIS_WIDTH, height: PIPE_HEIGHT }}
        >
          <svg 
            width={VIS_WIDTH} 
            height={PIPE_HEIGHT} 
            viewBox={`0 0 ${VIS_WIDTH} ${PIPE_HEIGHT}`}
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="tubeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.8)" />
              </linearGradient>
              <filter id="neon">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {demoTokens.map((_, i) => (
              <AbsolutePipe 
                key={`pipe-${i}`}
                fromIdx={i}
                toIdx={activeIdx}
                isActive={i <= activeIdx}
                score={activeScores[i]}
              />
            ))}
          </svg>

          {/* Mixing Hub Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
             <div className="bg-slate-900 border border-slate-700 px-4 py-1.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2">
                <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span className="text-[9px] font-black text-slate-200 uppercase tracking-widest">Weighted Sum</span>
             </div>
          </div>
        </div>

        {/* BOTTOM ROW: The Active Word (Query) */}
        {demoTokens.map((token, i) => (
          <AbsoluteToken 
            key={`dst-${token.id}`}
            token={token}
            index={i}
            x={X_OFFSET + i * PITCH}
            y={TOKEN_BOTTOM_Y}
            isActive={i === activeIdx}
            score={activeScores[i]}
            isSource={false}
            isTarget
          />
        ))}
      </div>

      {/* Narrative Legend */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 mb-20">
        <div className="md:col-span-4 p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] flex flex-col justify-between">
           <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Pipeline Control</h4>
              <div className="flex gap-2 mb-6">
                {demoTokens.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => { setActiveIdx(i); setIsPaused(true); }}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      i === activeIdx ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : (i < activeIdx ? 'bg-cyan-900' : 'bg-slate-800')
                    }`} 
                  />
                ))}
              </div>
           </div>
           <button 
             onClick={() => setIsPaused(!isPaused)}
             className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${
               isPaused ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
             }`}
           >
             {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
             {isPaused ? 'Play Sequence' : 'Pause Sequence'}
           </button>
        </div>

        <div className="md:col-span-8 p-10 bg-slate-900/40 border border-slate-800 rounded-[3rem] backdrop-blur-sm relative overflow-hidden">
           <div className="flex items-start gap-6 relative z-10">
              <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Brain className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="flex-1">
                 <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2 italic">Signal Extraction</h4>
                 <p className="text-sm text-slate-500 leading-relaxed mb-4">
                   These glowing pipes represent the flow of <strong>information</strong>. 
                   The more relevance a context word has, the more "fluid" (data) passes through its conduit.
                 </p>
                 <div className="flex items-center gap-3 p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                   <ShieldAlert className="w-4 h-4 text-rose-500" />
                   <span className="text-[10px] font-bold text-rose-400 uppercase tracking-tight italic">Masking active: Future words are physically disconnected from the pump.</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

/** 
 * PIXEL-PERFECT TOKEN 
 */
interface TokenProps {
  token: Token;
  index: number;
  x: number;
  y: number;
  isActive: boolean;
  score: number;
  isSource: boolean;
  isTarget: boolean;
  onClick?: () => void;
}

const AbsoluteToken: React.FC<TokenProps> = ({ token, x, y, isActive, score, isSource, isTarget, onClick }) => {
  const isFuture = isSource && !isActive;

  return (
    <motion.div 
      onClick={onClick}
      className="absolute border-2 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all shadow-xl"
      style={{ 
        width: TOKEN_SIZE, 
        height: TOKEN_SIZE,
        left: x, 
        top: y 
      }}
      animate={{ 
        opacity: isFuture ? 0.15 : 1,
        borderColor: isActive ? '#06b6d4' : 'rgba(30, 41, 59, 1)',
        backgroundColor: isActive ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.4)',
        scale: (isTarget && isActive) ? 1.1 : 1,
      }}
    >
      <span className={`text-[7px] font-black uppercase mb-1 tracking-[0.2em] ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
        {isTarget ? 'QUERY' : 'CONTEXT'}
      </span>
      <span className={`text-base font-black tracking-tight ${isActive ? 'text-white' : 'text-slate-500'}`}>
        {token.text}
      </span>
      
      {isSource && isActive && score > 0.01 && (
        <div className="absolute bottom-1 bg-cyan-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-full z-10">
          {Math.round(score * 100)}%
        </div>
      )}

      {isTarget && isActive && (
        <motion.div 
          className="absolute inset-0 border-2 border-cyan-500/30 rounded-[1.8rem]"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

/** 
 * PIXEL-PERFECT PIPE & DASH ANIMATION
 */
interface PipeProps {
  fromIdx: number;
  toIdx: number;
  isActive: boolean;
  score: number;
}

const AbsolutePipe: React.FC<PipeProps> = ({ fromIdx, toIdx, isActive, score }) => {
  if (!isActive) return null;

  const startX = X_OFFSET + (fromIdx * PITCH) + (TOKEN_SIZE / 2);
  const endX = X_OFFSET + (toIdx * PITCH) + (TOKEN_SIZE / 2);

  const pathData = `M ${startX} 0 C ${startX} ${PIPE_HEIGHT / 2}, ${endX} ${PIPE_HEIGHT / 2}, ${endX} ${PIPE_HEIGHT}`;

  return (
    <g>
      {/* 1. Background Vacuum Tube */}
      <motion.path 
        d={pathData} 
        fill="none" 
        stroke="rgba(30, 41, 59, 0.3)" 
        strokeWidth="18" 
        strokeLinecap="round" 
      />
      
      {/* 2. Base Liquid Stream (Width based on Score) */}
      <motion.path 
        d={pathData} 
        fill="none" 
        stroke="url(#tubeGrad)" 
        strokeWidth={2 + score * 16} 
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: score > 0.05 ? 1 : 0.2 }}
        transition={{ duration: 0.8 }}
      />

      {/* 3. Animated Flow (Dashed Offset) */}
      <motion.path 
        d={pathData} 
        fill="none" 
        stroke="rgba(255, 255, 255, 0.6)" 
        strokeWidth={Math.max(1, score * 4)} 
        strokeLinecap="round"
        strokeDasharray="10 20"
        initial={{ strokeDashoffset: 0 }}
        animate={{ 
          strokeDashoffset: -60,
          opacity: score > 0.1 ? 1 : 0
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        filter="url(#neon)"
      />

      {/* 4. Extra Glowing Core for high attention scores */}
      {score > 0.3 && (
        <motion.path 
          d={pathData} 
          fill="none" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          strokeDasharray="4 40"
          animate={{ strokeDashoffset: -100 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </g>
  );
};

export default AttentionHead;
