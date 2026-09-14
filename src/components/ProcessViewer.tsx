import React, { useState } from 'react';
import { BiologicalProcess } from '../types';
import { Microscope, ArrowRight, CheckCircle2, Play, Beaker } from 'lucide-react';

interface Props {
  process: BiologicalProcess;
}

export const ProcessViewer: React.FC<Props> = ({ process }) => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <div
      id={`process-${process.id}`}
      className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
            <Microscope className="w-3.5 h-3.5 text-indigo-600" />
            🔬 ПРОЦЕСС В СХЕМЕ
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
            {process.title}
          </h3>
        </div>

        {process.formulaOrSummary && (
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-auto">
            {process.formulaOrSummary}
          </span>
        )}
      </div>

      {/* Process Stages Chain */}
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {process.stages.map((stage, idx) => {
          const isSelected = activeStage === stage.number;
          return (
            <div
              key={stage.number}
              onClick={() => setActiveStage(isSelected ? null : stage.number)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/90 border-indigo-400 ring-2 ring-indigo-200 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-extrabold rounded-full bg-indigo-600 text-white shadow-2xs">
                    {stage.number}
                  </span>
                  {stage.badge && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {stage.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                  {stage.title}
                </h4>

                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {idx < process.stages.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-slate-300 items-center justify-center text-slate-400">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result Card */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-start gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold text-emerald-950 uppercase tracking-wide mr-1.5">
            Результат процесса:
          </span>
          <span className="font-semibold text-emerald-900 leading-relaxed">
            {process.result}
          </span>
        </div>
      </div>
    </div>
  );
};
