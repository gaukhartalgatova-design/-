import React from 'react';
import { Brain, CheckCircle2 } from 'lucide-react';

interface Props {
  explanation: {
    title: string;
    simpleText: string;
    bulletPoints: string[];
  };
}

export const ExplanationBlock: React.FC<Props> = ({ explanation }) => {
  return (
    <div className="p-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-sky-50/30 shadow-xs hover:border-indigo-200 transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
          <Brain className="w-3.5 h-3.5 text-indigo-600" />
          🧠 ПОНЯТНОЕ ОБЪЯСНЕНИЕ
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2.5">
        {explanation.title}
      </h3>

      <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed mb-4">
        {explanation.simpleText}
      </p>

      <div className="space-y-2 pt-2 border-t border-indigo-50">
        {explanation.bulletPoints.map((pt, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span className="font-semibold leading-snug">{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
