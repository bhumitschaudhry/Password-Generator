import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { generatePassword, calculateStrength, PasswordOptions } from '../utils/password';
import { cn } from '../utils/cn';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong' | 'very-strong'>('weak');

  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
  }, [options]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(prev => ({ ...prev, length: Number(e.target.value) }));
  };

  const toggleOption = (key: keyof Omit<PasswordOptions, 'length'>) => {
    setOptions(prev => {
        const next = { ...prev, [key]: !prev[key] };
        if (!next.uppercase && !next.lowercase && !next.numbers && !next.symbols) {
            return prev;
        }
        return next;
    });
  };

  const getStrengthLabel = () => {
    switch (strength) {
        case 'weak': return 'WEAK';
        case 'medium': return 'OKAY';
        case 'strong': return 'GOOD';
        case 'very-strong': return 'EPIC';
        default: return '';
    }
  }
  
  const getStrengthColor = () => {
      switch (strength) {
          case 'weak': return 'bg-red-500';
          case 'medium': return 'bg-yellow-400';
          case 'strong': return 'bg-blue-500';
          case 'very-strong': return 'bg-green-500';
          default: return 'bg-gray-200';
      }
  }

  return (
    <div className="w-full max-w-lg poster-card p-0">
      {/* Header */}
      <div className="border-b-4 border-black bg-yellow-400 p-6">
        <h2 className="text-4xl md:text-5xl leading-none tracking-tighter text-black">
            PASSWORD<br/>GENERATOR
        </h2>
      </div>

      <div className="p-6 space-y-8 bg-white">
        {/* Password Display */}
        <div className="relative group">
            <div className="absolute -top-3 left-0 bg-black text-white px-2 py-0.5 text-xs font-bold uppercase">
                Result
            </div>
            <div className="w-full border-4 border-black bg-white p-4 pr-20 text-black font-mono text-2xl break-all min-h-[5rem] flex items-center justify-center text-center font-bold">
                {password}
            </div>
            <button
            onClick={copyToClipboard}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors flex items-center justify-center"
            title="Copy"
            >
            {copied ? <Check className="w-6 h-6" /> : <Copy className="w-5 h-5" />}
            </button>
        </div>

        {/* Strength Indicator */}
        <div className="space-y-2">
            <div className="flex justify-between items-end border-b-2 border-black pb-1">
                <span className="font-bold text-sm uppercase">Strength</span>
                <span className="font-black text-xl uppercase">{getStrengthLabel()}</span>
            </div>
            <div className="flex gap-2 h-4">
                {[1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={cn(
                            "flex-1 border-2 border-black transition-all duration-200",
                            (strength === 'weak' && level === 1) ||
                            (strength === 'medium' && level <= 2) ||
                            (strength === 'strong' && level <= 3) ||
                            (strength === 'very-strong' && level <= 4)
                                ? getStrengthColor()
                                : "bg-transparent pattern-dots"
                        )}
                        style={
                            !((strength === 'weak' && level === 1) ||
                            (strength === 'medium' && level <= 2) ||
                            (strength === 'strong' && level <= 3) ||
                            (strength === 'very-strong' && level <= 4)) ? {
                                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                                backgroundSize: '4px 4px'
                            } : {}
                        }
                    />
                ))}
            </div>
        </div>

        {/* Controls */}
        <div className="space-y-8">
            {/* Length Slider */}
            <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-lg">Length</span>
                <div className="border-2 border-black px-3 py-1 font-mono font-bold text-xl bg-yellow-400 shadow-[2px_2px_0px_0px_#000]">
                    {options.length}
                </div>
            </div>
            <input
                type="range"
                min="6"
                max="32"
                value={options.length}
                onChange={handleLengthChange}
                className="w-full h-4 bg-gray-200 border-2 border-black rounded-none appearance-none cursor-pointer accent-black hover:accent-yellow-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[2px_2px_0px_0px_#000]"
            />
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { key: 'uppercase', label: 'ABC' },
                    { key: 'lowercase', label: 'abc' },
                    { key: 'numbers', label: '123' },
                    { key: 'symbols', label: '#@&' },
                ].map((opt) => (
                    <label key={opt.key} className="relative cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={options[opt.key as keyof PasswordOptions] as boolean}
                            onChange={() => toggleOption(opt.key as keyof Omit<PasswordOptions, 'length'>)}
                            className="peer sr-only"
                        />
                        <div className="w-full border-2 border-black p-3 bg-white peer-checked:bg-black peer-checked:text-white transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] flex items-center justify-between">
                            <span className="font-bold uppercase">{opt.key}</span>
                            <span className="font-mono text-sm opacity-50">{opt.label}</span>
                        </div>
                    </label>
                ))}
            </div>

            {/* Generate Button */}
            <button
                onClick={handleGenerate}
                className="w-full poster-button py-5 text-xl flex items-center justify-center gap-3 group"
            >
                <span>GENERATE NEW</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};
