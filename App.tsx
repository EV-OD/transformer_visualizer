import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Brain,
  Zap,
  Layers,
  Cpu,
  Database,
  Info,
  Sigma,
  Ghost
} from 'lucide-react';
import { 
  INITIAL_TOKENS, 
  INITIAL_HEADS, 
} from './constants';
import { TransformerState, Step } from './types';
import AttentionHead from './components/AttentionHead';
import NavigationMenu from './components/NavigationMenu';

// Specialized Stage Components
import InputStage from './components/stages/InputStage';
import EmbeddingStage from './components/stages/EmbeddingStage';
import HardwareStage from './components/stages/HardwareStage';
import PositionalStage from './components/stages/PositionalStage';
import EncodingStage from './components/stages/EncodingStage';
import SignalStage from './components/stages/SignalStage';
import SoftmaxStage from './components/stages/SoftmaxStage';
import SelfAttentionBlockStage from './components/stages/SelfAttentionBlockStage';
import MultiHeadAttentionStage from './components/stages/MultiHeadAttentionStage';
import ConcatProjectionStage from './components/stages/ConcatProjectionStage';
import ResidualAddStage from './components/stages/ResidualAddStage';
import LayerNormStage from './components/stages/LayerNormStage';
import FFNOverviewStage from './components/stages/FFNOverviewStage';
import FFNExpandStage from './components/stages/FFNExpandStage';
import FFNActivateStage from './components/stages/FFNActivateStage';
import FFNRefineStage from './components/stages/FFNRefineStage';
import AddNormStage from './components/stages/AddNormStage';
import StackStage from './components/stages/StackStage';
import OutputStage from './components/stages/OutputStage';
import BlackBoxStage from './components/stages/BlackBoxStage';
import FormulaStage from './components/stages/FormulaStage';

