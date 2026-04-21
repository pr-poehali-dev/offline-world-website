import { useState } from 'react';
import Icon from '@/components/ui/icon';

const BG = '#07090f';
const CARD_BG = '#0b0f1a';
const CARD2_BG = '#0e1320';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'threats', label: 'Угрозы' },
  { id: 'protection', label: 'Защита' },
  { id: 'passwords', label: 'Пароли' },
  { id: 'devices', label: 'Устройства' },
  { id: 'myths', label: 'Мифы' },
];

const stats = [
  { value: '39 сек', label: 'интервал между кибератаками в мире' },
  { value: '83%', label: 'взломов — из-за слабых или повторных паролей' },
  { value: '3.4 млрд', label: 'фишинговых писем рассылается каждый день' },
  { value: '4.5 мин', label: 'среднее время взлома аккаунта без 2FA' },
];

const threats = [
  {
    icon: 'Fish',
    level: 'КРИТИЧНО',
    levelColor: 'text-red-400 border-red-500/25 bg-red-500/5',
    title: 'Фишинг',
    summary: 'Поддельные сайты и письма под видом банков, Госуслуг, соцсетей',
    body: 'Злоумышленник создаёт точную копию знакомого сайта — вплоть до favicon и SSL-сертификата. Адрес может отличаться одной буквой: «gosus|ugi.ru» вместо «gosuslugi.ru». Вы вводите логин и пароль — данные мгновенно уходят мошеннику, а вас перенаправляют на настоящий сайт, чтобы не вызвать подозрений.',
    signs: [
      'Письмо создаёт срочность: «ваш аккаунт будет заблокирован через 24 часа»',
      'Адрес отправителя похож, но не совпадает: support@g00gle.com',
      'Ссылка в письме ведёт на другой домен, чем в тексте',
      'Сайт просит войти, хотя вы уже авторизованы',
      'Форма запрашивает данные карты без видимой причины',
    ],
    howAvoid: [
      'Никогда не переходите по ссылкам из писем — вводите адрес вручную',
      'Проверяйте адрес до последней буквы перед вводом пароля',
      'Установите менеджер паролей — он не предложит пароль на поддельном сайте',
      'Включите двухфакторную аутентификацию — даже украденный пароль не поможет',
    ],
  },
  {
    icon: 'KeyRound',
    level: 'ВЫСОКИЙ',
    levelColor: 'text-orange-400 border-orange-500/25 bg-orange-500/5',
    title: 'Подбор пароля',
    summary: 'Программы перебирают миллионы комбинаций по словарям утечек',
    body: 'Пароль «qwerty123» взламывается за 0.002 секунды. Словари для подбора содержат миллиарды реальных паролей из прошлых утечек. Современные системы пробуют 100 млрд вариантов в секунду. 8-значный пароль из строчных букв — за 5 минут. 12 символов с разными регистрами и цифрами — уже 34 тысячи лет.',
    signs: [
      'Уведомления о многочисленных попытках входа',
      'Вход зафиксирован с неизвестного устройства или страны',
      'Аккаунт заблокирован системой безопасности',
      'В почте появились письма о смене пароля, которые вы не запрашивали',
    ],
    howAvoid: [
      'Минимум 16 символов: буквы верхнего/нижнего регистра + цифры + символы',
      'Используйте случайные фразы: «Кот!Летит#НаЛуну2024»',
      'Уникальный пароль для каждого сайта — без исключений',
      'Включите блокировку аккаунта после N неудачных попыток',
    ],
  },
  {
    icon: 'Wifi',
    level: 'ВЫСОКИЙ',
    levelColor: 'text-orange-400 border-orange-500/25 bg-orange-500/5',
    title: 'Перехват в Wi-Fi',
    summary: 'Чужие точки доступа читают ваш трафик в кафе и аэропортах',
    body: 'Атака «человек посередине»: злоумышленник создаёт точку доступа «Free_Airport_WiFi». Вы подключаетесь — весь трафик проходит через него. На незашифрованных соединениях он видит всё: переписку, пароли, данные карт. Даже на HTTPS-сайтах возможна подмена сертификата при определённых условиях.',
    signs: [
      'Публичная сеть не требует пароля, но просит войти через страницу',
      'Сайты загружаются медленнее обычного',
      'Браузер предупреждает о недействительном сертификате',
      'Соединение обрывается и появляется новая сеть с похожим именем',
    ],
    howAvoid: [
      'Используйте VPN в любой публичной сети — шифрует весь трафик',
      'Не вводите пароли и данные карт через публичный Wi-Fi',
      'Включите «Всегда использовать HTTPS» в браузере',
      'Раздавайте интернет со смартфона — это безопаснее публичного Wi-Fi',
    ],
  },
  {
    icon: 'Smartphone',
    level: 'КРИТИЧНО',
    levelColor: 'text-red-400 border-red-500/25 bg-red-500/5',
    title: 'SIM-свопинг',
    summary: 'Мошенники перевыпускают вашу SIM и получают все SMS-коды',
    body: 'Мошенник узнаёт ваши личные данные из соцсетей или купленных баз. Звонит оператору, называет паспортные данные и просит перевыпустить SIM «из-за утери». Получив карту, он получает все ваши SMS: коды банка, двухфакторную аутентификацию, коды восстановления. За несколько минут — полный контроль над вашей цифровой жизнью.',
    signs: [
      'Телефон внезапно потерял сеть оператора',
      'Перестали приходить SMS от банка и сервисов',
      'Приходят уведомления о смене настроек аккаунтов',
      'Звонит «служба безопасности оператора» с подозрительными вопросами',
    ],
    howAvoid: [
      'Установите кодовое слово у оператора для любых операций с SIM',
      'Используйте приложение-аутентификатор вместо SMS для 2FA',
      'Не публикуйте в соцсетях данные паспорта и дату рождения',
      'При потере сети немедленно звоните оператору с другого телефона',
    ],
  },
  {
    icon: 'Eye',
    level: 'ВЫСОКИЙ',
    levelColor: 'text-orange-400 border-orange-500/25 bg-orange-500/5',
    title: 'Социальная инженерия',
    summary: 'Манипуляции и обман — самый эффективный инструмент хакеров',
    body: 'Технологии защищают данные, но не людей. 98% кибератак начинаются с социальной инженерии. Сценарий: «Это служба безопасности Сбербанка. На вас пытаются оформить кредит. Назовите код из SMS для блокировки». Вы называете код — он является кодом для входа в ваш аккаунт. Через 10 секунд деньги уже переведены.',
    signs: [
      'Создают ощущение срочности и паники: «счёт заблокируют через час»',
      'Звонящий знает ваше имя, часть номера карты, последние операции',
      'Просят никому не рассказывать о звонке «для вашей безопасности»',
      'Звонок с официального номера банка (подменяется технически)',
    ],
    howAvoid: [
      'Никогда не называйте коды из SMS — ни банку, ни операторам, никому',
      'Положите трубку и сами перезвоните по номеру с карты или сайта',
      'Настоящие банки никогда не просят коды подтверждения по телефону',
      'Расскажите пожилым родственникам — они в группе наибольшего риска',
    ],
  },
  {
    icon: 'Database',
    level: 'СРЕДНИЙ',
    levelColor: 'text-yellow-400 border-yellow-500/25 bg-yellow-500/5',
    title: 'Утечки баз данных',
    summary: 'Ваши данные продаются в даркнете после взлома сервисов',
    body: 'Каждый год крупные сервисы теряют миллионы записей: Adobe (153 млн), LinkedIn (700 млн), Facebook (530 млн пользователей). Базы с логинами, паролями и личными данными продаются за $10–$500. Если вы используете один пароль повсюду — после одной утечки злоумышленник проверит его на банках, почте, маркетплейсах.',
    signs: [
      'Пришло письмо с уведомлением об утечке от сервиса',
      'На почту приходит спам, которого раньше не было',
      'Получаете письма с вашим старым паролем в теме — требование выкупа',
      'Неизвестные попытки входа в аккаунты',
    ],
    howAvoid: [
      'Проверьте свою почту на сайте haveibeenpwned.com',
      'Уникальный пароль на каждом сайте — главная защита от цепных взломов',
      'Используйте псевдонимы почты (алиасы) для регистрации на сайтах',
      'Удалите аккаунты на сервисах, которыми не пользуетесь',
    ],
  },
];

