
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../../types';
import TokenizationVisualizer from './InputStage/TokenizationVisualizer';

interface Props {
  tokens: Token[];
}

const InputStage: React.FC<Props> = ({ tokens }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full min-h-full p-6 md:p-12 overflow-x-hidden">
      <div className="text-center space-y-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-cyan-500 uppercase tracking-[0.3em]"
        >
          Phase 01: Pre-Processing
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
          Tokenization <span className="text-slate-700">&</span> Parsing
        </h2>
      </div>

      <div className="w-full max-w-7xl">
        <TokenizationVisualizer tokens={tokens} />
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="max-w-3xl text-center bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 backdrop-blur-sm shadow-xl"
      >
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          The Transformer doesn't read text directly. First, the raw string is <span className="text-white font-bold italic">tokenized</span>—broken down into discrete identifiers. This numerical representation is the gateway to mapping meanings into a high-dimensional <span className="text-cyan-400">vector space</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default InputStage;
