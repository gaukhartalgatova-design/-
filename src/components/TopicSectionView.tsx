import React from 'react';
import { TopicSection } from '../types';
import { ExplanationBlock } from './ExplanationBlock';
import { TermCard } from './TermCard';
import { RememberCard } from './RememberCard';
import { ComparisonView } from './ComparisonView';
import { ProcessViewer } from './ProcessViewer';
import { StructureCard } from './StructureCard';
import { ClassificationTree } from './ClassificationTree';
import { ConnectionChain } from './ConnectionChain';
import { AssociationCard } from './AssociationCard';
import { BiologyMemeCard } from './BiologyMemeCard';
import { KeyNumberCard } from './KeyNumberCard';
import { SummaryBlock } from './SummaryBlock';
import { BenedictLabSimulator } from './BenedictLabSimulator';
import { BookOpen, Sparkles } from 'lucide-react';

interface Props {
  topic: TopicSection;
  searchQuery: string;
  activeFilter: string;
}

export const TopicSectionView: React.FC<Props> = ({
  topic,
  searchQuery,
  activeFilter,
}) => {
  const query = searchQuery.trim().toLowerCase();

  // Filter helpers
  const matchesSearch = (text: string) => {
    if (!query) return true;
    return text.toLowerCase().includes(query);
  };

  const filteredExplanations = topic.explanations.filter(
    (exp) =>
      matchesSearch(exp.title) ||
      matchesSearch(exp.simpleText) ||
      exp.bulletPoints.some((p) => matchesSearch(p))
  );

  const filteredTerms = topic.keyTerms.filter(
    (term) =>
      matchesSearch(term.term) ||
      matchesSearch(term.shortExplanation) ||
      (term.formula && matchesSearch(term.formula)) ||
      term.tags.some((t) => matchesSearch(t))
  );

  const filteredRemember = topic.rememberFacts.filter(
    (rem) =>
      matchesSearch(rem.title) ||
      matchesSearch(rem.fact) ||
      (rem.badge && matchesSearch(rem.badge))
  );

  const filteredComparisons = topic.comparisons.filter(
    (comp) =>
      matchesSearch(comp.title) ||
      matchesSearch(comp.nameA) ||
      matchesSearch(comp.nameB) ||
      matchesSearch(comp.keyTakeaway)
  );

  const filteredProcesses = topic.processes.filter(
    (proc) =>
      matchesSearch(proc.title) ||
      matchesSearch(proc.result) ||
      (proc.formulaOrSummary && matchesSearch(proc.formulaOrSummary)) ||
      proc.stages.some((s) => matchesSearch(s.title) || matchesSearch(s.description))
  );

  const filteredStructures = topic.structures.filter(
    (st) =>
      matchesSearch(st.part) ||
      matchesSearch(st.characteristic) ||
      matchesSearch(st.function) ||
      (st.formula && matchesSearch(st.formula))
  );

  const filteredClassifications = topic.classifications.filter(
    (cl) =>
      matchesSearch(cl.title) ||
      (cl.description && matchesSearch(cl.description)) ||
      cl.children?.some(
        (c) =>
          matchesSearch(c.name) ||
          matchesSearch(c.details) ||
          c.examples?.some((e) => matchesSearch(e))
      )
  );

  const filteredConnections = topic.connections.filter(
    (conn) =>
      matchesSearch(conn.from) ||
      matchesSearch(conn.to) ||
      matchesSearch(conn.verb) ||
      (conn.note && matchesSearch(conn.note))
  );

  const filteredAssociations = topic.associations.filter(
    (assoc) =>
      matchesSearch(assoc.term) ||
      matchesSearch(assoc.association) ||
      matchesSearch(assoc.explanation)
  );

  const filteredMemes = topic.memes.filter(
    (meme) =>
      matchesSearch(meme.title) ||
      matchesSearch(meme.character) ||
      matchesSearch(meme.scenario) ||
      matchesSearch(meme.quote) ||
      matchesSearch(meme.punchline) ||
      matchesSearch(meme.memoryHook)
  );

  const filteredNumbers = topic.numbers.filter(
    (num) =>
      matchesSearch(num.value) ||
      matchesSearch(num.unit) ||
      matchesSearch(num.context) ||
      matchesSearch(num.importance)
  );

  const filteredTakeaways = topic.mainTakeaways.filter((t) => matchesSearch(t));

  // Determine visibility by activeFilter
  const showAll = activeFilter === 'all';
  const showExplanations = (showAll || activeFilter === 'explanations') && filteredExplanations.length > 0;
  const showTerms = (showAll || activeFilter === 'terms') && filteredTerms.length > 0;
  const showRemember = (showAll || activeFilter === 'remember') && filteredRemember.length > 0;
  const showComparisons = (showAll || activeFilter === 'comparisons') && filteredComparisons.length > 0;
  const showProcesses = (showAll || activeFilter === 'processes') && filteredProcesses.length > 0;
  const showStructures = (showAll || activeFilter === 'structures') && filteredStructures.length > 0;
  const showClassifications = (showAll || activeFilter === 'classifications') && filteredClassifications.length > 0;
  const showConnections = (showAll || activeFilter === 'connections') && filteredConnections.length > 0;
  const showAssociations = (showAll || activeFilter === 'associations') && filteredAssociations.length > 0;
  const showMemes = (showAll || activeFilter === 'memes') && filteredMemes.length > 0;
  const showNumbers = (showAll || activeFilter === 'numbers') && filteredNumbers.length > 0;
  const showSummary = (showAll || activeFilter === 'summary') && filteredTakeaways.length > 0;

  return (
    <section className="mb-16 pt-4">
      {/* Topic Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-600 text-white shadow-2xs">
            {topic.badge}
          </span>
          <span className="text-xs font-bold text-slate-400">
            Учебный раздел биологии
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          {topic.title}
        </h2>

        <p className="text-sm sm:text-base font-semibold text-slate-600 mb-2">
          {topic.subtitle}
        </p>

        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-4xl leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* 1. 🧠 ПОНЯТНОЕ ОБЪЯСНЕНИЕ */}
      {showExplanations && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              🧠 ПОНЯТНОЕ ОБЪЯСНЕНИЕ
            </h3>
            <span className="text-xs font-bold text-slate-400">
              (Суть темы простыми словами)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredExplanations.map((exp, idx) => (
              <ExplanationBlock key={idx} explanation={exp} />
            ))}
          </div>
        </div>
      )}

      {/* 2. 🔑 КЛЮЧЕВОЙ ТЕРМИН */}
      {showTerms && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              🔑 КЛЮЧЕВЫЕ ТЕРМИНЫ
            </h3>
            <span className="text-xs font-bold text-slate-400">
              ({filteredTerms.length} терминов с определениями)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTerms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        </div>
      )}

      {/* 3. 🔢 ВАЖНЫЕ ЦИФРЫ (🔢 ЗАПОМНИ ЧИСЛО) */}
      {showNumbers && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              🔢 ВАЖНЫЕ ЦИФРЫ — ЗАПОМНИ ЧИСЛО
            </h3>
            <span className="text-xs font-bold text-slate-400">
              (Точные константы, проценты, температуры и объемы)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredNumbers.map((num) => (
              <KeyNumberCard key={num.id} item={num} />
            ))}
          </div>
        </div>
      )}

      {/* 4. ⭐ ЗАПОМНИ */}
      {showRemember && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              ⭐ ЗАПОМНИ
            </h3>
            <span className="text-xs font-bold text-slate-400">
              (Самые критически важные факты раздела)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRemember.map((fact) => (
              <RememberCard key={fact.id} fact={fact} />
            ))}
          </div>
        </div>
      )}

      {/* 5. ⚡ НЕ ПЕРЕПУТАЙ */}
      {showComparisons && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              ⚡ НЕ ПЕРЕПУТАЙ
            </h3>
            <span className="text-xs font-bold text-slate-400">
              (Сравнение понятий рядом с четкими отличиями)
            </span>
          </div>
          <div className="space-y-4">
            {filteredComparisons.map((comp) => (
              <ComparisonView key={comp.id} comparison={comp} />
            ))}
          </div>
        </div>
      )}

      {/* Interactive Benedict Lab Simulator for Section 4 */}
      {topic.id === 'section4' && (showAll || activeFilter === 'processes') && (
        <div className="mb-10">
          <BenedictLabSimulator />
        </div>
      )}

      {/* 6. 🔬 ПРОЦЕССЫ */}
      {showProcesses && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              🔬 ПРОЦЕССЫ В СХЕМАХ
            </h3>
            <span className="text-xs font-bold text-slate-400">
              (Этап 1 → Этап 2 → Этап 3 и Причина → Следствие)
            </span>
          </div>
          <div className="space-y-4">
            {filteredProcesses.map((proc) => (
              <ProcessViewer key={proc.id} process={proc} />
            ))}
          </div>
        </div>
      )}

      {/* 7. 🧬 СТРОЕНИЕ */}
      {showStructures && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              🧬 СТРОЕНИЕ МОЛЕКУЛ
            </h3>
            <span className="text-xs font-bold text-slate-400">
              (Часть → Характеристика → Функция)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStructures.map((st) => (
              <StructureCard key={st.id} item={st} />
            ))}
          </div>
        </div>
      )}

      {/* 8. 📊 КЛАССИФИКАЦИИ */}
      {showClassifications && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              📊 СТРУКТУРНЫЕ КЛАССИФИКАЦИИ
            </h3>
            <span className="text-xs font-bold text-slate-400">
              (Наглядные деревья групп и представителей)
            </span>
          </div>
          <div className="space-y-4">
            {filteredClassifications.map((cl, idx) => (
              <ClassificationTree key={idx} node={cl} />
            ))}
          </div>
        </div>
      )}

      {/* 9. 🔗 СВЯЗИ МЕЖДУ ПОНЯТИЯМИ */}
      {showConnections && (
        <div className="mb-10">
          <ConnectionChain connections={filteredConnections} />
        </div>
      )}

      {/* 10. 🧠 АССОЦИАЦИИ */}
      {showAssociations && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              🧠 АССОЦИАЦИИ ДЛЯ ЗАПОМИНАНИЯ
            </h3>
            <span className="text-xs font-bold text-slate-400">
              (Ключ → Метафора → Простое объяснение)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssociations.map((assoc) => (
              <AssociationCard key={assoc.id} item={assoc} />
            ))}
          </div>
        </div>
      )}

      {/* 11. 😂 БИОЛОГИЧЕСКИЕ МЕМЫ */}
      {showMemes && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              😂 БИОЛОГИЧЕСКИЕ МЕМЫ И МИНИ-СИТУАЦИИ
            </h3>
            <span className="text-xs font-bold text-slate-400">
              (Котики, рыцари-бактерии и юмор, закрепляющий факты)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMemes.map((meme) => (
              <BiologyMemeCard key={meme.id} meme={meme} />
            ))}
          </div>
        </div>
      )}

      {/* 12. 🔥 ГЛАВНОЕ */}
      {showSummary && (
        <SummaryBlock
          takeaways={filteredTakeaways}
          topicTitle={topic.title}
        />
      )}
    </section>
  );
};
