import React, { useState, useEffect } from 'react';
import { Play, Code, Eye, AlertCircle, Lightbulb } from 'lucide-react';

const SubstringExplorer = () => {
  const [text, setText] = useState("Hello, Python World!");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [step, setStep] = useState(1);
  const [selectedExample, setSelectedExample] = useState('basic');

  const examples = {
    basic: { text: "Hello, Python World!", start: 0, end: 5, step: 1, desc: "Basic substring extraction" },
    negative: { text: "Programming", start: -4, end: undefined, step: 1, desc: "Negative indexing from end" },
    skip: { text: "ABCDEFGHIJK", start: 0, end: 11, step: 2, desc: "Every other character" },
    reverse: { text: "Python", start: undefined, end: undefined, step: -1, desc: "Reverse the string" },
    email: { text: "user@example.com", start: 0, end: 4, step: 1, desc: "Extract username from email" }
  };

  const loadExample = (key) => {
    const ex = examples[key];
    setText(ex.text);
    setStartIndex(ex.start || 0);
    setEndIndex(ex.end || ex.text.length);
    setStep(ex.step);
    setSelectedExample(key);
  };

  const getSubstring = () => {
    try {
      const start = startIndex === '' ? undefined : parseInt(startIndex);
      const end = endIndex === '' ? undefined : parseInt(endIndex);
      const stepVal = parseInt(step);
      
      if (start === undefined && end === undefined && stepVal === -1) {
        return text.split('').reverse().join('');
      }
      
      let result = '';
      const len = text.length;
      const actualStart = start === undefined ? (stepVal > 0 ? 0 : len - 1) : 
                         start < 0 ? len + start : start;
      const actualEnd = end === undefined ? (stepVal > 0 ? len : -1) : 
                       end < 0 ? len + end : end;
      
      if (stepVal > 0) {
        for (let i = actualStart; i < actualEnd && i < len; i += stepVal) {
          if (i >= 0) result += text[i];
        }
      } else {
        for (let i = actualStart; i > actualEnd && i >= 0; i += stepVal) {
          if (i < len) result += text[i];
        }
      }
      
      return result;
    } catch (e) {
      return 'Error';
    }
  };

  const getSliceNotation = () => {
    const start = startIndex === '' ? '' : startIndex;
    const end = endIndex === '' || endIndex === text.length ? '' : endIndex;
    const stepPart = step === '1' ? '' : `:${step}`;
    return `[${start}:${end}${stepPart}]`;
  };

  const renderStringWithIndices = () => {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            {text.split('').map((_, i) => (
              <span key={i} className="w-6 text-center">{i}</span>
            ))}
          </div>
          <div className="flex justify-between text-lg border-b pb-2">
            {text.split('').map((char, i) => {
              const start = parseInt(startIndex) || 0;
              const end = parseInt(endIndex) || text.length;
              const stepVal = parseInt(step);
              
              let isSelected = false;
              if (stepVal > 0) {
                isSelected = i >= start && i < end && (i - start) % stepVal === 0;
              } else if (stepVal < 0) {
                const actualStart = startIndex === '' ? text.length - 1 : (start < 0 ? text.length + start : start);
                const actualEnd = endIndex === '' ? -1 : (end < 0 ? text.length + end : end);
                isSelected = i <= actualStart && i > actualEnd && (actualStart - i) % Math.abs(stepVal) === 0;
              }
              
              return (
                <span
                  key={i}
                  className={`w-6 text-center p-1 rounded ${
                    isSelected ? 'bg-blue-200 text-blue-800' : 'text-gray-700'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            {text.split('').map((_, i) => (
              <span key={i} className="w-6 text-center">{i - text.length}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🐍 Python Substring Mastery</h1>
        <p className="text-gray-600">Interactive exploration of string slicing - see it, understand it, master it!</p>
      </div>

      {/* Quick Examples */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
          Quick Examples
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(examples).map(([key, ex]) => (
            <button
              key={key}
              onClick={() => loadExample(key)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedExample === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {ex.desc}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your String</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your text..."
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
              <input
                type="number"
                value={startIndex}
                onChange={(e) => setStartIndex(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
              <input
                type="number"
                value={endIndex}
                onChange={(e) => setEndIndex(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="length"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Step</label>
              <input
                type="number"
                value={step}
                onChange={(e) => setStep(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">
            <div className="flex items-center mb-2">
              <Code className="w-4 h-4 mr-2" />
              <span className="text-sm">Python Code</span>
            </div>
            <div className="text-lg">
              text{getSliceNotation()}
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-center mb-2">
              <Eye className="w-4 h-4 mr-2 text-blue-600" />
              <span className="font-medium text-blue-800">Result</span>
            </div>
            <div className="text-xl font-mono bg-white p-3 rounded border">
              "{getSubstring()}"
            </div>
          </div>
        </div>
      </div>

      {/* Visual Index Display */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">String Index Visualization</h3>
        {renderStringWithIndices()}
        <div className="mt-2 text-sm text-gray-600 space-y-1">
          <div>• Top row: positive indices (0, 1, 2...)</div>
          <div>• Bottom row: negative indices (-1, -2, -3...)</div>
          <div>• Highlighted characters show your selection</div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3">💡 Pro Tips</h4>
          <ul className="space-y-2 text-sm text-green-700">
            <li>• Negative indices count from the end: -1 is the last character</li>
            <li>• End index is exclusive (not included in result)</li>
            <li>• Empty start/end uses string boundaries</li>
            <li>• Negative step reverses the direction</li>
            <li>• Step of 2 takes every other character</li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-800 mb-3">⚡ Common Patterns</h4>
          <div className="space-y-2 text-sm text-amber-700 font-mono">
            <div>text[:5] → first 5 characters</div>
            <div>text[5:] → from index 5 to end</div>
            <div>text[-3:] → last 3 characters</div>
            <div>text[::2] → every other character</div>
            <div>text[::-1] → reverse string</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubstringExplorer;