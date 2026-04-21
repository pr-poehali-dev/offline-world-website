import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface GalleryItem {
  id: number;
  image: string;
  year: string;
  era: string;
  title: string;
  description: string;
  detail: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://cdn.poehali.dev/projects/a6aea8ba-6a3b-43a4-8c1e-e73310a56e36/files/8b6e6077-e7e6-454b-9267-0d8f0962a419.jpg',
    year: '476',
    era: 'Поздняя Античность',
    title: 'Падение Рима',
    description: 'Руины Вечного города',
    detail: 'Падение Западной Римской империи в 476 году н.э. ознаменовало конец античного мира. Германские племена под предводительством Одоакра низложили последнего императора Ромула Августула, положив конец тысячелетней эпохе. Руины, оставшиеся от великой цивилизации, на протяжении столетий будут вдохновлять поэтов, философов и художников.',
    category: 'Архитектура',
  },
  {
    id: 2,
    image: 'https://cdn.poehali.dev/projects/a6aea8ba-6a3b-43a4-8c1e-e73310a56e36/files/1c635983-89b7-4f17-af88-41f351c5c3ea.jpg',
    year: '1088',
    era: 'Средневековье',
    title: 'Первые университеты',
    description: 'Хранилища знания',
    detail: 'Основание Болонского университета в 1088 году открыло новую эпоху в истории образования. Монастырские библиотеки, прежде хранившие рукописи в тайне, стали доступны для студентов, прибывавших со всей Европы. Знание перестало быть привилегией духовенства — оно стало силой, способной изменить судьбы людей и целых народов.',
    category: 'Наука',
  },
  {
    id: 3,
    image: 'https://cdn.poehali.dev/projects/a6aea8ba-6a3b-43a4-8c1e-e73310a56e36/files/344915eb-509f-43b6-a0e2-7ebe8d7426df.jpg',
    year: '1492',
    era: 'Эпоха Открытий',
    title: 'Новые горизонты',
    description: 'Карты неизведанных земель',
    detail: 'В 1492 году Христофор Колумб пересёк Атлантический океан, открыв для европейцев Американский континент. Картографы спешно наносили на карты новые земли, заменяя мифических морских чудовищ реальными очертаниями берегов. Эпоха Великих географических открытий навсегда изменила представление человечества о мире и о самом себе.',
    category: 'Открытия',
  },
  {
    id: 4,
    image: 'https://cdn.poehali.dev/projects/a6aea8ba-6a3b-43a4-8c1e-e73310a56e36/files/394cb87f-30c4-48ba-81e9-4c384ed7c205.jpg',
    year: '1347',
    era: 'Позднее Средневековье',
    title: 'Чёрная смерть',
    description: 'Город в тишине',
    detail: 'Чума 1347–1351 годов унесла жизни трети населения Европы. Средневековые города опустели, торговые пути замерли, привычный уклад жизни рухнул. Но именно из этой катастрофы родилось Возрождение: уцелевшие художники, мыслители и торговцы начали переосмыслять место человека в мире, отказываясь от покорности судьбе в пользу деятельного начала.',
    category: 'Общество',
  },
  {
    id: 5,
    image: 'https://cdn.poehali.dev/projects/a6aea8ba-6a3b-43a4-8c1e-e73310a56e36/files/39c3d4b3-80ef-46eb-8578-8bc237fb4ac8.jpg',
    year: '1215',
    era: 'Средневековье',
    title: 'Великая хартия',
    description: 'Рождение права',
    detail: 'Подписанная в 1215 году Magna Carta впервые ограничила власть монарха, провозгласив, что король тоже подчиняется закону. Этот пергаментный документ с восковой печатью заложил основы конституционного права. Слова, начертанные в нём гусиным пером, спустя восемь столетий продолжают звучать в конституциях демократических государств мира.',
    category: 'Право',
  },
  {
    id: 6,
    image: 'https://cdn.poehali.dev/projects/a6aea8ba-6a3b-43a4-8c1e-e73310a56e36/files/fa98402b-d917-4762-b2c0-f2d798a7af65.jpg',
    year: '1837',
    era: 'Эпоха Викторианства',
    title: 'Портрет эпохи',
    description: 'Лица, изменившие мир',
    detail: 'Викторианская эпоха породила особый тип личности — деятельной, целеустремлённой, верящей в прогресс. Женщины этого времени разрывали оковы устоявшихся предрассудков, становясь писателями, учёными, политическими активистками. Фотография, появившаяся именно в эту эпоху, впервые позволила сохранить для истории не только облик великих, но и лица обычных людей.',
    category: 'Личности',
  },
];

const categories = ['Все', 'Архитектура', 'Наука', 'Открытия', 'Общество', 'Право', 'Личности'];

export default function Index() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeCategory === 'Все'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-parchment relative">

      {/* Шапка */}
      <header className="relative z-10 pt-16 pb-12 px-8 max-w-6xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-cormorant text-sepia text-sm tracking-[0.3em] uppercase mb-3 opacity-70">
              Галерея историй
            </p>
            <h1 className="font-cormorant text-ink text-7xl md:text-8xl font-light leading-none tracking-tight">
              Хроники
            </h1>
            <div className="w-12 h-px bg-sepia opacity-40 mt-4 mb-5"></div>
            <p className="font-cormorant-garamond text-sepia text-xl italic font-light max-w-sm leading-relaxed">
              Избранные образы прошлого, сохранённые для тех, кто умеет смотреть
            </p>
          </div>
          <div className="hidden md:block text-right pt-2">
            <span className="font-cormorant text-sepia text-xs tracking-[0.4em] uppercase opacity-50">
              {filtered.length} историй
            </span>
          </div>
        </div>
      </header>

      {/* Фильтры */}
      <nav className="relative z-10 px-8 max-w-6xl mx-auto mb-12">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-cormorant text-sm tracking-widest uppercase px-4 py-1.5 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-ink text-parchment border-ink'
                  : 'bg-transparent text-sepia border-sepia/40 hover:border-sepia hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Галерея */}
      <main className="relative z-10 px-8 max-w-6xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, index) => (
            <article
              key={item.id}
              className="gallery-card cursor-pointer group"
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => setSelected(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Изображение */}
              <div className="relative overflow-hidden aspect-[4/3] bg-sepia/20">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Оверлей при ховере */}
                <div className={`absolute inset-0 bg-ink/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-center">
                    <Icon name="Expand" size={20} className="text-parchment mx-auto mb-2 opacity-90" />
                    <span className="font-cormorant text-parchment text-sm tracking-[0.2em] uppercase opacity-90">
                      Читать
                    </span>
                  </div>
                </div>
                {/* Категория */}
                <div className="absolute top-3 left-3">
                  <span className="font-cormorant text-xs tracking-widest uppercase px-2 py-0.5 bg-parchment/90 text-sepia-dark">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Контент карточки */}
              <div className="pt-5 pb-2">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-cormorant text-sepia text-3xl font-light tabular-nums">
                    {item.year}
                  </span>
                  <span className="font-cormorant text-sepia/60 text-xs tracking-widest uppercase">
                    {item.era}
                  </span>
                </div>
                <h2 className="font-cormorant text-ink text-2xl font-medium leading-tight mb-1">
                  {item.title}
                </h2>
                <p className="font-cormorant-garamond text-sepia italic text-base">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Подвал */}
      <footer className="relative z-10 border-t border-sepia/20 px-8 py-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <p className="font-cormorant text-sepia/50 text-sm tracking-widest uppercase">
            Хроники — История в образах
          </p>
          <p className="font-cormorant-garamond text-sepia/40 text-sm italic">
            Memoria est thesaurus omnium rerum
          </p>
        </div>
      </footer>

      {/* Модальное окно */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 modal-backdrop bg-ink/70"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="relative bg-parchment max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-in shadow-2xl">

            {/* Закрыть */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-sepia hover:text-ink transition-colors"
            >
              <Icon name="X" size={18} />
            </button>

            {/* Изображение */}
            <div className="relative aspect-[16/7] overflow-hidden">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <span className="font-cormorant text-sepia-light text-xs tracking-[0.4em] uppercase mb-1 block">
                  {selected.era}
                </span>
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="font-cormorant text-parchment text-5xl font-light">
                    {selected.year}
                  </span>
                  <h2 className="font-cormorant text-parchment text-3xl font-light">
                    {selected.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Текст */}
            <div className="px-8 py-8 md:px-12 md:py-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-cormorant text-xs tracking-widest uppercase px-3 py-1 border border-sepia/40 text-sepia">
                  {selected.category}
                </span>
                <div className="flex-1 h-px bg-sepia opacity-20"></div>
              </div>

              <p className="font-cormorant-garamond text-ink text-lg md:text-xl leading-relaxed font-light">
                {selected.detail}
              </p>

              <div className="mt-10 pt-6 border-t border-sepia/20 flex items-center justify-between">
                <p className="font-cormorant text-sepia/50 text-xs tracking-[0.3em] uppercase">
                  {selected.description}
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="font-cormorant text-sm tracking-widest uppercase text-sepia hover:text-ink transition-colors border-b border-sepia/40 pb-0.5"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
