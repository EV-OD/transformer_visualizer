
import React from 'react';

interface Props {
  data: number[];
  color: string;
}

const Heatmap: React.FC<Props> = ({ data, color }) => {
  return (
    <div className="flex gap-1 p-1 bg-slate-900/40 rounded border border-slate-800">
      {data.map((val, i) => (
        <div 
          key={i}
          className="w-3 h-3 rounded-sm"
          style={{ 
            backgroundColor: val > 0 ? color : '#f43f5e',
            opacity: Math.min(1, Math.abs(val) + 0.1)
          }}
          title={val.toFixed(4)}
        />
      ))}
    </div>
  );
};

export default Heatmap;
