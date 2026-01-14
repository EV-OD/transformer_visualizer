import React from 'react';
import { Step } from '../types';
import { 
  Database, 
  MapPin, 
  Cpu, 
  Zap, 
  Brain, 
  Layers, 
  ChevronRight, 
  Sparkles, 
  Activity, 
  Target, 
  Ghost, 
  Sigma,
  Box,
  Combine,
  Divide
} from 'lucide-react';

interface Props {
  currentStep: Step;
  onNavigate: (step: Step) => void;
}

const NavigationMenu: React.FC<Props> = ({ currentStep, onNavigate }) => {
  const categories = [
    {
      label: "Input Pipeline",
      steps: [
        { key: Step.INPUT, title: "Raw Input & Parsing", icon: <Database className="w-4 h-4" /> },
        { key: Step.EMBEDDING, title: "Semantic Embedding", icon: <Sparkles className="w-4 h-4" /> },
        { key: Step.HARDWARE, title: "Parallel Hardware", icon: <Cpu className="w-4 h-4" /> },
        { key: Step.POSITIONAL, title: "Positional Address", icon: <MapPin className="w-4 h-4" /> },
        { key: Step.ENCODING, title: "Sine-Wave Encoding", icon: <Activity className="w-4 h-4" /> },
        { key: Step.SIGNAL, title: "Signal Identity", icon: <Zap className="w-4 h-4" /> },
      ]
    },
    {
      label: "Attention Mechanism",
      steps: [
        { key: Step.ATTENTION, title: "The Context Pump", icon: <Layers className="w-4 h-4" /> },
        { key: Step.SOFTMAX, title: "Attention Softmax", icon: <Divide className="w-4 h-4" /> },
        { key: Step.SELF_ATTENTION_BLOCK, title: "Unified Self-Attn", icon: <Box className="w-4 h-4" /> },
        { key: Step.MULTI_HEAD_ATTENTION, title: "Head Expansion", icon: <Layers className="w-4 h-4" /> },
        { key: Step.CONCAT_PROJECTION, title: "Concat & Project", icon: <Combine className="w-4 h-4" /> },
      ]
    },
    {
      label: "Information Flow",
      steps: [
        { key: Step.RESIDUAL_ADD, title: "Residual Bypass", icon: <Combine className="w-4 h-4" /> },
        { key: Step.LAYER_NORM, title: "Layer Normalization", icon: <Activity className="w-4 h-4" /> },
      ]
    },
    {
      label: "Reasoning (FFN)",
      steps: [
        { key: Step.FFN_OVERVIEW, title: "FFN Overview", icon: <Brain className="w-4 h-4" /> },
        { key: Step.FFN_EXPAND, title: "Dimensional Expand", icon: <Layers className="w-4 h-4" /> },
        { key: Step.FFN_ACTIVATE, title: "Non-Linear Gate", icon: <Zap className="w-4 h-4" /> },
        { key: Step.FFN_REFINE, title: "Logic Refinement", icon: <Target className="w-4 h-4" /> },
        { key: Step.ADD_NORM, title: "Block Finalization", icon: <Combine className="w-4 h-4" /> },
      ]
    },
    {
      label: "Final Layers",
      steps: [
        { key: Step.STACK, title: "Recursive Stacking", icon: <Layers className="w-4 h-4" /> },
        { key: Step.OUTPUT, title: "Vocab Projection", icon: <Target className="w-4 h-4" /> },
      ]
    },
    {
      label: "Conclusions",
      steps: [
        { key: Step.BLACKBOX, title: "The Black Box Reality", icon: <Ghost className="w-4 h-4" /> },
        { key: Step.FORMULA, title: "Mathematical Sheet", icon: <Sigma className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {categories.map((cat, catIdx) => (
        <div key={catIdx} className="space-y-3">
          <div className="px-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{cat.label}</span>
          </div>
          <div className="space-y-1">
            {cat.steps.map((s) => (
              <button
                key={s.key}
                onClick={() => onNavigate(s.key)}
                className={`w-full group flex items-center justify-between p-3.5 rounded-2xl transition-all border ${
                  currentStep === s.key 
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' 
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                     currentStep === s.key ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
                   }`}>
                      {s.icon}
                   </div>
                   <span className="text-[11px] font-black uppercase tracking-tight">{s.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${currentStep === s.key ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-40 group-hover:translate-x-0'}`} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavigationMenu;