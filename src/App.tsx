import React, { useState } from 'react';
import { biologyTopics } from './data/biologyData';
import { Header } from './components/Header';
import { TopicSectionView } from './components/TopicSectionView';
import { PdfExportModal } from './components/PdfExportModal';
import { Sparkles, BookOpen, Layers, Zap, Flame, Brain, Smile, CheckCircle2, ArrowRight, Download, Printer } from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<'all' | 'section3' | 'section4'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  const displayedTopics =
    currentSection === 'all'
      ? biologyTopics
      : biologyTopics.filter((t) => t.id === currentSection);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white pb-20">
      {/* Sticky Header with Navigation, Search, Filters & PDF Button */}
      <Header
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Print-only clean header */}
        <div className="print-only mb-6 border-b-2 border-slate-900 pb-4">
          <div className="text-xs uppercase font-extrabold tracking-wider text-indigo-700 mb-1">
            Учебный конспект по биологии клетки (Строго по тексту PDF без изменений)
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Углеводы: Свойства, функции и химический анализ (§ 3 и § 4)
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            23 ключевых термина • 10 точных констант • Схемы процессов • Таблицы различий • Ассоциации
          </p>
        </div>

        {/* Visual Pipeline Banner (Hidden in print) */}
        <div className="no-print p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-md mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                НАГЛЯДНЫЙ ГИД ПО БИОЛОГИИ • ТОЛЬКО ИЗ PDF
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                Углеводы: свойства, функции и химический анализ
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
                Максимально наглядный учебный материал для быстрого понимания и долгосрочного запоминания: структурированные схемы, точные числа, ассоциации, биологические мемы и отсутствие лишней «воды».
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  id="banner-download-pdf-btn"
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Скачать в PDF без изменений</span>
                </button>

                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-indigo-300" />
                  <span>Печать / Сохранить в PDF</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-amber-300">23</div>
                <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Термина</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">10</div>
                <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Чисел-норм</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-sky-300">6</div>
                <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Схем процессов</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-rose-300">7</div>
                <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Био-мемов</div>
              </div>
            </div>
          </div>

          {/* Visual Learning Chain */}
          <div className="mt-6 pt-5 border-t border-white/15 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold text-slate-200">
            <span className="shrink-0 text-amber-300 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> PDF
            </span>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="shrink-0 text-sky-300">🧠 ПОНЯТЬ</span>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="shrink-0 text-indigo-300">🔑 ВЫДЕЛИТЬ ГЛАВНОЕ</span>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="shrink-0 text-teal-300">🎨 ВИЗУАЛИЗИРОВАТЬ</span>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="shrink-0 text-pink-300">😂 МЕМ</span>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="shrink-0 text-purple-300">🧠 АССОЦИАЦИЯ</span>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="shrink-0 text-cyan-300">🔬 СХЕМА</span>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="shrink-0 text-amber-400 font-extrabold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> ЗАПОМНИТЬ
            </span>
          </div>
        </div>

        {/* Render Topic Sections */}
        {displayedTopics.map((topic) => (
          <TopicSectionView
            key={topic.id}
            topic={topic}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
          />
        ))}

        {/* Global Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-500 font-medium no-print">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2 font-semibold text-slate-700">
            <span>§ 3. Свойства и функции углеводов</span>
            <span>•</span>
            <span>§ 4. Редуцирующие и нередуцирующие сахара</span>
          </div>
          <p>
            Материал полностью основан на содержании учебного PDF. Никаких сторонних добавлений, тестов или домашних заданий.
          </p>
        </footer>
      </main>

      {/* PDF Export & Original Text Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
}
