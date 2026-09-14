import React from 'react';
import { RememberFact } from '../types';
import { Star } from 'lucide-react';

interface Props {
  fact: RememberFact;
}

export const RememberCard: React.FC<Props> = ({ fact }) => {
  const getColors = () => {
    switch (fact.accent) {
      case 'rose':
        return {
          bg: 'bg-gradient-to-br from-rose-50 to-pink-50/70 border-rose-200 text-rose-950',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: 'text-rose-600 fill-rose-100',
          highlight: 'text-rose-700 font-bold',
        };
      case 'amber':
        return {
          bg: 'bg-gradient-to-br from-amber-50 to-yellow-50/70 border-amber-200 text-amber-950',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: 'text-amber-600 fill-amber-100',
          highlight: 'text-amber-700 font-bold',
        };
      case 'emerald':
        return {
          bg: 'bg-gradient-to-br from-emerald-50 to-teal-50/70 border-emerald-200 text-emerald-950',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: 'text-emerald-600 fill-emerald-100',
          highlight: 'text-emerald-700 font-bold',
        };
      case 'purple':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-fuchsia-50/70 border-purple-200 text-purple-950',
          badge: 'bg-purple-100 text-purple-800 border-purple-300',
          icon: 'text-purple-600 fill-purple-100',
          highlight: 'text-purple-700 font-bold',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-sky-50/70 border-blue-200 text-blue-950',
          badge: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: 'text-blue-600 fill-blue-100',
          highlight: 'text-blue-700 font-bold',
        };
    }
  };

  const colors = getColors();

  return (
    <div
      id={`remember-${fact.id}`}
      className={`p-5 rounded-2xl border shadow-sm transition-all hover:shadow-md ${colors.bg}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 font-extrabold text-xs uppercase tracking-wider">
          <Star className={`w-4 h-4 ${colors.icon}`} />
          <span>⭐ ЗАПОМНИ</span>
        </div>
        {fact.badge && (
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${colors.badge}`}>
            {fact.badge}
          </span>
        )}
      </div>

      <h4 className="text-base font-bold text-slate-900 mb-2">
        {fact.title}
      </h4>

      <p className="text-sm font-medium leading-relaxed text-slate-800">
        {fact.fact}
      </p>
    </div>
  );
};
