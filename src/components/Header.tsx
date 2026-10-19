interface HeaderProps {
  onInfoClick: () => void;
}

export default function Header({ onInfoClick }: HeaderProps) {
  return (
    <header className="bg-slate-800/30 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-amber-500/20">
            🥚
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              ФАНДОМАТ
            </h1>
            <p className="text-xs text-slate-400">Интерактивная демонстрация яичной упаковки</p>
          </div>
        </div>
        <button
          onClick={onInfoClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 rounded-xl text-blue-300 text-sm transition-all hover:scale-105"
        >
          <span>ℹ️</span>
          <span className="hidden sm:inline">О системе</span>
        </button>
      </div>
    </header>
  );
}
