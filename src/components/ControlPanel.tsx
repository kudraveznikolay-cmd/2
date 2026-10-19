interface ControlPanelProps {
  isRunning: boolean;
  speed: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function ControlPanel({
  isRunning,
  speed,
  onStart,
  onPause,
  onReset,
  onStepForward,
  onStepBack,
  onSpeedChange,
}: ControlPanelProps) {
  return (
    <div className="bg-slate-800/50 rounded-2xl p-5 backdrop-blur-sm border border-slate-700/50">
      <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
        Управление
      </h3>

      {/* Main controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={onStepBack}
          disabled={isRunning}
          className="flex-1 py-3 px-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all text-sm"
        >
          ◀
        </button>
        {isRunning ? (
          <button
            onClick={onPause}
            className="flex-[2] py-3 px-4 bg-amber-600 hover:bg-amber-500 rounded-xl text-white font-bold transition-all text-sm shadow-lg shadow-amber-600/20"
          >
            ⏸ Пауза
          </button>
        ) : (
          <button
            onClick={onStart}
            className="flex-[2] py-3 px-4 bg-green-600 hover:bg-green-500 rounded-xl text-white font-bold transition-all text-sm shadow-lg shadow-green-600/20"
          >
            ▶ Запуск
          </button>
        )}
        <button
          onClick={onStepForward}
          disabled={isRunning}
          className="flex-1 py-3 px-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all text-sm"
        >
          ▶
        </button>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full py-2 px-4 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded-xl text-red-300 text-sm transition-all mb-4"
      >
        ↺ Сброс
      </button>

      {/* Speed control */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Скорость анимации</span>
          <span className="text-xs text-blue-400 font-mono">{speed}x</span>
        </div>
        <div className="flex gap-1">
          {[0.5, 1, 2, 3].map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                speed === s
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="mt-4 pt-3 border-t border-slate-700/50">
        <p className="text-xs text-slate-500 text-center">
          Нажмите на этапы в прогресс-баре для перехода
        </p>
      </div>
    </div>
  );
}
