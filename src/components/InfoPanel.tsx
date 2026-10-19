interface InfoPanelProps {
  onClose: () => void;
}

export default function InfoPanel({ onClose }: InfoPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-slate-600/50 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🏭</span> О системе «Фандомат»
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 text-sm text-slate-300">
          <section>
            <h3 className="text-base font-bold text-amber-400 mb-2">Что такое Фандомат?</h3>
            <p>
              <strong>Фандомат</strong> — это автоматическая машина для производства яичной упаковки (лотков, фандомов) 
              из целлюлозной массы и последующего расфасовывания яиц. Название происходит от слова 
              «фандом» (англ. <em>flat pack / punnet</em>) — стандартная упаковка для яиц.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-blue-400 mb-2">Принцип работы</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li><strong>Подготовка сырья</strong> — макулатура размалывается и смешивается с водой до состояния пульпы</li>
              <li><strong>Термоформовка</strong> — целлюлозная масса подаётся в нагретую матрицу, где формируется лоток</li>
              <li><strong>Загрузка яиц</strong> — вакуумные присоски переносят яйца из накопителя в ячейки лотка</li>
              <li><strong>Закрытие и маркировка</strong> — крышка фиксируется, наносится информация о продукте</li>
              <li><strong>Паллетирование</strong> — готовые упаковки укладываются в транспортную тару</li>
            </ol>
          </section>

          <section>
            <h3 className="text-base font-bold text-green-400 mb-2">Технические характеристики</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-xs text-slate-400">Производительность</div>
                <div className="text-white font-bold">до 6 000 яиц/час</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-xs text-slate-400">Формат упаковки</div>
                <div className="text-white font-bold">6, 10, 15, 30 яиц</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-xs text-slate-400">Материал</div>
                <div className="text-white font-bold">Целлюлоза / ПЭТ</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-xs text-slate-400">Температура формовки</div>
                <div className="text-white font-bold">160–200°C</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-xs text-slate-400">Потребление энергии</div>
                <div className="text-white font-bold">15–25 кВт·ч</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-xs text-slate-400">Контроль качества</div>
                <div className="text-white font-bold">Оптические датчики</div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-purple-400 mb-2">Преимущества</h3>
            <ul className="space-y-1 ml-2">
              <li>✅ Экологичность — биоразлагаемая целлюлозная упаковка</li>
              <li>✅ Высокая скорость — полностью автоматический цикл</li>
              <li>✅ Защита продукции — амортизация ударов, вентиляция</li>
              <li>✅ Экономичность — переработка макулатуры как сырьё</li>
              <li>✅ Гибкость — быстрая переналадка на разные форматы</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-rose-400 mb-2">Как пользоваться демонстрацией</h3>
            <ul className="space-y-1 ml-2">
              <li>🎮 Нажмите <strong>«Запуск»</strong> для автоматического проигрывания цикла</li>
              <li>⏯ Используйте <strong>◀ ▶</strong> для пошагового просмотра</li>
              <li>🏎 Регулируйте <strong>скорость</strong> для детального изучения</li>
              <li>📊 Наблюдайте за <strong>анимацией</strong> и подсвечиванием активных этапов</li>
              <li>📈 Счётчик внизу отслеживает количество обработанных циклов</li>
            </ul>
          </section>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold transition-all"
          >
            Понятно, начать работу →
          </button>
        </div>
      </div>
    </div>
  );
}
