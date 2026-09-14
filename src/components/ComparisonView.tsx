import React from 'react';
import { ComparisonItem } from '../types';
import { Zap, Check, AlertTriangle } from 'lucide-react';

interface Props {
  comparison: ComparisonItem;
}

export const ComparisonView: React.FC<Props> = ({ comparison }) => {
  return (
    <div
      id={`comparison-${comparison.id}`}
      className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full bg-amber-100 text-amber-900 border border-amber-300">
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
          ⚡ НЕ ПЕРЕПУТАЙ
        </span>
        <h3 className="text-lg font-extrabold text-slate-900">
          {comparison.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-sky-200">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            <h4 className="font-bold text-sky-950 text-sm sm:text-base">
              {comparison.nameA}
            </h4>
          </div>
          <div className="space-y-2.5">
            {comparison.aspects.map((aspect, idx) => (
              <div key={idx} className="text-xs sm:text-sm">
                <span className="font-semibold text-sky-900/70 block text-xs uppercase tracking-wide">
                  {aspect.feature}:
                </span>
                <span className="text-slate-800 font-medium leading-snug">
                  {aspect.itemA}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h4 className="font-bold text-emerald-950 text-sm sm:text-base">
              {comparison.nameB}
            </h4>
          </div>
          <div className="space-y-2.5">
            {comparison.aspects.map((aspect, idx) => (
              <div key={idx} className="text-xs sm:text-sm">
                <span className="font-semibold text-emerald-900/70 block text-xs uppercase tracking-wide">
                  {aspect.feature}:
                </span>
                <span className="text-slate-800 font-medium leading-snug">
                  {aspect.itemB}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm font-semibold text-slate-700">
          <span className="text-slate-900 font-bold">Главное отличие:</span> {comparison.keyTakeaway}
        </p>
      </div>
    </div>
  );
};
