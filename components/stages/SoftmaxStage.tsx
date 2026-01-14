
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Token } from '../../types';
import { Activity, Percent, ArrowRight, Calculator, ListOrdered } from 'lucide-react';

interface Props {
  tokens: Token[];
}

const SoftmaxStage: React.FC<Props> = ({ tokens }) => {
  const [rawScores, setRawScores] = useState<number[]>([14.2, 11.5, 4.1, 8.8]);
  const [step, setStep] = useState<'raw' | 'exp' | 'prob'>('raw');

  // Logic for the demo math
  const max = Math.max(...rawScores);
  const exps = rawScores.map(s => Math.exp((s - max) / 2)); // Subtract max for numerical stability demo
  const sumExp = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map(e => e / sumExp);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => prev === 'raw' ? 'exp' : prev === 'exp' ? 'prob' : 'raw');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar">
      <div className="text-center max-w-2xl mb-12">
        <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-full text-[10px] font-black text-rose-400 uppercase tracking-widest mb-6">
          <Calculator className="w-3.5 h-3.5" />
          The Critical Step
        </motion.div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
          Why <span className="text-rose-500">Softmax</span>?
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Self-Attention produces raw dot-products (scores). Softmax turns these into 
          <strong> proportional weights</strong> so the model can choose exactly how much attention to pay.
        </p>
      </div>

      {/* Math Flow Visualizer */}
      <div className="w-full max-w-5xl bg-slate-900/40 border border-slate-800 rounded-[3rem] p-12 backdrop-blur-md relative overflow-hidden mb-16 shadow-2xl">
         
         <div className="flex items-center justify-between mb-16">
            <div className="flex gap-4">
              <StepIndicator label="1. Raw Dot Product" active={step === 'raw'} color="slate" />
              <StepIndicator label="2. Exponential (e^x)" active={step === 'exp'} color="amber" />
              <StepIndicator label="3. Normalize (Σ=1)" active={step === 'prob'} color="emerald" />
            </div>
            <div className="text-right">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operation:</span>
               <div className="text-white font-mono font-bold text-sm">
                  {step === 'raw' && "z = Q · K / √d"}
                  {step === 'exp' && "y = exp(z)"}
                  {step === 'prob' && "σ = y_i / Σ y_j"}
               </div>
            </div>
         </div>

         {/* Bar Chart Competition */}
         <div className="grid grid-cols-4 gap-12 h-64 items-end mb-12 px-10">
            {rawScores.map((score, i) => {
              const height = step === 'raw' ? (score * 8) : step === 'exp' ? (exps[i] * 120) : (probs[i] * 200);
              const color = step === 'raw' ? 'rgba(148, 163, 184, 0.5)' : step === 'exp' ? 'rgba(245, 158, 11, 0.6)' : 'rgba(16, 185, 129, 0.8)';
              
              return (
                <div key={i} className="flex flex-col items-center gap-4">
                   <div className="relative w-full">
                      <motion.div 
                        animate={{ height, backgroundColor: color }}
                        className="w-full rounded-2xl border border-white/5 shadow-2xl transition-colors duration-500"
                      />
                      <AnimatePresence mode="wait">
                         <motion.div 
                           key={step + i}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono font-black text-white"
                         >
                            {step === 'raw' && score.toFixed(1)}
                            {step === 'exp' && exps[i].toFixed(1)}
                            {step === 'prob' && (probs[i] * 100).toFixed(0) + '%'}
                         </motion.div>
                      </AnimatePresence>
                   </div>
                   <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{tokens[i].text}</div>
                </div>
              );
            })}
         </div>

         <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
            <p className="text-xs text-slate-500 italic max-w-2xl mx-auto">
              Notice how the <strong>Exponential</strong> step makes the winning score ({rawScores[0]}) drastically larger than the others, 
              forcing the model to "focus" on specific connections.
            </p>
         </div>
      </div>

      {/* Deep Explanation Grid */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
         <ExplanationCard 
            icon={<Activity className="text-amber-400" />}
            title="Non-Linear Focus"
            desc="By using e^x, we ensure that the model doesn't just average words together, but instead picks a few clear 'winners' to learn from."
         />
         <ExplanationCard 
            icon={<Percent className="text-emerald-400" />}
            title="Stability"
            desc="Normalization keeps the vector magnitudes consistent. Without it, the values would explode or vanish as they pass through layers."
         />
         <ExplanationCard 
            icon={<ListOrdered className="text-rose-400" />}
            title="Probabilities"
            desc="It turns math into a decision. The 'Queen' token now has a 70% probability of attending to the 'Throne' token."
         />
      </div>
    </div>
  );
};

const StepIndicator = ({ label, active, color }: { label: string, active: boolean, color: string }) => (
  <div className={`flex items-center gap-2 transition-opacity ${active ? 'opacity-100' : 'opacity-20'}`}>
    <div className={`w-2 h-2 rounded-full ${color === 'slate' ? 'bg-slate-400' : color === 'amber' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
    <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
  </div>
);

const ExplanationCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] flex flex-col gap-4 backdrop-blur-sm">
    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">{icon}</div>
    <h4 className="text-xs font-black text-white uppercase tracking-widest">{title}</h4>
    <p className="text-[11px] text-slate-500 leading-relaxed italic">{desc}</p>
  </div>
);

export default SoftmaxStage;
