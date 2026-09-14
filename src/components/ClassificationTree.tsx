import React from 'react';
import { ClassificationNode } from '../types';
import { GitFork, Layers, Tag } from 'lucide-react';

interface Props {
  node: ClassificationNode;
}

export const ClassificationTree: React.FC<Props> = ({ node }) => {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full bg-violet-100 text-violet-900 border border-violet-200">
            <GitFork className="w-3.5 h-3.5 text-violet-600" />
            📊 КЛАССИФИКАЦИЯ
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
            {node.title}
          </h3>
        </div>

        {node.badge && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 self-start sm:self-auto">
            {node.badge}
          </span>
        )}
      </div>

      {node.description && (
        <p className="text-xs font-semibold text-slate-500 mb-4">
          {node.description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {node.children?.map((child, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-violet-50/40 hover:border-violet-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-violet-600"></span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {child.name}
                </h4>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                {child.details}
              </p>
            </div>

            {child.examples && child.examples.length > 0 && (
              <div className="pt-2.5 border-t border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                  Примеры из PDF:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {child.examples.map((ex, exIdx) => (
                    <span
                      key={exIdx}
                      className="text-xs font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
