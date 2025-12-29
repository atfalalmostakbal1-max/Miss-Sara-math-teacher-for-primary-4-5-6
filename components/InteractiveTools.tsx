
import React, { useState } from 'react';

interface ToolProps {
  type: 'counters' | 'placeValue' | 'array' | 'graph' | 'none';
  onValueChange?: (value: any) => void;
}

export const PlaceValueBoard: React.FC = () => {
  const columns = ['Millions', 'Hund. Thousands', 'Ten Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
  const [values, setValues] = useState<string[]>(new Array(7).fill(''));

  const handleChange = (index: number, val: string) => {
    const newValues = [...values];
    newValues[index] = val.slice(-1); // only one digit
    setValues(newValues);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg overflow-x-auto">
      <div className="flex border-b-2 border-indigo-200">
        {columns.map((col, i) => (
          <div key={i} className="flex-1 min-w-[80px] p-2 text-center text-xs font-bold text-indigo-700 bg-indigo-50 border-r border-indigo-100 last:border-0">
            {col}
          </div>
        ))}
      </div>
      <div className="flex">
        {values.map((val, i) => (
          <div key={i} className="flex-1 p-2 border-r border-indigo-100 last:border-0">
            <input 
              type="number" 
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-full text-center text-2xl font-bold bg-transparent outline-none focus:bg-indigo-50 rounded"
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CountersTool: React.FC = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Interactive Counters</h3>
      <div className="flex flex-wrap gap-2 justify-center mb-6 min-h-[100px] border-2 border-dashed border-indigo-100 rounded-lg p-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-indigo-500 shadow-sm animate-bounce" />
        ))}
      </div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setCount(c => Math.max(0, c - 1))} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">-</button>
        <div className="px-6 py-2 font-bold text-xl">{count}</div>
        <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">+</button>
      </div>
    </div>
  );
};

export const ToolRenderer: React.FC<ToolProps> = ({ type }) => {
  switch (type) {
    case 'placeValue': return <PlaceValueBoard />;
    case 'counters': return <CountersTool />;
    default: return null;
  }
};