const protectionBlocks = [
  {
    icon: 'ShieldCheck',
    title: 'Двухфакторная аутентификация (2FA)',
    priority: '01',
    impact: 'Снижает риск взлома на 99.9%',
    body: 'Даже если мошенник знает ваш пароль — без второго фактора он не войдёт. 2FA — это одноразовый код, который действует 30 секунд. Приложения-аутентификаторы (Google Authenticator, Яндекс Ключ, Aegis) надёжнее SMS: SMS можно перехватить через SIM-свопинг, а код из приложения — нет.',
    steps: [
      'Скачайте Яндекс Ключ или Google Authenticator на смартфон',
      'Зайдите в настройки безопасности Госуслуг, VK, почты, банка',
      'Найдите раздел «Двухфакторная аутентификация» и включите',
      'Отсканируйте QR-код в приложении — оно начнёт генерировать коды',
      'Сохраните резервные коды в надёжном месте (не в телефоне)',
    ],
    where: ['Госуслуги', 'ВКонтакте', 'Telegram', 'Google/Gmail', 'Яндекс', 'Сбербанк онлайн', 'Тинькофф'],
  },
  {
    icon: 'Lock',
    title: 'Менеджер паролей',
    priority: '02',
    impact: 'Уникальный сложный пароль для каждого сайта без усилий',
    body: 'Менеджер паролей хранит все пароли в зашифрованном виде. Вам нужно помнить только один мастер-пароль. Программа автоматически заполняет поля входа и не предложит пароль на фишинговом сайте — потому что адрес не совпадёт. Это одновременно защита и от фишинга.',
    steps: [
      'Установите Bitwarden (бесплатный, с открытым кодом) или KeePass',
      'Создайте мастер-пароль: длинная фраза, которую помните только вы',
      'Установите расширение для браузера — оно подставит пароли автоматически',
      'Импортируйте сохранённые пароли из браузера в менеджер',
      'Постепенно смените старые слабые пароли на сгенерированные',
    ],
    where: ['Bitwarden — бесплатный, рекомендован экспертами', 'KeePass — работает офлайн, без облака', 'встроенный в браузер — лучше, чем ничего'],
  },
  {
    icon: 'Wifi',
    title: 'VPN для публичных сетей',
    priority: '03',
    impact: 'Шифрует весь трафик в кафе, аэропортах, гостиницах',
    body: 'VPN создаёт зашифрованный туннель между вашим устройством и сервером. Даже если кто-то перехватывает ваш трафик в публичной сети — он видит только зашифрованную абракадабру. Важно: бесплатные VPN часто сами продают ваши данные. Выбирайте проверенные сервисы с политикой no-log.',
    steps: [
      'Установите ProtonVPN (бесплатный) или Mullvad (платный, без аккаунта)',
      'Включайте VPN каждый раз при подключении к публичной сети',
      'Дома VPN не нужен — ваш роутер и так в защищённой сети',
      'На смартфоне настройте автоподключение VPN в незнакомых сетях',
    ],
    where: ['ProtonVPN — бесплатный базовый план', 'Mullvad — максимальная анонимность', 'Встроенный в Opera — лучше ничего для разового использования'],
  },
  {
    icon: 'RefreshCw',
    title: 'Обновления без промедления',
    priority: '04',
    impact: '60% взломов — через уязвимости в устаревшем ПО',
    body: 'Каждое обновление системы и приложений закрывает обнаруженные дыры безопасности. Разработчики публикуют обновление — хакеры изучают, что именно исправлено, и атакуют всех, кто ещё не обновился. У вас есть несколько дней или часов, пока вы не стали мишенью.',
    steps: [
      'Включите автообновления Windows/macOS/iOS/Android',
      'Проверяйте обновления браузера еженедельно (Настройки → О браузере)',
      'Обновляйте роутер: зайдите в его интерфейс и проверьте прошивку',
      'Удалите программы, которыми не пользуетесь — каждая может стать уязвимостью',
    ],
    where: ['Windows: Параметры → Центр обновления', 'macOS: Системные настройки → Обновление ПО', 'Android/iOS: Настройки → Основные → Обновление ПО'],
  },
  {
    icon: 'Bell',
    title: 'Мониторинг и уведомления',
    priority: '05',
    impact: 'Узнаёте о взломе первыми — за минуты, а не месяцы',
    body: 'Среднее время между взломом и его обнаружением — 197 дней. За это время мошенники успевают вывести деньги, оформить кредиты, продать данные. Настроив уведомления, вы сократите это время до минут и сможете принять меры до серьёзного ущерба.',
    steps: [
      'Включите SMS/Push о каждой транзакции в банковском приложении',
      'В Telegram: Настройки → Конфиденциальность → Уведомления о входе',
      'В Google: Безопасность → Действия в аккаунте — включить уведомления',
      'На Госуслугах: включите уведомления о входе в личный кабинет',
      'Проверьте активные сессии во всех важных сервисах прямо сейчас',
    ],
    where: ['haveibeenpwned.com — реестр утечек (проверьте свою почту)', 'Госуслуги → Настройки → Уведомления', 'Google Account → Безопасность'],
  },
];

