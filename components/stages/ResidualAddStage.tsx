import React from 'react';
import { Token } from '../../types';
import { Plus, ShieldCheck, Activity, Info, Combine, ArrowRight } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const STAGE_W = 1000;
const STAGE_H = 720;
const CENTER_X = 500;
const Y_INPUT = 60;
const Y_SPLIT = 160;
const Y_BLOCK_TOP = 260;
const Y_BLOCK_BOTTOM = 460;
const Y_SUM = 580;
const Y_OUTPUT = 680;
const BYPASS_X = 200;

const ResidualAddStage: React.FC<Props> = ({ tokens }) => {
  const demoTokens = tokens.slice(0, 4);

  return (
    <div className="flex flex-col items-center py-10 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      <div className="text-center max-w-2xl mb-10 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          The Identity Pathway
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          Residual <span className="text-emerald-400">Addition</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          The original signal is preserved by "skipping" the layer and being added back at the end. 
          This is a pure <strong>element-wise sum</strong>.
        </p>
      </div>

      <div className="relative select-none transform scale-90 xl:scale-100 origin-top" style={{ width: STAGE_W, height: STAGE_H }}>
        <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <line x1={CENTER_X} y1={Y_INPUT + 40} x2={CENTER_X} y2={Y_SPLIT} stroke="#334155" strokeWidth="3" />
          <circle cx={CENTER_X} cy={Y_SPLIT} r="6" fill="#10b981" />
          <path d={`M ${CENTER_X} ${Y_SPLIT} H ${BYPASS_X} V ${Y_SUM} H ${CENTER_X - 45}`} fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="8 8" />
          <line x1={CENTER_X} y1={Y_SPLIT} x2={CENTER_X} y2={Y_BLOCK_TOP} stroke="#0ea5e9" strokeWidth="3" />
          <line x1={CENTER_X} y1={Y_BLOCK_BOTTOM} x2={CENTER_X} y2={Y_SUM - 45} stroke="#0ea5e9" strokeWidth="3" />
          <line x1={CENTER_X} y1={Y_SUM + 45} x2={CENTER_X} y2={Y_OUTPUT} stroke="#10b981" strokeWidth="5" />
        </svg>

        <div className="absolute flex flex-col items-center gap-2" style={{ left: CENTER_X, top: Y_INPUT, transform: 'translateX(-50%)' }}>
          <div className="flex gap-2">
            {demoTokens.map((t, i) => (
              <div key={i} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-400">{t.text}</div>
            ))}
          </div>
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Input Embeddings (x)</span>
        </div>

        <div className="absolute z-10 w-[500px] bg-slate-950 border-2 border-slate-800 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-8" style={{ left: CENTER_X, top: Y_BLOCK_TOP, height: Y_BLOCK_BOTTOM - Y_BLOCK_TOP, transform: 'translateX(-50%)' }}>
          <div className="absolute inset-0 bg-sky-500/[0.03] pointer-events-none rounded-[2.5rem]" />
          <div className="flex flex-col items-center text-center">
            <Combine className="w-8 h-8 text-sky-400 mb-3" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Attention Sublayer</h4>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Produces context delta (Δx)</p>
          </div>
        </div>

        <div className="absolute z-20" style={{ left: CENTER_X, top: Y_SUM, transform: 'translate(-50%, -50%)' }}>
          <div className="w-24 h-24 rounded-full bg-slate-950 border-4 border-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <Plus className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="absolute left-[120%] top-1/2 -translate-y-1/2 w-56 p-4 bg-slate-900 border border-slate-800 rounded-xl shadow-xl">
            <span className="text-[10px] font-black text-white uppercase tracking-widest block mb-1">Element-wise Addition</span>
            <code className="text-[12px] font-mono text-emerald-400">output = x + Δx</code>
          </div>
        </div>

        <div className="absolute flex flex-col items-center gap-3" style={{ left: CENTER_X, top: Y_OUTPUT, transform: 'translateX(-50%)' }}>
          <div className="flex gap-2">
            {demoTokens.map((t, i) => (
              <div key={i} className="px-4 py-2 bg-emerald-500/5 border border-emerald-500/30 rounded-xl text-xs font-black text-white">{t.text}'</div>
            ))}
          </div>
          <span className="text-[10px] font-mono font-black text-emerald-500 uppercase tracking-widest">Preserved Meaning + Context</span>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Gradient Preservation</h4>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed italic">
            Residual connections create a direct path for the training signal. 
            Without them, deep models (like GPT-4 with 100+ layers) would simply "forget" their initial training input.
          </p>
        </div>
        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-5 h-5 text-emerald-400" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Additive Refining</h4>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed italic">
            The sublayer doesn't have to redefine the word. It only has to calculate the <strong>refinement</strong> needed based on the current context, which is then added to the original vector.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResidualAddStage;