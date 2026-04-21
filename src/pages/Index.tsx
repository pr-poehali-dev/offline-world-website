import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Threat {
  id: number;
  icon: string;
  title: string;
  risk: 'critical' | 'high' | 'medium';
  description: string;
  signs: string[];
  howWorks: string;
}

interface Tip {
  id: number;
  icon: string;
  title: string;
  priority: number;
  short: string;
  steps: string[];
}

const threats: Threat[] = [
  {
    id: 1,
    icon: 'Fish',
    title: 'Фишинг',
    risk: 'critical',
    description: 'Поддельные сайты и письма, имитирующие банки, соцсети, госорганы',
    signs: ['Письмо просит срочно перейти по ссылке', 'Адрес сайта отличается на 1 букву', 'Сайт без HTTPS замка', 'Грамматические ошибки в тексте'],
    howWorks: 'Злоумышленник создаёт точную копию доверенного сайта. Вы вводите логин и пароль — и они уходят прямо к мошеннику. Особенно опасен целевой фишинг, когда письмо составлено с учётом ваших личных данных из соцсетей.',
  },
  {
    id: 2,
    icon: 'KeyRound',
    title: 'Брутфорс паролей',
    risk: 'high',
    description: 'Автоматический перебор тысяч паролей за секунды с помощью программ',
    signs: ['Уведомления о попытках входа', 'Вход с неизвестных устройств', 'Аккаунт заблокирован без причины'],
    howWorks: 'Программы перебирают миллионы комбинаций за минуты. Словари паролей содержат все утечки прошлых лет — если вы используете "qwerty123", он будет в первых строках. Простой пароль из 6 символов взламывается за 0.002 секунды.',
  },
  {
    id: 3,
    icon: 'Wifi',
    title: 'Атака через Wi-Fi',
    risk: 'high',
    description: 'Перехват данных в публичных и незащищённых сетях',
    signs: ['Вы используете публичный Wi-Fi', 'Сайты без HTTPS', 'Медленное соединение'],
    howWorks: 'В кафе или аэропорту злоумышленник создаёт точку доступа с названием "Free_WiFi". Вы подключаетесь — и весь ваш трафик проходит через его устройство. Он может читать переписку, перехватывать пароли, подделывать страницы.',
  },
  {
    id: 4,
    icon: 'Database',
    title: 'Утечка базы данных',
    risk: 'medium',
    description: 'Взлом сервисов, где хранятся ваши данные',
    signs: ['Пришло уведомление об утечке', 'Странные письма от имени сервиса', 'Проверка на haveibeenpwned.com'],
    howWorks: 'Каждый год взламывают крупные сервисы: Dropbox, LinkedIn, Adobe. Базы с миллионами паролей продают на чёрном рынке. Если вы использовали один пароль на нескольких сайтах — злоумышленник проверит его везде.',
  },
  {
    id: 5,
    icon: 'Smartphone',
    title: 'SIM-свопинг',
    risk: 'critical',
    description: 'Мошенники перевыпускают вашу SIM-карту и перехватывают SMS-коды',
    signs: ['Телефон потерял сигнал сети', 'Не приходят SMS', 'Звонок от "оператора"'],
    howWorks: 'Мошенник звонит оператору связи, представляется вами и просит перевыпустить SIM. Получив новую карту, он получает все ваши SMS — в том числе коды двухфакторной аутентификации. Так угоняют криптокошельки и банковские аккаунты.',
  },
  {
    id: 6,
    icon: 'Eye',
    title: 'Социальная инженерия',
    risk: 'high',
    description: 'Психологические манипуляции для получения данных',
    signs: ['Незнакомец знает много о вас', 'Просят "подтвердить" данные', 'Создают срочность или страх'],
    howWorks: 'Злоумышленник звонит и говорит: "Ваш аккаунт взломан, срочно продиктуйте код из SMS". Это и есть код для входа. Люди называют его из страха — и теряют доступ к аккаунту. Никакая компания никогда не просит коды из SMS.',
  },
];

