import { useState, useEffect, useCallback } from 'react';
import FandomatVisualization from './components/FandomatVisualization';
import StepInfo from './components/StepInfo';
import ControlPanel from './components/ControlPanel';
import InfoPanel from './components/InfoPanel';
import Header from './components/Header';

export type MachineState = 'idle' | 'forming' | 'loading' | 'sealing' | 'output' | 'complete';

const STEPS: { state: MachineState; title: string; description: string; icon: string }[] = [
  {
    state: 'idle',
    title: 'Ожидание',
    description: 'Фандомат готов к работе. Сырьё (целлюлозная масса) загружено в бункер. Яйца поданы на входной конвейер.',
    icon: '⏳'
  },
  {
    state: 'forming',
    title: 'Формовка лотка',
    description: 'Целлюлозная масса подаётся в формовочную матрицу. Под давлением и температурой формируется лоток (фандом) на 10 или 30 яиц.',
    icon: '🔧'
  },
  {
    state: 'loading',
    title: 'Загрузка яиц',
    description: 'Вакуумные присоски захватывают яйца с входного конвейера и аккуратно размещают их в ячейки сформованного лотка. Датчики контролируют целостность.',
    icon: '🥚'
  },
  {
    state: 'sealing',
    title: 'Закрытие упаковки',
    description: 'Крышка лотка закрывается и фиксируется замковыми соединениями. Происходит маркировка — нанесение даты, категории и штрих-кода.',
    icon: '📦'
  },
  {
    state: 'output',
    title: 'Выход готовой продукции',
    description: 'Готовая упаковка перемещается на выходной конвейер. Система паллетирования укладывает лотки в транспортную тару.',
    icon: '🏭'
  },
  {
    state: 'complete',
    title: 'Цикл завершён',
    description: 'Одна упаковка готова! Фандомат может производить до 6000 яиц в час (200 лотков/час). Готов к следующему циклу.',
    icon: '✅'
  }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [cycleCount, setCycleCount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const machineState = STEPS[currentStep].state;

  const nextStep = useCallback(() => {
    setCurrentStep(prev => {
      if (prev >= STEPS.length - 1) {
        setCycleCount(c => c + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      nextStep();
    }, 2000 / speed);
    return () => clearInterval(interval);
  }, [isRunning, speed, nextStep]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
  };
  const handleStepForward = () => {
    setIsRunning(false);
    nextStep();
  };
  const handleStepBack = () => {
    setIsRunning(false);
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <Header onInfoClick={() => setShowInfo(!showInfo)} />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Progress Bar */}
        <div className="bg-slate-800/50 rounded-2xl p-4 backdrop-blur-sm border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-400">Прогресс цикла</span>
            <span className="text-sm text-blue-400 font-mono">
              Шаг {currentStep + 1} / {STEPS.length}
            </span>
          </div>
          <div className="flex gap-1">
            {STEPS.map((step, idx) => (
              <button
                key={step.state}
                onClick={() => { setIsRunning(false); setCurrentStep(idx); }}
                className={`flex-1 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-y-150 ${
                  idx < currentStep ? 'bg-green-500' :
                  idx === currentStep ? 'bg-blue-500 shadow-lg shadow-blue-500/50' :
                  'bg-slate-700'
                }`}
                title={step.title}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((step, idx) => (
              <span key={step.state} className={`text-xs hidden md:block ${
                idx === currentStep ? 'text-blue-400 font-bold' : 'text-slate-500'
              }`}>
                {step.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Main Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FandomatVisualization state={machineState} isRunning={isRunning} />
          </div>
          <div className="space-y-4">
            <StepInfo step={STEPS[currentStep]} stepIndex={currentStep} />
            <ControlPanel
              isRunning={isRunning}
              speed={speed}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onStepForward={handleStepForward}
              onStepBack={handleStepBack}
              onSpeedChange={setSpeed}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-green-400">{cycleCount}</div>
            <div className="text-xs text-slate-400 mt-1">Циклов завершено</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-blue-400">{cycleCount * 30}</div>
            <div className="text-xs text-slate-400 mt-1">Яиц упаковано</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-purple-400">{speed}x</div>
            <div className="text-xs text-slate-400 mt-1">Скорость</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-amber-400">6000</div>
            <div className="text-xs text-slate-400 mt-1">Яиц/час (макс.)</div>
          </div>
        </div>
      </main>

      {/* Info Modal */}
      {showInfo && <InfoPanel onClose={() => setShowInfo(false)} />}
    </div>
  );
}
