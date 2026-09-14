import React from 'react';
import { BookOpen, Search, Sparkles, Filter, Layers, Check, Download, Printer } from 'lucide-react';

interface Props {
  currentSection: 'all' | 'section3' | 'section4';
  onSelectSection: (section: 'all' | 'section3' | 'section4') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onOpenPdfModal: () => void;
}

export const filterOptions = [
  { id: 'all', label: 'Все блоки' },
  { id: 'explanations', label: '🧠 Понятно' },
  { id: 'terms', label: '🔑 Термины' },
  { id: 'remember', label: '⭐ Запомни' },
  { id: 'comparisons', label: '⚡ Не перепутай' },
  { id: 'processes', label: '🔬 Процессы' },
  { id: 'structures', label: '🧬 Строение' },
  { id: 'classifications', label: '📊 Классификации' },
  { id: 'connections', label: '🔗 Связи' },
  { id: 'associations', label: '🧠 Ассоциации' },
  { id: 'memes', label: '😂 Мемы' },
  { id: 'numbers', label: '🔢 Цифры' },
  { id: 'summary', label: '🔥 Главное' },
];

export const Header: React.FC<Props> = ({
  currentSection,
  onSelectSection,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  onOpenPdfModal,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-sky-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                  VISUAL BIOLOGY STUDY GUIDE
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
                  Строго по материалу PDF
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Биология клетки: Углеводы
              </h1>
            </div>
          </div>

          {/* Search bar & Section switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Поиск по терминам, формулам..."
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-900 placeholder:text-slate-400 font-medium transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Section tabs */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
              <button
                onClick={() => onSelectSection('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  currentSection === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Все темы
              </button>
              <button
                onClick={() => onSelectSection('section3')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  currentSection === 'section3'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                § 3. Функции
              </button>
              <button
                onClick={() => onSelectSection('section4')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  currentSection === 'section4'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                § 4. Редуцирующие
              </button>
            </div>

            {/* Download PDF button */}
            <button
              onClick={onOpenPdfModal}
              id="header-download-pdf-btn"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-xs transition-all shrink-0 cursor-pointer"
              title="Скачать конспект в PDF без изменений"
            >
              <Download className="w-4 h-4" />
              <span>Скачать в PDF</span>
            </button>
          </div>
        </div>

        {/* Filter categories bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Фильтр:
          </span>
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onFilterChange(opt.id)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0 transition-all border ${
                activeFilter === opt.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
