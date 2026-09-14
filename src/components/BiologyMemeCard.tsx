import React from 'react';
import { BiologyMeme } from '../types';
import { Smile, MessageSquare, Sparkles, BookmarkCheck } from 'lucide-react';

interface Props {
  meme: BiologyMeme;
}

export const BiologyMemeCard: React.FC<Props> = ({ meme }) => {
  const getTheme = () => {
    switch (meme.themeColor) {
      case 'rose':
        return {
          border: 'border-rose-200 hover:border-rose-300',
          badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
          dialogBg: 'bg-rose-50/70 border-rose-200',
          punchlineBg: 'bg-rose-100/60 border-rose-300 text-rose-950',
          avatarBg: 'bg-rose-500 text-white',
        };
      case 'emerald':
        return {
          border: 'border-emerald-200 hover:border-emerald-300',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          dialogBg: 'bg-emerald-50/70 border-emerald-200',
          punchlineBg: 'bg-emerald-100/60 border-emerald-300 text-emerald-950',
          avatarBg: 'bg-emerald-500 text-white',
        };
      case 'amber':
        return {
          border: 'border-amber-200 hover:border-amber-300',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
          dialogBg: 'bg-amber-50/70 border-amber-200',
          punchlineBg: 'bg-amber-100/60 border-amber-300 text-amber-950',
          avatarBg: 'bg-amber-500 text-white',
        };
      default:
        return {
          border: 'border-indigo-200 hover:border-indigo-300',
          badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
          dialogBg: 'bg-indigo-50/70 border-indigo-200',
          punchlineBg: 'bg-indigo-100/60 border-indigo-300 text-indigo-950',
          avatarBg: 'bg-indigo-500 text-white',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      id={`meme-${meme.id}`}
      className={`p-5 rounded-2xl border bg-white shadow-xs transition-all flex flex-col justify-between ${theme.border}`}
    >
      <div>
        {/* Top bar with Meme badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider rounded-full bg-pink-100 text-pink-900 border border-pink-200">
            <Smile className="w-3.5 h-3.5 text-pink-600" />
            😂 БИО-МЕМ ДЛЯ ПАМЯТИ
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${theme.badgeBg}`}>
            {meme.visualTag}
          </span>
        </div>

        <h4 className="text-base font-extrabold text-slate-900 mb-2">
          {meme.title}
        </h4>

        {/* Character & Situation */}
        <div className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Герои: <span className="text-slate-800 font-bold">{meme.character}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 text-xs text-slate-600 font-medium leading-relaxed">
          <span className="font-bold text-slate-700 block mb-0.5 text-[11px] uppercase tracking-wide">
            Ситуация:
          </span>
          {meme.scenario}
        </div>

        {/* Dialog bubble */}
        <div className={`p-3.5 rounded-xl border mb-3 relative text-xs sm:text-sm font-semibold italic ${theme.dialogBg}`}>
          <MessageSquare className="w-3.5 h-3.5 absolute -top-2 left-3 text-slate-400 fill-white" />
          <span className="text-slate-800">{meme.quote}</span>
        </div>

        {/* Punchline */}
        <div className={`p-3 rounded-xl border mb-3 text-xs leading-relaxed ${theme.punchlineBg}`}>
          <span className="font-bold block mb-0.5 text-[11px] uppercase tracking-wide">
            Развязка:
          </span>
          <span className="font-bold">{meme.punchline}</span>
        </div>
      </div>

      {/* Memory Hook */}
      <div className="p-3 rounded-xl bg-slate-900 text-white text-xs leading-relaxed shadow-xs">
        <div className="flex items-center gap-1.5 font-extrabold text-amber-400 mb-1 text-[11px] uppercase tracking-wide">
          <BookmarkCheck className="w-3.5 h-3.5" />
          Что мы запомнили из PDF:
        </div>
        <span className="text-slate-200 font-medium">
          {meme.memoryHook}
        </span>
      </div>
    </div>
  );
};