const tips: Tip[] = [
  {
    id: 1,
    icon: 'ShieldCheck',
    title: 'Двухфакторная аутентификация',
    priority: 1,
    short: 'Делает взлом почти невозможным даже при утечке пароля',
    steps: [
      'Установите приложение: Google Authenticator или Яндекс Ключ',
      'Включите 2FA в настройках каждого важного аккаунта',
      'Предпочитайте приложение-аутентификатор, а не SMS',
      'Сохраните резервные коды в безопасном месте',
    ],
  },
  {
    id: 2,
    icon: 'Lock',
    title: 'Надёжные уникальные пароли',
    priority: 2,
    short: 'Разные пароли на каждом сайте — если взломают один, остальные в безопасности',
    steps: [
      'Используйте менеджер паролей: Bitwarden (бесплатный), 1Password',
      'Пароль — минимум 16 символов, буквы + цифры + символы',
      'Никогда не повторяйте пароли на разных сайтах',
      'Раз в год меняйте пароли от критичных аккаунтов',
    ],
  },
  {
    id: 3,
    icon: 'Search',
    title: 'Проверка ссылок и сайтов',
    priority: 3,
    short: 'Перед вводом данных всегда проверяйте адрес сайта',
    steps: [
      'Смотрите на адрес: google.com, не g00gle.com',
      'HTTPS и значок замка — обязательно',
      'Не переходите по ссылкам из писем — вводите адрес вручную',
      'Используйте расширение uBlock Origin для блокировки фишинга',
    ],
  },
  {
    id: 4,
    icon: 'RefreshCw',
    title: 'Обновления и патчи',
    priority: 4,
    short: '60% взломов происходит через уязвимости в устаревшем ПО',
    steps: [
      'Включите автообновления системы и приложений',
      'Обновляйте браузер — в нём исправляют дыры безопасности',
      'Удаляйте приложения, которыми не пользуетесь',
      'Не откладывайте обновления "на потом"',
    ],
  },
  {
    id: 5,
    icon: 'Wifi',
    title: 'Безопасность сетей',
    priority: 5,
    short: 'Публичный Wi-Fi — опасная зона для паролей и данных',
    steps: [
      'Используйте VPN в публичных сетях (ProtonVPN бесплатный)',
      'Не вводите пароли и платёжные данные через публичный Wi-Fi',
      'Смените пароль домашнего роутера со стандартного',
      'Используйте WPA3 шифрование на роутере',
    ],
  },
  {
    id: 6,
    icon: 'Bell',
    title: 'Мониторинг аккаунтов',
    priority: 6,
    short: 'Знайте первыми, если ваши данные попали в утечку',
    steps: [
      'Зарегистрируйтесь на haveibeenpwned.com — оповещения об утечках',
      'Включите уведомления о входах во всех сервисах',
      'Проверяйте активные сессии в Telegram, ВКонтакте, Google',
      'Настройте уведомления банка о каждой транзакции',
    ],
  },
];

const riskColors = {
  critical: 'text-red-400 border-red-500/30 bg-red-500/5',
  high: 'text-orange-400 border-orange-500/30 bg-orange-500/5',
  medium: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5',
};

const riskLabels = {
  critical: 'КРИТИЧНО',
  high: 'ВЫСОКИЙ',
  medium: 'СРЕДНИЙ',
};

