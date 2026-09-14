import React, { useState } from 'react';
import { Beaker, Flame, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export const BenedictLabSimulator: React.FC = () => {
  const [selectedSugar, setSelectedSugar] = useState<'glucose' | 'fructose' | 'lactose' | 'sucrose_raw' | 'sucrose_hydrolyzed'>('glucose');
  const [isHeated, setIsHeated] = useState<boolean>(false);
  const [isHeating, setIsHeating] = useState<boolean>(false);

  const getSugarData = () => {
    switch (selectedSugar) {
      case 'glucose':
        return {
          name: 'Глюкоза (C₆H₁₂O₆)',
          type: 'Моносахарид (Редуцирующий)',
          electrons: 'Имеются свободные электроны для отдачи',
          resultColor: 'bg-red-600',
          textColor: 'text-red-700',
          resultName: 'Кирпично-красный осадок оксида меди (I) [Cu₂O]',
          explanation: 'Положительная реакция! Альдегидная группа глюкозы отдала электроны, восстановив Cu²⁺ до Cu⁺ (Cu₂O↓).',
          isPositive: true,
        };
      case 'fructose':
        return {
          name: 'Фруктоза',
          type: 'Моносахарид (Редуцирующий)',
          electrons: 'Имеются свободные электроны',
          resultColor: 'bg-red-600',
          textColor: 'text-red-700',
          resultName: 'Кирпично-красный осадок Cu₂O',
          explanation: 'Положительная реакция! Все моносахариды по PDF являются редуцирующими сахарами.',
          isPositive: true,
        };
      case 'lactose':
        return {
          name: 'Лактоза (Молочный сахар)',
          type: 'Дисахарид (Редуцирующий)',
          electrons: 'Имеются свободные электроны (большинство дисахаридов)',
          resultColor: 'bg-red-600',
          textColor: 'text-red-700',
          resultName: 'Кирпично-красный осадок Cu₂O',
          explanation: 'Положительная реакция! Лактоза — редуцирующий дисахарид из галактозы и глюкозы.',
          isPositive: true,
        };
      case 'sucrose_raw':
        return {
          name: 'Сахароза БЕЗ гидролиза (C₁₂H₂₂O₁₁)',
          type: 'Дисахарид (Нередуцирующий сахар)',
          electrons: '0 свободных электронов! Структура колец замкнута',
          resultColor: 'bg-blue-600',
          textColor: 'text-blue-700',
          resultName: 'Остается синим (Отрицательный результат)',
          explanation: 'Отрицательный результат! У сахарозы замкнутая структура, 0 свободных электронов для отдачи. Тест Бенедикта не идет!',
          isPositive: false,
        };
      case 'sucrose_hydrolyzed':
        return {
          name: 'Сахароза ПОСЛЕ гидролиза (Подкисление / Нагрев)',
          type: 'Расщеплена на Глюкозу + Фруктозу',
          electrons: 'Связи разорваны → освободились реакционные центры',
          resultColor: 'bg-red-600',
          textColor: 'text-red-700',
          resultName: 'Кирпично-красный осадок Cu₂O',
          explanation: 'Положительная реакция! Подкисление или нагрев вызвали гидролиз сахарозы, сделав её редуцирующей!',
          isPositive: true,
        };
    }
  };

  const sugar = getSugarData();

  const handleHeat = () => {
    setIsHeating(true);
    setTimeout(() => {
      setIsHeating(false);
      setIsHeated(true);
    }, 800);
  };

  const handleReset = () => {
    setIsHeated(false);
    setIsHeating(false);
  };

  return (
    <div className="p-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/40 shadow-sm my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-2xs">
            <Beaker className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Визуальная лаборатория: Проба Бенедикта (2 капли)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Проверьте реакцию разных сахаров при добавлении реактива Бенедикта и нагревании
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Сбросить опыт
        </button>
      </div>

      {/* Select sample */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Выберите исследуемый сахар:
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'glucose', label: 'Глюкоза' },
            { id: 'fructose', label: 'Фруктоза' },
            { id: 'lactose', label: 'Лактоза' },
            { id: 'sucrose_raw', label: 'Сахароза (без гидролиза)' },
            { id: 'sucrose_hydrolyzed', label: 'Сахароза + Кислота (гидролиз)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedSugar(item.id as any);
                setIsHeated(false);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                selectedSugar === item.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lab tube display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center p-5 rounded-xl bg-white border border-slate-200">
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 mb-3">
            Пробирка с 2 каплями Бенедикта
          </div>

          {/* Test Tube Graphic */}
          <div className="relative w-16 h-40 border-4 border-slate-300 rounded-b-full bg-slate-100 overflow-hidden flex flex-col justify-end p-1 shadow-inner">
            <div
              className={`w-full transition-all duration-700 rounded-b-full ${
                isHeated
                  ? sugar.resultColor
                  : 'bg-blue-600'
              } ${isHeating ? 'animate-pulse' : ''}`}
              style={{ height: isHeated ? '65%' : '55%' }}
            >
              <div className="w-full h-full opacity-30 bg-white/20"></div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span
              className={`inline-block px-2.5 py-1 rounded-full text-xs font-extrabold ${
                isHeated
                  ? sugar.isPositive
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
            >
              {isHeated ? (sugar.isPositive ? 'Кирпично-красный Cu₂O↓' : 'Остался синим (–)') : 'Исходный раствор (Синий)'}
            </span>
          </div>
        </div>

        <div className="md:col-span-8 space-y-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Исследуемый образец
            </div>
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
              {sugar.name}
            </h4>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">
              Тип: {sugar.type} | Электроны: <span className="text-slate-900 font-bold">{sugar.electrons}</span>
            </div>
          </div>

          {!isHeated ? (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
              Раствор сульфата меди (II) / реактива Бенедикта добавлен (2 капли). Исходный цвет раствора — <span className="text-blue-700 font-bold">ярко-синий</span>. Нажмите кнопку ниже для проведения нагревания.
            </div>
          ) : (
            <div className={`p-4 rounded-xl border ${sugar.isPositive ? 'bg-rose-50 border-rose-200' : 'bg-blue-50 border-blue-200'}`}>
              <div className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-700">
                Результат реакции после нагревания:
              </div>
              <div className={`text-sm font-bold ${sugar.textColor}`}>
                {sugar.resultName}
              </div>
              <p className="text-xs mt-1.5 text-slate-700 font-medium leading-relaxed">
                {sugar.explanation}
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleHeat}
              disabled={isHeating || isHeated}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-xs ${
                isHeated
                  ? 'bg-slate-400 cursor-not-allowed opacity-60'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              {isHeating ? 'Идет нагревание на спиртовке...' : isHeated ? 'Опыт завершен' : 'Нагреть пробирку на огне'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
