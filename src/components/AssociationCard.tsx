import React from 'react';
import { AssociationItem } from '../types';
import { Brain, Key, Lightbulb } from 'lucide-react';

interface Props {
  item: AssociationItem;
}

export const AssociationCard: React.FC<Props> = ({ item }) => {
  return (
    <div
      id={`assoc-${item.id}`}
      className="p-5 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header with Term */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            <Key className="w-3 h-3 text-amber-700" />
            🔑 {item.term}
          </span>
          <Brain className="w-4 h-4 text-amber-500" />
        </div>

        {/* Association */}
        <div className="p-3 rounded-xl bg-amber-100/60 border border-amber-200 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 uppercase tracking-wide mb-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
            🧠 Ассоциация:
          </div>
          <div className="text-sm font-extrabold text-slate-900">
            {item.association}
          </div>
        </div>
      </div>

      {/* Why it is easy to remember */}
      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed">
        <span className="font-bold text-slate-900 block mb-1 text-[11px] uppercase tracking-wide">
          Почему легко запомнить:
        </span>
        <span className="text-slate-700 font-medium">
          {item.explanation}
        </span>
      </div>
    </div>
  );
};