export default function Index() {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [activeTab, setActiveTab] = useState<'threats' | 'tips'>('threats');
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-green-300 font-mono relative overflow-x-hidden">

      {/* Фоновая сетка */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Шапка */}
      <header className="relative z-10 border-b border-green-500/10 px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-500/50 text-xs tracking-[0.3em] uppercase">system::active</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-green-400 tracking-tight leading-none glow-green-text mb-3">
                КиберЩит
              </h1>
              <p className="text-green-300/50 text-sm md:text-base font-light tracking-wide max-w-lg">
                Практическое руководство по защите аккаунтов и личных данных в сети
              </p>
            </div>
            <div className="terminal-border p-4 text-right hidden md:block">
              <div className="text-green-500/40 text-xs mb-1">угроз задокументировано</div>
              <div className="text-green-400 text-3xl font-bold">{threats.length}</div>
              <div className="text-green-500/40 text-xs mt-1">советов по защите: {tips.length}</div>
            </div>
          </div>

          {/* Hero-изображение */}
          <div className="mt-8 relative overflow-hidden rounded-sm terminal-border">
            <img
              src="https://cdn.poehali.dev/projects/a6aea8ba-6a3b-43a4-8c1e-e73310a56e36/files/070b4644-afb0-4273-8b62-744dfb11f657.jpg"
              alt="Кибербезопасность"
              className="w-full h-48 md:h-64 object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-transparent to-[#0d0d0d]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-green-400/80 text-xs tracking-[0.4em] uppercase mb-2">
                  &gt; ваши данные под угрозой_
                </p>
                <p className="text-green-300/40 text-xs">
                  каждые 39 секунд происходит кибератака в мире
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Табы */}
      <div className="relative z-10 border-b border-green-500/10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex">
          <button
            onClick={() => setActiveTab('threats')}
            className={`px-6 py-4 text-xs tracking-widest uppercase border-b-2 transition-all duration-200 ${
              activeTab === 'threats'
                ? 'border-red-400 text-red-400'
                : 'border-transparent text-green-500/40 hover:text-green-400'
            }`}
          >
            ⚠ Угрозы
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-6 py-4 text-xs tracking-widest uppercase border-b-2 transition-all duration-200 ${
              activeTab === 'tips'
                ? 'border-green-400 text-green-400'
                : 'border-transparent text-green-500/40 hover:text-green-400'
            }`}
          >
            ✓ Защита
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <main className="relative z-10 px-6 md:px-12 py-10 max-w-6xl mx-auto">

        {/* Угрозы */}
        {activeTab === 'threats' && (
          <div>
            <p className="text-green-500/40 text-xs tracking-widest uppercase mb-8">
              // знай врага в лицо — нажми на карточку для деталей
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {threats.map((threat) => (
                <div
                  key={threat.id}
                  onClick={() => setSelectedThreat(threat)}
                  className={`card-hover card-hover-red cursor-pointer p-5 border bg-[#0f0f0f] ${riskColors[threat.risk]}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-xs tracking-widest uppercase px-2 py-0.5 border ${riskColors[threat.risk]}`}>
                      {riskLabels[threat.risk]}
                    </div>
                    <Icon name={threat.icon} fallback="AlertCircle" size={18} className="opacity-60" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">{threat.title}</h3>
                  <p className="text-green-500/40 text-xs leading-relaxed">{threat.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs opacity-50">
                    <span>подробнее</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Советы */}
        {activeTab === 'tips' && (
          <div>
            <p className="text-green-500/40 text-xs tracking-widest uppercase mb-8">
              // пошаговые инструкции — нажми чтобы раскрыть
            </p>

            {/* Изображение */}
            <div className="mb-8 relative overflow-hidden rounded-sm terminal-border">
              <img
                src="https://cdn.poehali.dev/projects/a6aea8ba-6a3b-43a4-8c1e-e73310a56e36/files/a8719987-4487-445b-9a46-dcad53a7e014.jpg"
                alt="Защита"
                className="w-full h-36 object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-center px-6">
                <p className="text-green-400 text-sm tracking-wide">
                  &gt; Выполни все шаги — и твои аккаунты станут крепостью_
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {tips.map((tip) => (
                <div
                  key={tip.id}
                  className="terminal-border bg-[#0f0f0f] overflow-hidden card-hover cursor-pointer"
                  onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                >
                  <div className="p-5 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-sm bg-green-400/10 terminal-border flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-xs font-bold">0{tip.priority}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Icon name={tip.icon} fallback="Shield" size={16} className="text-green-400" />
                        <h3 className="text-white font-medium">{tip.title}</h3>
                      </div>
                      <p className="text-green-500/40 text-xs mt-1">{tip.short}</p>
                    </div>
                    <Icon
                      name={expandedTip === tip.id ? 'ChevronUp' : 'ChevronDown'}
                      size={16}
                      className="text-green-500/40 flex-shrink-0"
                    />
                  </div>

                  {expandedTip === tip.id && (
                    <div className="px-5 pb-5 border-t border-green-500/10">
                      <div className="pt-4 space-y-2">
                        {tip.steps.map((step, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-green-400 text-xs mt-0.5 flex-shrink-0">✓</span>
                            <span className="text-green-300/70 text-sm leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Блок самодиагностики */}
      <section className="relative z-10 border-t border-green-500/10 px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-green-500/40 text-xs tracking-widest uppercase mb-6">// быстрая самодиагностика</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { q: 'У вас включена 2FA на почте и соцсетях?', ok: 'Отлично', bad: 'Критично' },
              { q: 'Все ваши пароли уникальны и длиннее 12 символов?', ok: 'Надёжно', bad: 'Уязвимость' },
              { q: 'Вы используете VPN в общественных местах?', ok: 'Защищены', bad: 'Риск' },
            ].map((item, i) => (
              <div key={i} className="terminal-border bg-[#0f0f0f] p-5">
                <p className="text-green-300/70 text-sm mb-4 leading-relaxed">{item.q}</p>
                <div className="flex gap-3">
                  <div className="flex-1 text-center py-2 border border-green-500/30 text-green-400 text-xs tracking-widest uppercase">
                    {item.ok}
                  </div>
                  <div className="flex-1 text-center py-2 border border-red-500/30 text-red-400 text-xs tracking-widest uppercase">
                    {item.bad}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Подвал */}
      <footer className="relative z-10 border-t border-green-500/10 px-6 md:px-12 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-green-500/30 text-xs tracking-widest uppercase">КиберЩит v1.0</p>
          <div className="flex items-center gap-2 text-green-500/30 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>система работает</span>
            <span className="blink">_</span>
          </div>
        </div>
      </footer>

      {/* Модальное окно угрозы */}
      {selectedThreat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          style={{ backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && setSelectedThreat(null)}
        >
          <div className={`modal-in bg-[#0f0f0f] border max-w-2xl w-full max-h-[85vh] overflow-y-auto ${
            selectedThreat.risk === 'critical' ? 'border-red-500/40' :
            selectedThreat.risk === 'high' ? 'border-orange-500/40' : 'border-yellow-500/40'
          }`}>
            <div className="p-6 border-b border-green-500/10 flex items-start justify-between">
              <div>
                <div className={`text-xs tracking-widest uppercase px-2 py-0.5 border inline-block mb-3 ${riskColors[selectedThreat.risk]}`}>
                  РИСК: {riskLabels[selectedThreat.risk]}
                </div>
                <h2 className="text-white text-2xl font-medium">{selectedThreat.title}</h2>
              </div>
              <button onClick={() => setSelectedThreat(null)} className="text-green-500/40 hover:text-green-400 transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-green-500/40 text-xs tracking-widest uppercase mb-3">// как это работает</p>
                <p className="text-green-300/70 text-sm leading-relaxed">{selectedThreat.howWorks}</p>
              </div>

              <div>
                <p className="text-green-500/40 text-xs tracking-widest uppercase mb-3">// признаки атаки</p>
                <div className="space-y-2">
                  {selectedThreat.signs.map((sign, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">!</span>
                      <span className="text-green-300/60 text-sm">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-green-500/10">
                <button
                  onClick={() => { setSelectedThreat(null); setActiveTab('tips'); }}
                  className="w-full py-3 terminal-border text-green-400 text-xs tracking-widest uppercase hover:bg-green-400/5 transition-colors"
                >
                  ✓ Перейти к советам по защите →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}