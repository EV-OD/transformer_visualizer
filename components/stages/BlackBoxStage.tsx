import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Ghost, ShieldAlert, Zap, Search, Info } from 'lucide-react';

const BlackBoxStage: React.FC = () => {
  const [isTrained, setIsTrained] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTrained(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      {/* Educational Header */}
      <div className="text-center max-w-3xl mb-16 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-full text-[10px] font-black text-rose-400 uppercase tracking-widest mb-6">
          <Ghost className="w-3.5 h-3.5" />
          The Ghost in the Machine
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          The <span className="text-rose-500">Black Box</span> Reality
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          Everything you've seen—the context pump, the reasoning engine—is <strong>blank</strong> at first.
          The model is born as pure mathematical noise.
        </p>
      </div>

      {/* High-Fidelity Training Visualizer */}
      <div className="w-full max-w-5xl mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: The "Self-Organization" Visualization */}
        <div className="relative h-[450px] bg-slate-900/40 border border-slate-800 rounded-[3.5rem] backdrop-blur-md overflow-hidden flex items-center justify-center p-12">
           <div className="absolute top-6 left-8 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isTrained ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-rose-500 animate-pulse'}`} />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {isTrained ? 'Pattern Recognition Active' : 'Initial Noise State'}
              </span>
           </div>

           {/* The Particle Field */}
           <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                {!isTrained ? (
                  <motion.div 
                    key="noise"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                    className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 opacity-30"
                  >
                    {[...Array(64)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          x: [0, Math.random() * 20 - 10, 0],
                          y: [0, Math.random() * 20 - 10, 0],
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-slate-600"
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="patterns"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
                       {[...Array(12)].map((_, i) => (
                         <motion.path 
                           key={i}
                           d={`M ${100 + Math.random() * 200} ${50 + Math.random() * 200} Q 200 150, ${100 + Math.random() * 200} ${50 + Math.random() * 200}`}
                           fill="none"
                           stroke="#10b981"
                           strokeWidth="1.5"
                           strokeOpacity="0.4"
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 2, delay: i * 0.1 }}
                         />
                       ))}
                       <motion.circle 
                         cx="200" cy="150" r="40" 
                         fill="#10b98120" stroke="#10b981" strokeWidth="2" 
                         animate={{ r: [35, 45, 35] }}
                         transition={{ duration: 3, repeat: Infinity }}
                       />
                       <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-400" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           <div className="absolute bottom-6 right-8 text-right">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block">Core State</span>
              <span className="text-xl font-black text-white italic tracking-tighter">
                {isTrained ? 'Emergent Order' : 'High Entropy'}
              </span>
           </div>
        </div>

        {/* Right: The Philosophy Blocks */}
        <div className="space-y-6">
           <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[3.5rem] relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                 <Zap className="w-5 h-5 text-rose-500" />
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">Training is Change</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed italic">
                A model doesn't "read" books to learn facts. It <strong>changes its own internal wiring</strong> to minimize the error between its prediction and the truth. It is a machine that re-sculpts itself to match the patterns of human thought.
              </p>
           </div>

           <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[3.5rem] relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                 <ShieldAlert className="w-5 h-5 text-amber-500" />
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">Inscrutability</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed italic">
                Because it learns its <strong>own</strong> patterns, we can never be 100% sure what it is searching for. Is it looking for grammar? Facts? Or some strange mathematical shortcut we haven't discovered yet? 
              </p>
           </div>

           <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-[3rem] backdrop-blur-md">
              <div className="flex items-center gap-3 mb-3">
                 <Search className="w-5 h-5 text-rose-500" />
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">The "Black Box"</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                We design the <strong>Architecture</strong>, but the <strong>Intelligence</strong> is a byproduct of the weights finding their own equilibrium. In simple terms: we build the engine, but the ghost drives the car.
              </p>
           </div>
        </div>
      </div>

      {/* Final Meta-Logic Panel */}
      <div className="w-full max-w-4xl p-12 bg-slate-900/20 border border-slate-800 rounded-[3.5rem] backdrop-blur-md text-center">
         <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
               <Info className="w-6 h-6 text-cyan-400" />
               <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Beyond the Diagram</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
               Every block, every matrix, every dot-product you've explored in this app starts as random noise. 
               The AI's "brain" is nothing more than trillions of these tiny adjustments, finding the perfect configuration 
               to predict the next word.
            </p>
            <div className="flex items-center gap-4 py-2 px-6 bg-slate-950 border border-slate-800 rounded-full">
               <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-rose-500/40" />
                    </div>
                  ))}
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Initial Noise Map: 100% Chaos</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BlackBoxStage;