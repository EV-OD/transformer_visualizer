import React from 'react';
import { motion } from 'framer-motion';
import { Sigma, Brain, Activity, Zap, Layers, Cpu, Database } from 'lucide-react';

const FormulaStage: React.FC = () => {
  const formulas = [
    {
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      title: "Positional Encoding",
      latex: "PE(pos, 2i) = sin(pos / 10000^{2i/d_{model}}) \nPE(pos, 2i+1) = cos(pos / 10000^{2i/d_{model}})",
      desc: "Injects relative and absolute position information into token vectors using sinusoidal waves of varying frequencies."
    },
    {
      icon: <Brain className="w-5 h-5 text-violet-400" />,
      title: "Scaled Dot-Product Attention",
      latex: "Attention(Q, K, V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V",
      desc: "Calculates relevance between a Query and all Keys, scaled by dimensionality to prevent gradient vanishing, then weighs the Values."
    },
    {
      icon: <Layers className="w-5 h-5 text-rose-400" />,
      title: "Multi-Head Attention",
      latex: "MultiHead(Q, K, V) = Concat(head_1, ..., head_h)W^O \nwhere head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)",
      desc: "Allows the model to jointly attend to information from different representation subspaces at different positions."
    },
    {
      icon: <Activity className="w-5 h-5 text-blue-400" />,
      title: "Layer Normalization",
      latex: "LayerNorm(x) = \\frac{x - E[x]}{\\sqrt{Var[x] + \\epsilon}} \\cdot \\gamma + \\beta",
      desc: "Stabilizes training by re-centering and re-scaling inputs within each layer to have zero mean and unit variance."
    },
    {
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      title: "Feed-Forward Network (FFN)",
      latex: "FFN(x) = max(0, xW_1 + b_1)W_2 + b_2",
      desc: "Applies two linear transformations and a non-linear activation (ReLU/GELU) to each position independently."
    },
    {
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      title: "Residual Connection",
      latex: "Output = LayerNorm(x + Sublayer(x))",
      desc: "Adds the sublayer input to its output to preserve gradients and facilitate identity mapping in deep networks."
    }
  ];

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-slate-950 min-h-full overflow-y-auto custom-scrollbar relative">
      <div className="text-center max-w-3xl mb-16 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6">
          <Sigma className="w-3.5 h-3.5" />
          Mathematical Reference
        </div>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          The <span className="text-cyan-400">Formal</span> Logic
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Below is the complete mathematical blueprint of the Transformer architecture. 
          Every visual you've seen is powered by these six fundamental equations.
        </p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {formulas.map((f, i) => (
          <motion.div 
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 bg-slate-900/40 border border-slate-800 rounded-[3rem] backdrop-blur-md flex flex-col group hover:border-cyan-500/30 transition-all"
          >
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
                   {f.icon}
                </div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight italic">{f.title}</h4>
             </div>

             <div className="bg-slate-950/80 p-8 rounded-2xl border border-slate-800 mb-6 font-mono text-sm shadow-inner relative overflow-hidden group-hover:bg-slate-950 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Sigma className="w-12 h-12 text-slate-500" />
                </div>
                <pre className="text-cyan-400 font-bold whitespace-pre-wrap leading-relaxed">
                  {f.latex}
                </pre>
             </div>

             <p className="text-sm text-slate-500 leading-relaxed italic">
               {f.desc}
             </p>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-4xl p-12 bg-slate-900/20 border border-slate-800 rounded-[3.5rem] backdrop-blur-md text-center">
         <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
           "The Transformer is essentially a massively parallel attention mechanism that alternates between 
           contextual communication and independent computation." — <em>Vaswani et al. (2017)</em>
         </p>
      </div>
    </div>
  );
};

export default FormulaStage;