import React from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';

interface Props {
  takeaways: string[];
  topicTitle: string;
}

export const SummaryBlock: React.FC<Props> = ({ takeaways, topicTitle }) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 shadow-sm my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-200">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-2xl bg-amber-500 text-white shadow-xs">
            <Flame className="w-6 h-6 fill-amber-100" />
          </span>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 block">
              ИТОГОВЫЙ СУПЕР-БЛОК ПАМЯТИ
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              🔥 ГЛАВНОЕ: ТОП ФАКТОВ ТЕМЫ
            </h3>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white text-slate-700 border border-amber-200 self-start sm:self-auto shadow-2xs">
          {takeaways.length} ключевых фактов
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {takeaways.map((fact, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-white/90 border border-amber-200/80 shadow-2xs hover:border-amber-400 transition-all flex items-start gap-3"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-amber-100 text-amber-900 text-xs font-extrabold shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
              {fact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
