import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Props {
  active?: boolean;
}

const FFNNetworkVisual: React.FC<Props> = ({ active = true }) => {
  const layers = [
    { id: 'input', count: 4, label: 'Input (d_model)', color: '#94a3b8' },
    { id: 'hidden1', count: 8, label: 'Hidden (d_ff)', color: '#f59e0b' },
    { id: 'hidden2', count: 8, label: 'Hidden (d_ff)', color: '#f59e0b' },
    { id: 'output', count: 4, label: 'Output (d_model)', color: '#10b981' }
  ];

  const width = 800;
  const height = 500;
  const layerSpacing = 200;
  const neuronSpacing = 50;

  const totalNetworkWidth = (layers.length - 1) * layerSpacing;
  const startX = (width - totalNetworkWidth) / 2;

  const neuronPositions = useMemo(() => {
    return layers.map((layer, lIdx) => {
      const startY = (height - (layer.count - 1) * neuronSpacing) / 2;
      return Array.from({ length: layer.count }).map((_, nIdx) => ({
        x: startX + lIdx * layerSpacing,
        y: startY + nIdx * neuronSpacing,
        color: layer.color
      }));
    });
  }, [startX]);

  // Performance optimization: Memoize the edges to prevent unnecessary re-renders
  // Fix: Explicitly use React.ReactElement instead of JSX.Element to resolve "Cannot find namespace 'JSX'" error
  const edges = useMemo(() => {
    const result: React.ReactElement[] = [];
    neuronPositions.forEach((layer, lIdx) => {
      if (lIdx === neuronPositions.length - 1) return;
      const nextLayer = neuronPositions[lIdx + 1];
      
      layer.forEach((from, fIdx) => {
        nextLayer.forEach((to, tIdx) => {
          const weightVal = (Math.sin(lIdx + fIdx * tIdx + 1) + 1) / 2;
          const isStrong = weightVal > 0.8; // Reduced threshold for less visual clutter/lag
          const isPositive = weightVal > 0.45;
          const color = isPositive ? '#0ea5e9' : '#f43f5e';
          
          result.push(
            <g key={`edge-${lIdx}-${fIdx}-${tIdx}`}>
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={color}
                strokeWidth={isStrong ? 2 : 1}
                strokeOpacity={isStrong ? 0.6 : 0.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: active ? 1 : 0 }}
                transition={{ duration: 1, delay: lIdx * 0.1 }}
              />
              {isStrong && active && (
                <motion.circle
                  r="2"
                  fill="#fff"
                  animate={{ 
                    cx: [from.x, to.x],
                    cy: [from.y, to.y],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 2 
                  }}
                />
              )}
            </g>
          );
        });
      });
    });
    return result;
  }, [neuronPositions, active]);

  return (
    <div className="relative w-full max-w-4xl h-[550px] bg-slate-900/30 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-md shadow-2xl overflow-hidden group mx-auto">
      <div className="absolute top-6 left-10 flex items-center gap-6 z-20">
        <div>
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Architecture</h4>
          <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Deep MLP Structure</h3>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible relative z-10">
        <g>{edges}</g>

        {neuronPositions.map((layer, lIdx) => (
          <g key={`layer-${lIdx}`}>
            {layer.map((pos, nIdx) => {
              const isActivated = active && (Math.sin(lIdx * 2 + nIdx) > -0.2);
              return (
                <g key={`neuron-${lIdx}-${nIdx}`}>
                  <motion.rect
                    x={pos.x - 14}
                    y={pos.y - 14}
                    width={28}
                    height={28}
                    rx={6}
                    fill={isActivated ? pos.color : '#0f172a'}
                    stroke={pos.color}
                    strokeWidth={2}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: lIdx * 0.1 }}
                  />
                  <path 
                    d={`M ${pos.x - 6} ${pos.y + 4} Q ${pos.x} ${pos.y - 6} ${pos.x + 6} ${pos.y + 2}`} 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    strokeOpacity={isActivated ? 0.9 : 0.3} 
                  />
                </g>
              );
            })}
            <text 
              x={layer[0].x} 
              y={height - 20} 
              textAnchor="middle" 
              className="text-[10px] font-black fill-slate-500 uppercase tracking-widest"
            >
              {layers[lIdx].label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default React.memo(FFNNetworkVisual);