const App: React.FC = () => {
  const [state, setState] = useState<TransformerState>({
    currentStep: Step.INPUT,
    tokens: INITIAL_TOKENS,
    activeHeadIndex: 0,
    mathMode: false,
    heads: INITIAL_HEADS,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stepsOrder = [
    Step.INPUT, 
    Step.EMBEDDING, 
    Step.HARDWARE,
    Step.POSITIONAL, 
    Step.ENCODING,
    Step.SIGNAL,
    Step.ATTENTION, 
    Step.SOFTMAX,
    Step.SELF_ATTENTION_BLOCK,
    Step.MULTI_HEAD_ATTENTION,
    Step.CONCAT_PROJECTION,
    Step.RESIDUAL_ADD,
    Step.LAYER_NORM,
    Step.FFN_OVERVIEW,
    Step.FFN_EXPAND,
    Step.FFN_ACTIVATE,
    Step.FFN_REFINE,
    Step.ADD_NORM,
    Step.STACK,
    Step.OUTPUT,
    Step.BLACKBOX,
    Step.FORMULA
  ];

  const setStep = (step: Step) => {
    setState(prev => ({ ...prev, currentStep: step }));
    setIsMenuOpen(false);
  };

  const nextStep = () => {
    const currentIndex = stepsOrder.indexOf(state.currentStep);
    if (currentIndex < stepsOrder.length - 1) {
      setStep(stepsOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = stepsOrder.indexOf(state.currentStep);
    if (currentIndex > 0) {
      setStep(stepsOrder[currentIndex - 1]);
    }
  };

  const updateWeight = (headIndex: number, matrixKey: 'Wq' | 'Wk' | 'Wv', row: number, col: number, value: number) => {
    setState(prev => {
      const newHeads = [...prev.heads];
      const newMatrix = [...newHeads[headIndex][matrixKey]];
      const newRow = [...newMatrix[row]];
      newRow[col] = value;
      newMatrix[row] = newRow;
      newHeads[headIndex] = { ...newHeads[headIndex], [matrixKey]: newMatrix };
      return { ...prev, heads: newHeads };
    });
  };

  const renderStage = () => {
    switch (state.currentStep) {
      case Step.INPUT: return <InputStage tokens={state.tokens} />;
      case Step.EMBEDDING: return <EmbeddingStage tokens={state.tokens} />;
      case Step.HARDWARE: return <HardwareStage tokens={state.tokens} />;
      case Step.POSITIONAL: return <PositionalStage tokens={state.tokens} />;
      case Step.ENCODING: return <EncodingStage tokens={state.tokens} />;
      case Step.SIGNAL: return <SignalStage tokens={state.tokens} />;
      case Step.ATTENTION: return <AttentionHead state={state} head={state.heads[state.activeHeadIndex]} onWeightChange={updateWeight} />;
      case Step.SOFTMAX: return <SoftmaxStage tokens={state.tokens} />;
      case Step.SELF_ATTENTION_BLOCK: return <SelfAttentionBlockStage tokens={state.tokens} />;
      case Step.MULTI_HEAD_ATTENTION: return <MultiHeadAttentionStage tokens={state.tokens} />;
      case Step.CONCAT_PROJECTION: return <ConcatProjectionStage tokens={state.tokens} />;
      case Step.RESIDUAL_ADD: return <ResidualAddStage tokens={state.tokens} />;
      case Step.LAYER_NORM: return <LayerNormStage tokens={state.tokens} />;
      case Step.FFN_OVERVIEW: return <FFNOverviewStage tokens={state.tokens} />;
      case Step.FFN_EXPAND: return <FFNExpandStage tokens={state.tokens} />;
      case Step.FFN_ACTIVATE: return <FFNActivateStage />;
      case Step.FFN_REFINE: return <FFNRefineStage tokens={state.tokens} />;
      case Step.ADD_NORM: return <AddNormStage tokens={state.tokens} />;
      case Step.STACK: return <StackStage tokens={state.tokens} />;
      case Step.OUTPUT: return <OutputStage tokens={state.tokens} />;
      case Step.BLACKBOX: return <BlackBoxStage />;
      case Step.FORMULA: return <FormulaStage />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden">
      <header className="flex-shrink-0 h-16 px-8 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/40 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-cyan-500/10 hover:text-cyan-400 border border-slate-700/50 hover:border-cyan-500/30 transition-all group"
          >
            <Menu className="w-5 h-5 transition-transform group-hover:scale-110" />
          </button>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Architecture Visualization</span>
            <span className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">{state.currentStep.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Model Complexity</span>
              <span className="text-xs font-mono font-bold text-cyan-500/80 tracking-tighter">O(N² · D) FLOPs</span>
           </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 to-slate-950">
        <div className="flex-1 relative overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full min-h-full"
            >
              {renderStage()}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="flex-shrink-0 h-20 px-12 flex items-center justify-between bg-slate-900/80 border-t border-slate-800/50 backdrop-blur-md z-50">
          <button 
            onClick={prevStep}
            disabled={state.currentStep === Step.INPUT}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 text-slate-100 font-bold disabled:opacity-20 hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Prev
          </button>

          <div className="flex flex-col items-center">
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Architecture Progress</div>
             <div className="flex gap-1.5">
                {stepsOrder.map((s, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      stepsOrder.indexOf(state.currentStep) >= i ? 'w-6 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'w-2 bg-slate-800'
                    }`} 
                  />
                ))}
             </div>
          </div>

          <button 
            onClick={nextStep}
            disabled={state.currentStep === Step.FORMULA}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-bold disabled:opacity-20 hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/20"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </footer>
      </main>

      {/* SIDEBAR NAVIGATION */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] cursor-pointer"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[350px] bg-slate-900 border-r border-slate-800 shadow-[20px_0_50px_rgba(0,0,0,0.5)] z-[101] flex flex-col"
            >
              <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <Layers className="w-5 h-5 text-white" />
                   </div>
                   <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">Index</h3>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-1">
                <NavigationMenu currentStep={state.currentStep} onNavigate={setStep} />
              </div>

              <div className="p-8 border-t border-slate-800 bg-slate-950/40">
                 <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4">
                    <Info className="w-5 h-5 text-slate-500" />
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                       Navigate through the 22 core phases of the architecture.
                    </p>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;