import React from 'react';
import { Token } from '../../types';
import { Activity, ShieldCheck, Zap, Layers, Thermometer } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const LayerNormStage: React.FC<Props> = ({ tokens }) => {
  const demoTokens = tokens.slice(0, 4);

  // High-fidelity mock data for normalization visualization
  const rawValues = [0.2, 8.5, -4.1, 14.8, -1.2, 5.5];
  const normValues = [-0.6, 0.4, -1.1, 1.4, -0.9, 0.8]; // Standardized (-1.5 to 1.5 range)

  return (
    <div className="flex flex-col items-center py-12 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      <div className="text-center max-w-2xl mb-12 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          Stability Control
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          Layer <span className="text-blue-400">Normalization</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Now we standardize the data. Normalization rescales the vectors so they have a <strong>mean of 0</strong> 
          and a <strong>variance of 1</strong>, preventing exploding values.
        </p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 mb-20 items-stretch">
        
        {/* Left: The Visual Comparator */}
        <div className="lg:col-span-8 p-10 bg-slate-900/60 border border-slate-800 rounded-[3rem] backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none" />
          
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/40">
              <Layers className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-xl font-black text-white uppercase tracking-tight">The Signal Leveler</h4>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Adjusting Distribution Magnitude</p>
            </div>
          </div>

          <div className="flex flex-col gap-12 flex-1 justify-center">
            {/* RAW STATE */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Scattered Input (High Variance)</span>
                <span className="text-[9px] font-mono text-slate-600 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">Range: -4.1 to 14.8</span>
              </div>
              <div className="flex items-end gap-3 h-28 px-4 bg-slate-950/30 rounded-2xl border border-slate-900/50 p-6">
                {rawValues.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-rose-500/20 border border-rose-500/40 rounded-t-lg transition-all" 
                      style={{ height: `${Math.abs(v) * 4}px`, opacity: 0.6 }} 
                    />
                    <span className="text-[10px] font-mono text-slate-600">{v.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center relative">
               <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
               </div>
               <div className="relative px-6 py-2 bg-slate-950 border-2 border-blue-500/30 rounded-full flex items-center gap-3 z-10 shadow-lg">
                  <Zap className="w-4 h-4 text-blue-400 fill-current animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">LayerNorm Core</span>
               </div>
            </div>

            {/* NORMALIZED STATE */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Standardized Output (σ² = 1)</span>
                <span className="text-[9px] font-mono text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Range: -1.5 to 1.5</span>
              </div>
              <div className="flex items-end gap-3 h-28 px-4 bg-blue-500/5 rounded-2xl border border-blue-500/20 p-6">
                {normValues.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-blue-500/60 border border-blue-400 rounded-t-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                      style={{ height: `${Math.abs(v) * 35}px` }} 
                    />
                    <span className="text-[10px] font-mono text-blue-400 font-bold">{v.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technical Explanation */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] flex-1">
              <div className="flex items-center gap-3 mb-6">
                 <Thermometer className="w-5 h-5 text-blue-400" />
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">The Thermostat Effect</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed italic mb-8">
                 Imagine data values widely scattered (one is 0.1, another is 50.0). Normalization brings them into a predictable range. This acts like a <strong>thermostat</strong> for the neural network's weights.
              </p>
              
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                       <Zap className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                       <span className="text-xs font-black text-white block uppercase mb-1">Preventing Explosion</span>
                       <span className="text-[10px] text-slate-500 leading-tight block">Keeps numbers from becoming so large that computers can't calculate them anymore.</span>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                       <ShieldCheck className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                       <span className="text-xs font-black text-white block uppercase mb-1">Stable Training</span>
                       <span className="text-[10px] text-slate-500 leading-tight block">When every layer's input has a similar distribution, the model learns significantly faster.</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-blue-500/10 border border-blue-500/20 rounded-[2.5rem] shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Final State Layer 01</span>
              </div>
              <div className="flex gap-2">
                {demoTokens.map((t, i) => (
                  <div key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[10px] font-bold text-white shadow-inner">
                    {t.text}''
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LayerNormStage;