const passwordRules = [
  { label: 'Длина', good: '16+ символов', bad: '6–8 символов', why: 'Каждый дополнительный символ увеличивает время взлома в десятки раз' },
  { label: 'Состав', good: 'Буквы + цифры + символы (!@#)', bad: 'Только буквы или только цифры', why: 'Смешанный состав увеличивает число возможных комбинаций до триллионов' },
  { label: 'Уникальность', good: 'Разный пароль на каждом сайте', bad: 'Один пароль для всего', why: 'Взлом одного сайта не даст доступ ко всем остальным аккаунтам' },
  { label: 'Предсказуемость', good: 'Случайная фраза или набор', bad: 'Имя + год рождения, qwerty123', why: 'Словари для подбора содержат все «популярные» пароли' },
  { label: 'Хранение', good: 'Менеджер паролей', bad: 'Записная книжка, заметки в телефоне', why: 'Менеджер шифрует данные и не даст ввести пароль на фишинговом сайте' },
];

const deviceTips = [
  {
    icon: 'Smartphone',
    title: 'Смартфон',
    tips: [
      'Включите блокировку экрана: PIN минимум 6 цифр или биометрия',
      'Установите приложения только из App Store и Google Play',
      'Перед продажей: сброс до заводских настроек + удаление SIM',
      'Отключите Bluetooth и Wi-Fi, когда не используете — вектор атак',
      'Не заряжайте от чужих USB — «juice jacking» может заразить устройство',
      'Включите функцию «Найти устройство» для удалённого стирания данных',
    ],
  },
  {
    icon: 'Laptop',
    title: 'Компьютер',
    tips: [
      'Включите шифрование диска: BitLocker (Windows) или FileVault (Mac)',
      'Не работайте под учётной записью администратора для повседневных задач',
      'Установите антивирус: Windows Defender достаточен для большинства',
      'Заблокируйте экран при отходе: Win+L (Windows) или Cmd+Ctrl+Q (Mac)',
      'Регулярно делайте резервные копии на отдельный диск или облако',
      'Не подключайте найденные USB-накопители — классический вектор атаки',
    ],
  },
  {
    icon: 'Router',
    title: 'Домашний роутер',
    tips: [
      'Смените стандартный пароль admin/admin сразу после покупки',
      'Используйте шифрование WPA3 (или хотя бы WPA2)',
      'Скройте имя сети (SSID) — чуть усложнит обнаружение',
      'Создайте гостевую сеть для умных устройств и гостей',
      'Обновляйте прошивку роутера — в ней тоже бывают уязвимости',
      'Отключите WPS — функция удобная, но небезопасная',
    ],
  },
];

