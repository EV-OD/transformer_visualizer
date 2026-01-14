import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Filter, Info, BrainCircuit, AlertCircle, Sparkles, Scale, RefreshCw } from 'lucide-react';

const FFNActivateStage: React.FC = () => {
  const [view, setView] = useState<'relu' | 'gelu' | 'linear'>('relu');

  return (
    <div className="flex flex-col items-center py-12 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      {/* Educational Header */}
      <div className="text-center max-w-3xl mb-12 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-full text-[10px] font-black text-rose-400 uppercase tracking-widest mb-6">
          <Zap className="w-3.5 h-3.5" />
          The Logic Gate
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          FFN <span className="text-rose-500">Activation</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Intelligence is the ability to <strong>distinguish</strong>. Activation functions introduce the "kink" 
          in the math that allows the model to learn logic, rules, and complex hierarchies.
        </p>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 items-stretch mb-12">
        {/* Left: The Interactive decision engine */}
        <div className="lg:col-span-8 p-10 bg-slate-900/60 border border-slate-800 rounded-[3rem] backdrop-blur-md flex flex-col relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/30">
                <BrainCircuit className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight italic">Decision Manifold</h4>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Visualizing the Non-Linear Shift</p>
              </div>
            </div>
            
            {/* Function Switcher */}
            <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
               {(['relu', 'gelu', 'linear'] as const).map((f) => (
                 <button 
                  key={f}
                  onClick={() => setView(f)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                    view === f ? 'bg-rose-500 text-white shadow-lg shadow-rose-900/40' : 'text-slate-500 hover:text-slate-300'
                  }`}
                 >
                   {f}
                 </button>
               ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-full max-w-xl aspect-[4/3] relative p-8 bg-slate-950/50 rounded-[2.5rem] border border-slate-800/50 shadow-inner overflow-hidden">
              <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
                 {/* Grid Lines */}
                 <line x1="0" y1="150" x2="400" y2="150" stroke="#1e293b" strokeWidth="1" />
                 <line x1="200" y1="0" x2="200" y2="300" stroke="#1e293b" strokeWidth="1" />
                 
                 <AnimatePresence mode="wait">
                   {view === 'relu' && (
                     <motion.path 
                       key="relu"
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ pathLength: 1, opacity: 1 }}
                       exit={{ opacity: 0 }}
                       d="M 0 150 H 200 L 400 0" 
                       fill="none" 
                       stroke="#f43f5e" 
                       strokeWidth="6" 
                       strokeLinecap="round" 
                     />
                   )}
                   {view === 'gelu' && (
                     <motion.path 
                       key="gelu"
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ pathLength: 1, opacity: 1 }}
                       exit={{ opacity: 0 }}
                       d="M 0 150 Q 180 155, 200 145 T 400 0" 
                       fill="none" 
                       stroke="#0ea5e9" 
                       strokeWidth="6" 
                       strokeLinecap="round" 
                     />
                   )}
                   {view === 'linear' && (
                     <motion.path 
                       key="linear"
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ pathLength: 1, opacity: 1 }}
                       exit={{ opacity: 0 }}
                       d="M 0 300 L 400 0" 
                       fill="none" 
                       stroke="#64748b" 
                       strokeWidth="4" 
                       strokeDasharray="8 8" 
                     />
                   )}
                 </AnimatePresence>

                 {/* Labels */}
                 <text x="50" y="180" fill="#475569" fontSize="10" fontWeight="900" className="uppercase opacity-50">Negative Input</text>
                 <text x="250" y="180" fill="#475569" fontSize="10" fontWeight="900" className="uppercase opacity-50">Positive Input</text>
              </svg>

              {/* Formula Overlay */}
              <div className="absolute bottom-6 right-6 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
                 <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-widest">Active Formula</span>
                 <code className="text-sm font-mono font-black text-white italic">
                    {view === 'relu' ? 'max(0, x)' : view === 'gelu' ? 'x * Φ(x)' : 'y = x'}
                 </code>
              </div>
            </div>
            
            <div className="mt-12 flex items-center gap-8 bg-slate-950/80 px-8 py-4 rounded-3xl border border-slate-800 backdrop-blur-md">
               <div className="flex flex-col items-center">
                  <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest mb-1">State</span>
                  <div className={`w-3 h-3 rounded-full ${view === 'linear' ? 'bg-slate-700' : 'bg-rose-500 animate-pulse shadow-[0_0_12px_#f43f5e]'}`} />
               </div>
               <p className="text-[11px] text-slate-400 font-medium italic max-w-sm text-center">
                  {view === 'linear' 
                    ? "In linear mode, information flows through without filtering. No 'decisions' are being made." 
                    : "The function creates a 'threshold'. Values below zero are silenced, allowing the model to act as a logic gate."}
               </p>
            </div>
          </div>
        </div>

        {/* Right: The 'Why' Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-[2.5rem] relative overflow-hidden flex flex-col">
              <AlertCircle className="absolute top-4 right-4 w-5 h-5 text-rose-500/50" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                 The Necessity of "The Kink"
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                If we skip activation, the entire model collapses into <strong>one single layer</strong>. 
                <br/><br/>
                Mathematically: <code className="text-rose-400 font-bold">Matrix2 * (Matrix1 * X)</code> is just <code className="text-rose-400 font-bold">NewMatrix * X</code>. 
                Depth only works if we "break" the linearity between layers.
              </p>
              <div className="mt-auto p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                 <span className="text-[10px] font-black text-rose-400 uppercase block mb-1">Can we skip it?</span>
                 <span className="text-[10px] text-slate-500 leading-tight block italic">Yes, but your AI would be as smart as a basic spreadsheet formula. No reasoning possible.</span>
              </div>
           </div>

           <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] flex-1">
              <div className="flex items-center gap-3 mb-6">
                 <Scale className="w-5 h-5 text-slate-400" />
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">Why not pass both?</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed italic mb-4">
                "Why can't we just pass positive and negative values equally?"
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                If the model passed everything, it could never say <strong>"No"</strong>. 
                Activation allows the model to <strong>filter noise</strong>. By silencing neurons that don't reach a threshold, 
                the model focuses its compute on the most relevant features of the token.
              </p>
           </div>
        </div>
      </div>

      {/* Deep Visual Comparison */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
         
         {/* Linear World */}
         <div className="p-10 bg-slate-900/40 border border-slate-800 rounded-[3rem] relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700 font-black text-xs">
                  <RefreshCw className="w-4 h-4" />
               </div>
               <h4 className="text-xs font-black text-white uppercase tracking-widest">Without Activation</h4>
            </div>
            <div className="h-32 w-full bg-slate-950 rounded-2xl border border-slate-800 mb-6 flex items-center justify-center relative overflow-hidden">
               {/* Perfectly flat grid */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
               <motion.div 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-16 h-16 rounded-full border-2 border-slate-700" 
               />
               <div className="absolute bottom-3 right-4 text-[8px] font-black text-slate-600 uppercase tracking-widest">Linear Manifold</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic">
               The model remains "flat". It can only solve problems where answers lie on a straight line. 
               It can never understand concepts like <strong>"If A then B, unless C"</strong>.
            </p>
         </div>

         {/* Non-Linear World */}
         <div className="p-10 bg-rose-500/5 border border-rose-500/20 rounded-[3rem] relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-500 border border-rose-500/30 font-black text-xs">
                  <Sparkles className="w-4 h-4" />
               </div>
               <h4 className="text-xs font-black text-white uppercase tracking-widest">With Activation</h4>
            </div>
            <div className="h-32 w-full bg-slate-950 rounded-2xl border border-slate-800 mb-6 flex items-center justify-center relative overflow-hidden">
               {/* Distorted complex grid */}
               <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-30 stroke-rose-500/40" fill="none">
                  <path d="M 0 50 Q 25 10, 50 50 T 100 50" strokeWidth="0.5" />
                  <path d="M 0 70 Q 25 30, 50 70 T 100 70" strokeWidth="0.5" />
                  <path d="M 0 30 Q 25 -10, 50 30 T 100 30" strokeWidth="0.5" />
               </svg>
               <motion.div 
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }} 
                  transition={{ duration: 5, repeat: Infinity }}
                  className="w-12 h-12 rounded-xl border-2 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]" 
               />
               <div className="absolute bottom-3 right-4 text-[8px] font-black text-rose-500 uppercase tracking-widest">Complex Manifold</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic">
               The math "warps" and bends. This allows the model to wrap around complex data clouds, 
               encoding <strong>Logic</strong> and <strong>Abstract Rules</strong> into the weights.
            </p>
         </div>

      </div>

      {/* Summary Logic Panel */}
      <div className="w-full max-w-4xl p-10 bg-slate-900/20 border border-slate-800 rounded-[3rem] backdrop-blur-md text-center">
         <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
               <Filter className="w-6 h-6 text-rose-500" />
               <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">The Sparsity Filter</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
               In any given forward pass, roughly <strong>50% of the neurons</strong> in the expansion 
               are "turned off" by activation. This is called <strong>Sparsity</strong>. 
               It makes the model more robust and efficient at identifying only the signals that matter.
            </p>
         </div>
      </div>
    </div>
  );
};

export default FFNActivateStage;