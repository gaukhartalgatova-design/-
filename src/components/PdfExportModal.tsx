import React, { useState } from 'react';
import { originalTextbookData } from '../data/originalTextData';
import {
  triggerPrintToPdf,
  downloadTextFile,
  openAndPrintOriginalText,
  downloadDirectPdf,
} from '../utils/pdfExport';
import {
  Download,
  Printer,
  FileText,
  Copy,
  Check,
  X,
  FileDown,
  Sparkles,
  BookOpen,
  Info,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'original'>('visual');
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [selectedParagraph, setSelectedParagraph] = useState<'all' | 'section3' | 'section4'>('all');

  if (!isOpen) return null;

  const handleCopyText = () => {
    let textToCopy = '';
    if (selectedParagraph === 'all') {
      textToCopy = originalTextbookData.map((p) => p.plainText).join('\n\n' + '='.repeat(50) + '\n\n');
    } else {
      const p = originalTextbookData.find((x) => x.id === selectedParagraph);
      textToCopy = p ? p.plainText : '';
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDirectPdfDownload = async () => {
    setIsGeneratingPdf(true);
    try {
      await downloadDirectPdf(selectedParagraph);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrintVisualGuide = () => {
    onClose();
    setTimeout(() => {
      triggerPrintToPdf();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs modal-backdrop">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-indigo-500 text-white px-2 py-0.5 rounded-md">
                  ЭКСПОРТ В PDF
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  100% строго по материалу PDF
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                Скачать материал в PDF без изменений
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all"
            title="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
              activeTab === 'visual'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            1. Визуальный конспект в PDF
          </button>

          <button
            onClick={() => setActiveTab('original')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
              activeTab === 'original'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            2. Исходный текст параграфов (§3 и §4)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'visual' ? (
            <div className="space-y-5">
              {/* Primary Action Card */}
              <div className="p-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-white to-sky-50/40 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                      Сохранить полный визуальный гид в PDF
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg leading-relaxed">
                      Сохраняет весь интерактивный гид со всеми блоками: 23 терминами, формулами, схемами процессов, строением молекул, ассоциациями и таблицами сравнения.
                    </p>
                  </div>

                  <button
                    onClick={handlePrintVisualGuide}
                    className="shrink-0 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-sm shadow-md flex items-center justify-center gap-2.5 transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    Сохранить в PDF
                  </button>
                </div>

                {/* Print instructions */}
                <div className="mt-5 pt-4 border-t border-indigo-100/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/80 border border-indigo-100/60">
                    <div className="font-bold text-slate-900 mb-1">1. Нажмите кнопку</div>
                    <div className="text-slate-600">Откроется стандартное системное окно печати браузера.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-indigo-100/60">
                    <div className="font-bold text-slate-900 mb-1">2. Выберите цель</div>
                    <div className="text-slate-600">В пункте «Принтер» выберите <strong>«Сохранить как PDF»</strong>.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="font-bold text-amber-900 mb-1">3. Важно для цвета! 🎨</div>
                    <div className="text-amber-800">
                      В «Дополнительных настройках» включите галочку <strong>«Фоновые рисунки» (Background graphics)</strong>, чтобы сохранить яркие цвета!
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-indigo-100/60">
                    <div className="font-bold text-slate-900 mb-1">4. Сохраните файл</div>
                    <div className="text-slate-600">Нажмите «Сохранить» — готовый красочный векторный PDF будет на вашем устройстве!</div>
                  </div>
                </div>
              </div>

              {/* What is guaranteed */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Гарантия полноты и точности материала:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-600">
                  <div className="p-2 rounded-lg bg-white border border-slate-200">✓ Все 23 термина</div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200">✓ Все 10 констант</div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200">✓ Все 6 схем</div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200">✓ 0 сторонней «воды»</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Controls bar for original text */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-100 border border-slate-200">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedParagraph('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedParagraph === 'all'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    § 3 и § 4 вместе
                  </button>
                  <button
                    onClick={() => setSelectedParagraph('section3')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedParagraph === 'section3'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    § 3
                  </button>
                  <button
                    onClick={() => setSelectedParagraph('section4')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedParagraph === 'section4'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    § 4
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDirectPdfDownload}
                    disabled={isGeneratingPdf}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    title="Скачать файл PDF прямо на устройство"
                  >
                    {isGeneratingPdf ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                    )}
                    <span>{isGeneratingPdf ? 'Создание PDF...' : 'Скачать .PDF'}</span>
                  </button>

                  <button
                    onClick={handleCopyText}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Скопировано!' : 'Копировать текст'}
                  </button>

                  <button
                    onClick={() => downloadTextFile('txt')}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <FileDown className="w-3.5 h-3.5 text-indigo-600" />
                    Скачать .TXT
                  </button>

                  <button
                    onClick={() => downloadTextFile('doc')}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <FileDown className="w-3.5 h-3.5 text-sky-600" />
                    Скачать .DOC
                  </button>

                  <button
                    onClick={openAndPrintOriginalText}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Печать
                  </button>
                </div>
              </div>

              {/* Text viewer */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 max-h-96 overflow-y-auto">
                {originalTextbookData
                  .filter((p) => selectedParagraph === 'all' || p.id === selectedParagraph)
                  .map((p) => (
                    <div key={p.id} className="mb-8 last:mb-0">
                      <h4 className="text-base font-black text-indigo-950 pb-2 border-b border-slate-200 mb-3">
                        {p.number}. {p.title}
                      </h4>
                      <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                        {p.plainText}
                      </pre>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Основано исключительно на тексте параграфов § 3 и § 4.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition-all"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
