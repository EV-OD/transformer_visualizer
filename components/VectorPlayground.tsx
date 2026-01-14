
import React from 'react';
import { Token } from '../types';

interface Props {
  token: Token;
  onUpdate: (newVec: number[]) => void;
}

const VectorPlayground: React.FC<Props> = ({ token, onUpdate }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors group">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{token.text}</span>
        <span className="text-[9px] font-mono text-slate-600 bg-slate-950 px-1.5 py-0.5 rounded">d={token.embedding.length}</span>
      </div>
      <div className="space-y-4 px-1">
        {token.embedding.map((val, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span className="opacity-70">Dim {i}</span>
              <span className="text-cyan-500/80 font-bold">{val.toFixed(2)}</span>
            </div>
            <div className="relative h-4 flex items-center">
              <input 
                type="range"
                min="-2"
                max="2"
                step="0.05"
                value={val}
                onChange={(e) => {
                  const newVec = [...token.embedding];
                  newVec[i] = parseFloat(e.target.value);
                  onUpdate(newVec);
                }}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VectorPlayground;
