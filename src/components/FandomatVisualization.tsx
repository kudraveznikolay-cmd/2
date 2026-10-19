import { MachineState } from '../App';

interface FandomatVisualizationProps {
  state: MachineState;
  isRunning: boolean;
}

export default function FandomatVisualization({ state, isRunning }: FandomatVisualizationProps) {
  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-700/50 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
          Схема работы фандомата
        </h3>
        
        {/* Machine SVG Visualization */}
        <div className="relative w-full h-80 md:h-96">
          <svg viewBox="0 0 800 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Input Conveyor */}
            <g>
              <rect x="20" y="180" width="180" height="40" rx="5" fill="#374151" stroke="#4B5563" strokeWidth="2"/>
              <text x="110" y="170" textAnchor="middle" fill="#9CA3AF" fontSize="11">Входной конвейер</text>
              {/* Eggs on conveyor */}
              {[0, 1, 2, 3, 4].map(i => (
                <ellipse
                  key={`egg-input-${i}`}
                  cx={50 + i * 30}
                  cy="195"
                  rx="10"
                  ry="13"
                  fill={state === 'loading' || state === 'forming' ? '#FDE68A' : '#D4D4D8'}
                  className={isRunning ? 'animate-pulse' : ''}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
              {/* Conveyor belt lines */}
              {[0, 1, 2, 3, 4, 5, 6].map(i => (
                <line
                  key={`belt-${i}`}
                  x1={30 + i * 25}
                  y1="220"
                  x2={30 + i * 25}
                  y2="220"
                  stroke="#6B7280"
                  strokeWidth="2"
                  className={isRunning ? '' : ''}
                >
                  {isRunning && (
                    <animate attributeName="x1" values={`${30 + i * 25};${55 + i * 25};${30 + i * 25}`} dur="1s" repeatCount="indefinite"/>
                  )}
                </line>
              ))}
            </g>

            {/* Forming Station */}
            <g>
              <rect x="220" y="120" width="140" height="160" rx="10" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="2" opacity="0.8"/>
              <text x="290" y="110" textAnchor="middle" fill="#60A5FA" fontSize="11" fontWeight="bold">Формовка</text>
              
              {/* Forming press animation */}
              <rect
                x="240"
                y="140"
                width="100"
                height={state === 'forming' ? "30" : "20"}
                rx="3"
                fill="#3B82F6"
                className="transition-all duration-500"
              >
                {isRunning && state === 'forming' && (
                  <animate attributeName="height" values="20;40;20" dur="1.5s" repeatCount="indefinite"/>
                )}
              </rect>
              
              {/* Mold tray */}
              <rect x="240" y="230" width="100" height="30" rx="5" fill="#1E40AF" stroke="#60A5FA" strokeWidth="1"/>
              {[0, 1, 2, 3, 4].map(i => (
                <circle
                  key={`mold-${i}`}
                  cx={255 + i * 20}
                  cy="245"
                  r="7"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1"
                  opacity={state === 'forming' ? 1 : 0.3}
                />
              ))}
              
              {/* Pressure indicator */}
              {state === 'forming' && (
                <g>
                  <text x="290" y="200" textAnchor="middle" fill="#FBBF24" fontSize="10">⚡ Давление</text>
                  <rect x="250" y="205" width="80" height="6" rx="3" fill="#374151"/>
                  <rect x="250" y="205" width="60" height="6" rx="3" fill="#FBBF24">
                    <animate attributeName="width" values="20;80;20" dur="1.5s" repeatCount="indefinite"/>
                  </rect>
                </g>
              )}
            </g>

            {/* Loading Station */}
            <g>
              <rect x="380" y="120" width="140" height="160" rx="10" fill="#1E3A5F" stroke="#10B981" strokeWidth="2" opacity="0.8"/>
              <text x="450" y="110" textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="bold">Загрузка яиц</text>
              
              {/* Vacuum arm */}
              <line x1="450" y1="140" x2="450" y2={state === 'loading' ? "200" : "160"} stroke="#6B7280" strokeWidth="3" className="transition-all duration-500"/>
              <circle cx="450" cy={state === 'loading' ? "205" : "165"} r="8" fill={state === 'loading' ? "#10B981" : "#4B5563"} className="transition-all duration-500"/>
              
              {/* Eggs in tray */}
              {[0, 1, 2, 3, 4].map(i => (
                <ellipse
                  key={`egg-tray-${i}`}
                  cx={410 + i * 20}
                  cy="250"
                  rx="8"
                  ry="10"
                  fill={state === 'loading' && i < 3 ? '#FDE68A' : state === 'sealing' || state === 'output' || state === 'complete' ? '#FDE68A' : 'transparent'}
                  className="transition-all duration-300"
                  style={{ transitionDelay: `${i * 200}ms` }}
                />
              ))}
              
              {/* Tray outline */}
              <rect x="400" y="235" width="100" height="35" rx="5" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="4 2"/>
            </g>

            {/* Sealing Station */}
            <g>
              <rect x="540" y="120" width="120" height="160" rx="10" fill="#1E3A5F" stroke="#8B5CF6" strokeWidth="2" opacity="0.8"/>
              <text x="600" y="110" textAnchor="middle" fill="#A78BFA" fontSize="11" fontWeight="bold">Закрытие</text>
              
              {/* Lid animation */}
              <rect
                x="555"
                y={state === 'sealing' ? "230" : "180"}
                width="90"
                height="10"
                rx="3"
                fill="#8B5CF6"
                className="transition-all duration-700"
              />
              
              {/* Package */}
              <rect x="560" y="240" width="80" height="30" rx="5" 
                fill={state === 'sealing' || state === 'output' || state === 'complete' ? '#7C3AED' : '#374151'}
                stroke="#A78BFA"
                strokeWidth="1"
                className="transition-all duration-500"
              />
              
              {/* Label */}
              {(state === 'sealing' || state === 'output' || state === 'complete') && (
                <g>
                  <rect x="570" y="248" width="60" height="15" rx="2" fill="#1F2937"/>
                  <text x="600" y="259" textAnchor="middle" fill="#A78BFA" fontSize="7">С1 • 30 шт</text>
                </g>
              )}
            </g>

            {/* Output Conveyor */}
            <g>
              <rect x="680" y="180" width="100" height="40" rx="5" fill="#374151" stroke="#4B5563" strokeWidth="2"/>
              <text x="730" y="170" textAnchor="middle" fill="#9CA3AF" fontSize="11">Выход</text>
              
              {/* Output packages */}
              {(state === 'output' || state === 'complete') && (
                <g>
                  <rect x="695" y="188" width="30" height="25" rx="3" fill="#7C3AED" stroke="#A78BFA" strokeWidth="1">
                    {isRunning && (
                      <animate attributeName="x" values="695;750;695" dur="2s" repeatCount="indefinite"/>
                    )}
                  </rect>
                  <rect x="730" y="188" width="30" height="25" rx="3" fill="#7C3AED" stroke="#A78BFA" strokeWidth="1" opacity="0.6"/>
                </g>
              )}
            </g>

            {/* Connection arrows */}
            <g fill="none" stroke="#4B5563" strokeWidth="2" strokeDasharray="5 3">
              <line x1="200" y1="200" x2="220" y2="200">
                {isRunning && <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/>}
              </line>
              <line x1="360" y1="200" x2="380" y2="200">
                {isRunning && <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/>}
              </line>
              <line x1="520" y1="200" x2="540" y2="200">
                {isRunning && <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/>}
              </line>
              <line x1="660" y1="200" x2="680" y2="200">
                {isRunning && <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/>}
              </line>
            </g>

            {/* Active step highlight */}
            {state === 'forming' && (
              <rect x="218" y="118" width="144" height="164" rx="12" fill="none" stroke="#3B82F6" strokeWidth="3" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
              </rect>
            )}
            {state === 'loading' && (
              <rect x="378" y="118" width="144" height="164" rx="12" fill="none" stroke="#10B981" strokeWidth="3" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
              </rect>
            )}
            {state === 'sealing' && (
              <rect x="538" y="118" width="124" height="164" rx="12" fill="none" stroke="#8B5CF6" strokeWidth="3" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
              </rect>
            )}
            {state === 'output' && (
              <rect x="678" y="178" width="104" height="44" rx="7" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
              </rect>
            )}

            {/* Status indicator */}
            <circle cx="400" cy="360" r="8" fill={isRunning ? '#10B981' : '#6B7280'}>
              {isRunning && <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite"/>}
            </circle>
            <text x="415" y="365" fill="#9CA3AF" fontSize="12">
              {isRunning ? 'Работает' : 'Остановлен'}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-3 h-3 rounded-full bg-blue-500"/>
            <span>Формовка</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-3 h-3 rounded-full bg-green-500"/>
            <span>Загрузка</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-3 h-3 rounded-full bg-purple-500"/>
            <span>Закрытие</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-3 h-3 rounded-full bg-amber-400"/>
            <span>Яйца</span>
          </div>
        </div>
      </div>
    </div>
  );
}