const myths = [
  {
    myth: '«Меня не взломают — я обычный человек, зачем я хакерам?»',
    reality: 'Взломы не персональные — они массовые. Боты автоматически перебирают миллиарды аккаунтов. Цель не «вы» лично, а любой аккаунт со слабым паролем. Взломанный аккаунт используют для рассылки спама, кражи денег или майнинга.',
  },
  {
    myth: '«У меня есть антивирус — я защищён»',
    reality: 'Антивирус защищает от известных вредоносных программ, но не от фишинга, социальной инженерии и слабых паролей. 91% успешных кибератак начинается с фишингового письма, которое антивирус не блокирует.',
  },
  {
    myth: '«Я узнаю, если меня взломают»',
    reality: 'Среднее время обнаружения взлома — 197 дней. Профессиональные злоумышленники работают тихо месяцами: собирают данные, следят за перепиской, ждут крупных транзакций. Без уведомлений о входе вы можете не узнать никогда.',
  },
  {
    myth: '«Сложный пароль — это "P@ssw0rd1!"»',
    reality: 'Замена букв символами («а» → «@», «о» → «0») — первое, что проверяют словари. «P@ssw0rd» взламывается так же быстро, как «password». Настоящая сложность — длина и случайность: «Кот#Летит!НаЛуну2024» надёжнее.',
  },
  {
    myth: '«HTTPS означает, что сайт безопасный»',
    reality: 'HTTPS означает только то, что соединение зашифровано. Фишинговые сайты тоже получают SSL-сертификаты — бесплатно и за 5 минут. Замочек не гарантирует, что сайт настоящий.',
  },
  {
    myth: '«VPN делает меня полностью анонимным»',
    reality: 'VPN скрывает ваш IP от сайтов и шифрует трафик от провайдера. Но вас всё равно можно отследить по браузерному отпечатку, куки, аккаунтам Google/Yandex. VPN — это защита трафика, а не полная анонимность.',
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('threats');
  const [expandedThreat, setExpandedThreat] = useState<number | null>(null);
  const [expandedProtection, setExpandedProtection] = useState<number | null>(null);

  return (
    <div className="min-h-screen font-mono relative overflow-x-hidden" style={{ background: BG, color: '#a8c4f0' }}>

      {/* Фон — синяя сетка */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Радиальный градиент сверху */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(29,78,216,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Шапка */}
      <header className="relative z-10 border-b px-6 md:px-16 py-8" style={{ borderColor: 'rgba(59,130,246,0.15)', background: 'rgba(7,9,15,0.9)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-500/50 text-xs tracking-[0.35em] uppercase">security::system v2.0</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-3 glow-blue-text" style={{ color: '#60a5fa' }}>
                КиберЩит
              </h1>
              <p className="text-sm md:text-base font-light tracking-wide max-w-xl leading-relaxed" style={{ color: 'rgba(168,196,240,0.6)' }}>
                Полное руководство по защите аккаунтов, устройств и личных данных.<br />
                Без воды — только конкретные действия.
              </p>
            </div>
            {/* Счётчики */}
            <div className="flex gap-6 md:gap-8 flex-wrap">
              {[
                { n: '6', t: 'угроз' },
                { n: '5', t: 'методов защиты' },
                { n: '6', t: 'мифов' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold" style={{ color: '#60a5fa' }}>{s.n}</div>
                  <div className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(96,165,250,0.4)' }}>{s.t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="p-4 blue-border" style={{ background: CARD_BG }}>
                <div className="text-xl md:text-2xl font-bold mb-1" style={{ color: '#60a5fa' }}>{s.value}</div>
                <div className="text-xs leading-relaxed" style={{ color: 'rgba(168,196,240,0.45)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Навигация */}
      <nav className="relative z-10 border-b sticky top-0" style={{ borderColor: 'rgba(59,130,246,0.12)', background: 'rgba(7,9,15,0.97)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 flex overflow-x-auto">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className="px-5 py-4 text-xs tracking-widest uppercase border-b-2 whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={{
                borderColor: activeSection === s.id ? '#3b82f6' : 'transparent',
                color: activeSection === s.id ? '#60a5fa' : 'rgba(96,165,250,0.35)',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Контент */}
      <main className="relative z-10 px-6 md:px-16 py-10 max-w-6xl mx-auto">

        {/* === УГРОЗЫ === */}
        {activeSection === 'threats' && (
          <div className="fade-in">
            <p className="text-xs tracking-widest uppercase mb-8" style={{ color: 'rgba(96,165,250,0.35)' }}>
              // нажми на карточку чтобы узнать подробности и как защититься
            </p>
            <div className="space-y-3">
              {threats.map((t, i) => (
                <div key={i} className="card-hover blue-border overflow-hidden cursor-pointer" style={{ background: CARD_BG }}
                  onClick={() => setExpandedThreat(expandedThreat === i ? null : i)}>
                  <div className="p-5 flex items-start gap-4">
                    <div className={`text-xs tracking-widest px-2 py-1 border flex-shrink-0 ${t.levelColor}`}>
                      {t.level}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <Icon name={t.icon} fallback="AlertCircle" size={16} style={{ color: '#60a5fa' }} />
                        <span className="font-medium" style={{ color: '#e2eaf8' }}>{t.title}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(168,196,240,0.45)' }}>{t.summary}</p>
                    </div>
                    <Icon name={expandedThreat === i ? 'ChevronUp' : 'ChevronDown'} size={16} className="flex-shrink-0" style={{ color: 'rgba(96,165,250,0.3)' }} />
                  </div>

                  {expandedThreat === i && (
                    <div className="border-t px-5 pb-6 pt-5 space-y-5" style={{ borderColor: 'rgba(59,130,246,0.12)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(168,196,240,0.7)' }}>{t.body}</p>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(239,68,68,0.6)' }}>! признаки атаки</p>
                          <div className="space-y-2">
                            {t.signs.map((sign, si) => (
                              <div key={si} className="flex items-start gap-2">
                                <span className="text-red-400 text-xs flex-shrink-0 mt-0.5">›</span>
                                <span className="text-xs leading-relaxed" style={{ color: 'rgba(168,196,240,0.6)' }}>{sign}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(96,165,250,0.6)' }}>✓ как защититься</p>
                          <div className="space-y-2">
                            {t.howAvoid.map((tip, ti) => (
                              <div key={ti} className="flex items-start gap-2">
                                <span className="text-blue-400 text-xs flex-shrink-0 mt-0.5">›</span>
                                <span className="text-xs leading-relaxed" style={{ color: 'rgba(168,196,240,0.6)' }}>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === ЗАЩИТА === */}
        {activeSection === 'protection' && (
          <div className="fade-in">
            <p className="text-xs tracking-widest uppercase mb-8" style={{ color: 'rgba(96,165,250,0.35)' }}>
              // пошаговые инструкции — нажми чтобы раскрыть
            </p>
            <div className="space-y-3">
              {protectionBlocks.map((p, i) => (
                <div key={i} className="card-hover blue-border overflow-hidden cursor-pointer" style={{ background: CARD_BG }}
                  onClick={() => setExpandedProtection(expandedProtection === i ? null : i)}>
                  <div className="p-5 flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 blue-border" style={{ background: 'rgba(59,130,246,0.08)' }}>
                      <span className="text-xs font-bold" style={{ color: '#60a5fa' }}>{p.priority}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <Icon name={p.icon} fallback="Shield" size={15} style={{ color: '#60a5fa' }} />
                        <span className="font-medium" style={{ color: '#e2eaf8' }}>{p.title}</span>
                      </div>
                      <p className="text-xs" style={{ color: 'rgba(96,165,250,0.5)' }}>{p.impact}</p>
                    </div>
                    <Icon name={expandedProtection === i ? 'ChevronUp' : 'ChevronDown'} size={16} className="flex-shrink-0" style={{ color: 'rgba(96,165,250,0.3)' }} />
                  </div>

                  {expandedProtection === i && (
                    <div className="border-t px-5 pb-6 pt-5 space-y-5" style={{ borderColor: 'rgba(59,130,246,0.12)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(168,196,240,0.7)' }}>{p.body}</p>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(96,165,250,0.5)' }}>// шаги</p>
                          <div className="space-y-2">
                            {p.steps.map((step, si) => (
                              <div key={si} className="flex items-start gap-3">
                                <span className="text-blue-400 text-xs flex-shrink-0 font-bold">{si + 1}.</span>
                                <span className="text-xs leading-relaxed" style={{ color: 'rgba(168,196,240,0.65)' }}>{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(96,165,250,0.5)' }}>// где применить</p>
                          <div className="space-y-2">
                            {p.where.map((w, wi) => (
                              <div key={wi} className="flex items-start gap-2">
                                <span className="text-blue-400 text-xs flex-shrink-0">›</span>
                                <span className="text-xs" style={{ color: 'rgba(168,196,240,0.55)' }}>{w}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === ПАРОЛИ === */}
        {activeSection === 'passwords' && (
          <div className="fade-in space-y-8">
            <div>
              <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'rgba(96,165,250,0.35)' }}>// правила надёжного пароля</p>
              <div className="space-y-2">
                {passwordRules.map((r, i) => (
                  <div key={i} className="blue-border p-5" style={{ background: CARD_BG }}>
                    <div className="grid md:grid-cols-4 gap-4 items-start">
                      <div className="text-xs tracking-widest uppercase" style={{ color: 'rgba(96,165,250,0.5)' }}>{r.label}</div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-xs flex-shrink-0 mt-0.5">✓</span>
                        <span className="text-xs" style={{ color: '#86efac' }}>{r.good}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 text-xs flex-shrink-0 mt-0.5">✗</span>
                        <span className="text-xs" style={{ color: '#fca5a5' }}>{r.bad}</span>
                      </div>
                      <p className="text-xs leading-relaxed md:col-span-1" style={{ color: 'rgba(168,196,240,0.45)' }}>{r.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Время взлома */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-5" style={{ color: 'rgba(96,165,250,0.35)' }}>// сколько времени займёт взлом вашего пароля</p>
              <div className="space-y-2">
                {[
                  { pass: 'qwerty', time: '0.002 сек', strength: 2, color: '#ef4444' },
                  { pass: 'password123', time: '1 минута', strength: 8, color: '#f97316' },
                  { pass: 'P@ssw0rd!', time: '4 часа', strength: 15, color: '#eab308' },
                  { pass: 'MyDog#Rex2019', time: '3 года', strength: 45, color: '#22c55e' },
                  { pass: 'Кот!Летит#НаЛуну2024', time: '34 000 лет', strength: 90, color: '#3b82f6' },
                  { pass: '[случайный 20 символов]', time: '∞ трлн лет', strength: 100, color: '#60a5fa' },
                ].map((p, i) => (
                  <div key={i} className="blue-border p-4 flex items-center gap-5" style={{ background: CARD_BG }}>
                    <div className="w-40 flex-shrink-0">
                      <code className="text-xs" style={{ color: 'rgba(168,196,240,0.7)' }}>{p.pass}</code>
                    </div>
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(59,130,246,0.1)' }}>
                      <div className="h-full rounded-full" style={{ width: `${p.strength}%`, background: p.color }} />
                    </div>
                    <div className="w-28 text-right text-xs flex-shrink-0 font-medium" style={{ color: p.color }}>{p.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Золотые правила */}
            <div className="blue-border-bright p-6" style={{ background: 'rgba(29,78,216,0.08)' }}>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#60a5fa' }}>// золотые правила паролей</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Один сайт — один уникальный пароль. Всегда.',
                  'Пароль — это не слово, это случайная строка или длинная фраза',
                  'Менеджер паролей помнит всё — вам нужен только мастер-пароль',
                  'Смените пароли от почты и Госуслуг прямо сейчас — это самое важное',
                  'Никогда не называйте пароль по телефону или в переписке',
                  'Если сомневаетесь — смените пароль. Это занимает 2 минуты',
                ].map((rule, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-blue-400 text-xs flex-shrink-0 mt-0.5">›</span>
                    <span className="text-xs leading-relaxed" style={{ color: 'rgba(168,196,240,0.65)' }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === УСТРОЙСТВА === */}
        {activeSection === 'devices' && (
          <div className="fade-in">
            <p className="text-xs tracking-widest uppercase mb-8" style={{ color: 'rgba(96,165,250,0.35)' }}>
              // защита каждого устройства в вашей жизни
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {deviceTips.map((d, i) => (
                <div key={i} className="blue-border p-5" style={{ background: CARD_BG }}>
                  <div className="flex items-center gap-3 mb-5">
                    <Icon name={d.icon} fallback="Monitor" size={18} style={{ color: '#60a5fa' }} />
                    <h3 className="font-medium" style={{ color: '#e2eaf8' }}>{d.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {d.tips.map((tip, ti) => (
                      <div key={ti} className="flex items-start gap-2 border-b pb-3 last:border-0 last:pb-0" style={{ borderColor: 'rgba(59,130,246,0.08)' }}>
                        <span className="text-blue-400 text-xs flex-shrink-0 mt-0.5">›</span>
                        <span className="text-xs leading-relaxed" style={{ color: 'rgba(168,196,240,0.6)' }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Чеклист */}
            <div className="mt-8 blue-border p-6" style={{ background: CARD_BG }}>
              <p className="text-xs tracking-widest uppercase mb-5" style={{ color: 'rgba(96,165,250,0.5)' }}>// чеклист — сделайте это прямо сегодня</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Включить блокировку экрана на смартфоне (PIN 6+ цифр)',
                  'Сменить пароль на роутере со стандартного',
                  'Включить 2FA на почте и Госуслугах',
                  'Проверить активные сессии в Telegram и ВКонтакте',
                  'Включить автообновления на телефоне и компьютере',
                  'Установить Bitwarden и добавить 5 первых паролей',
                  'Проверить почту на haveibeenpwned.com',
                  'Включить уведомления о транзакциях в банке',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3" style={{ background: 'rgba(59,130,246,0.04)' }}>
                    <div className="w-4 h-4 blue-border flex-shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed" style={{ color: 'rgba(168,196,240,0.65)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === МИФЫ === */}
        {activeSection === 'myths' && (
          <div className="fade-in">
            <p className="text-xs tracking-widest uppercase mb-8" style={{ color: 'rgba(96,165,250,0.35)' }}>
              // опасные заблуждения, которые стоят людям денег и данных
            </p>
            <div className="space-y-4">
              {myths.map((m, i) => (
                <div key={i} className="blue-border" style={{ background: CARD_BG }}>
                  <div className="p-5 border-b" style={{ borderColor: 'rgba(59,130,246,0.1)', background: 'rgba(239,68,68,0.04)' }}>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-lg flex-shrink-0 leading-none mt-0.5">✗</span>
                      <p className="text-sm font-medium italic" style={{ color: '#fca5a5' }}>{m.myth}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 text-lg flex-shrink-0 leading-none mt-0.5">›</span>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(168,196,240,0.7)' }}>{m.reality}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Подвал */}
      <footer className="relative z-10 border-t px-6 md:px-16 py-6 mt-8" style={{ borderColor: 'rgba(59,130,246,0.12)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(96,165,250,0.25)' }}>КиберЩит — защита аккаунтов</p>
          <div className="flex items-center gap-3" style={{ color: 'rgba(96,165,250,0.25)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs">система активна</span>
            <span className="blink text-xs">_</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
