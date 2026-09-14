import React from 'react';
import { StructureItem } from '../types';
import { Dna, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  item: StructureItem;
}

export const StructureCard: React.FC<Props> = ({ item }) => {
  return (
    <div
      id={`structure-${item.id}`}
      className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
            <Dna className="w-3.5 h-3.5 text-emerald-600" />
            🧬 СТРОЕНИЕ
          </span>
          {item.formula && (
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {item.formula}
            </span>
          )}
        </div>

        {/* Часть */}
        <div className="mb-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Часть / Молекула
          </span>
          <h4 className="text-base font-extrabold text-slate-900">
            {item.part}
          </h4>
        </div>

        {/* Характеристика */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 text-xs leading-relaxed">
          <span className="font-bold text-slate-700 block mb-1 text-[11px] uppercase tracking-wide">
            Характеристика строения:
          </span>
          <span className="text-slate-700 font-medium">
            {item.characteristic}
          </span>
        </div>
      </div>

      {/* Функция */}
      <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs leading-relaxed">
        <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1 text-[11px] uppercase tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Биологическая функция:
        </div>
        <span className="text-emerald-950 font-semibold">
          {item.function}
        </span>
      </div>
    </div>
  );
};
