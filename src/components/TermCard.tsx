import React from 'react';
import { BiologyTerm } from '../types';
import { Key, Tag } from 'lucide-react';

interface Props {
  term: BiologyTerm;
}

export const TermCard: React.FC<Props> = ({ term }) => {
  return (
    <div
      id={`term-${term.id}`}
      className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider rounded-full bg-slate-100 text-slate-800 border border-slate-200">
            <Key className="w-3 h-3 text-indigo-600" />
            🔑 ТЕРМИН
          </span>
          {term.formula && (
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              {term.formula}
            </span>
          )}
        </div>

        <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          {term.term}
        </h4>

        {term.pronunciationOrOrigin && (
          <span className="text-xs text-indigo-600 font-semibold block mb-2">
            ({term.pronunciationOrOrigin})
          </span>
        )}

        <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed mt-2 mb-4">
          {term.shortExplanation}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
        {term.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
