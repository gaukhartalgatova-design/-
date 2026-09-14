import React from 'react';
import { KeyNumber } from '../types';
import { Zap, Flame, Thermometer, Activity, Beaker } from 'lucide-react';

interface Props {
  item: KeyNumber;
}

export const KeyNumberCard: React.FC<Props> = ({ item }) => {
  const getIcon = () => {
    switch (item.category) {
      case 'energy':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'homeostasis':
        return <Activity className="w-5 h-5 text-emerald-500" />;
      case 'temperature':
        return <Thermometer className="w-5 h-5 text-rose-500" />;
      case 'lab':
        return <Beaker className="w-5 h-5 text-indigo-500" />;
      default:
        return <Zap className="w-5 h-5 text-sky-500" />;
    }
  };

  const getBorderColor = () => {
    switch (item.category) {
      case 'energy':
        return 'border-amber-200 bg-amber-50/60 hover:border-amber-400';
      case 'homeostasis':
        return 'border-emerald-200 bg-emerald-50/60 hover:border-emerald-400';
      case 'temperature':
        return 'border-rose-200 bg-rose-50/60 hover:border-rose-400';
      case 'lab':
        return 'border-indigo-200 bg-indigo-50/60 hover:border-indigo-400';
      default:
        return 'border-sky-200 bg-sky-50/60 hover:border-sky-400';
    }
  };

  return (
    <div
      id={`number-${item.id}`}
      className={`relative p-5 rounded-2xl border transition-all duration-200 shadow-sm flex flex-col justify-between ${getBorderColor()}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/90 text-slate-700 shadow-xs">
          {getIcon()}
          🔢 ЗАПОМНИ ЧИСЛО
        </span>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {item.category === 'energy' ? 'Энергия' : item.category === 'homeostasis' ? 'Гомеостаз' : item.category === 'temperature' ? 'Температура' : item.category === 'lab' ? 'Лаборатория' : 'Концентрация'}
        </span>
      </div>

      <div className="my-2">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {item.value}
          </span>
          <span className="text-base sm:text-lg font-bold text-slate-700">
            {item.unit}
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-800 leading-snug">
          {item.context}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-200/70 text-xs text-slate-600 font-medium leading-relaxed">
        <span className="font-bold text-slate-900">Зачем помнить:</span> {item.importance}
      </div>
    </div>
  );
};
