import React from 'react';
import { ConnectionLink } from '../types';
import { Link2, ArrowRight } from 'lucide-react';

interface Props {
  connections: ConnectionLink[];
}

export const ConnectionChain: React.FC<Props> = ({ connections }) => {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full bg-cyan-100 text-cyan-900 border border-cyan-200">
          <Link2 className="w-3.5 h-3.5 text-cyan-600" />
          🔗 СВЯЗИ МЕЖДУ ПОНЯТИЯМИ
        </span>
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
          Причинно-следственные и структурные связи
        </h3>
      </div>

      <div className="space-y-3">
        {connections.map((conn, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-cyan-50/40 hover:border-cyan-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1">
              <span className="font-extrabold text-slate-900 text-sm px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs self-start sm:self-auto">
                {conn.from}
              </span>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-100/80 text-cyan-950 text-xs font-bold self-start sm:self-auto shrink-0">
                <span>{conn.verb}</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-700" />
              </div>

              <span className="font-bold text-slate-800 text-sm px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs self-start sm:self-auto">
                {conn.to}
              </span>
            </div>

            {conn.note && (
              <span className="text-xs font-medium text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60 self-start md:self-auto shrink-0">
                {conn.note}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
