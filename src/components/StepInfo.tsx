import { MachineState } from '../App';

interface StepInfoProps {
  step: { state: MachineState; title: string; description: string; icon: string };
  stepIndex: number;
}

export default function StepInfo({ step, stepIndex }: StepInfoProps) {
  const colors: Record<MachineState, string> = {
    idle: 'from-slate-600 to-slate-700 border-slate-500',
    forming: 'from-blue-900 to-blue-800 border-blue-500',
    loading: 'from-green-900 to-green-800 border-green-500',
    sealing: 'from-purple-900 to-purple-800 border-purple-500',
    output: 'from-amber-900 to-amber-800 border-amber-500',
    complete: 'from-emerald-900 to-emerald-800 border-emerald-500',
  };

  const textColors: Record<MachineState, string> = {
    idle: 'text-slate-300',
    forming: 'text-blue-300',
    loading: 'text-green-300',
    sealing: 'text-purple-300',
    output: 'text-amber-300',
    complete: 'text-emerald-300',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[step.state]} rounded-2xl p-5 border backdrop-blur-sm transition-all duration-500`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{step.icon}</span>
        <div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Этап {stepIndex + 1}</div>
          <h3 className={`text-lg font-bold ${textColors[step.state]}`}>{step.title}</h3>
        </div>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">
        {step.description}
      </p>
      
      {/* Technical details */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-black/20 rounded-lg p-2">
            <div className="text-slate-400">Длительность</div>
            <div className="text-white font-mono">{getDuration(step.state)}</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2">
            <div className="text-slate-400">Температура</div>
            <div className="text-white font-mono">{getTemperature(step.state)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDuration(state: MachineState): string {
  const durations: Record<MachineState, string> = {
    idle: '—',
    forming: '2.5 сек',
    loading: '3.0 сек',
    sealing: '1.5 сек',
    output: '2.0 сек',
    complete: '9.0 сек',
  };
  return durations[state];
}

function getTemperature(state: MachineState): string {
  const temps: Record<MachineState, string> = {
    idle: '20°C',
    forming: '180°C',
    loading: '22°C',
    sealing: '25°C',
    output: '22°C',
    complete: '22°C',
  };
  return temps[state];
}
