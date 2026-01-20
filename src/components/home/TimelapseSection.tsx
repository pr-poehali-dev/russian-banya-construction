const TimelapseSection = () => {
  const days = [
    {
      day: 1,
      title: "День 1 — Подготовка фундамента",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/cdcf3631-b7df-42cd-bcc7-b1c596a60032.jpg"
    },
    {
      day: 2,
      title: "День 2 — Доставка материалов",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/6df753bf-661d-4e15-9a7d-4e2ce80581f2.jpg"
    },
    {
      day: 3,
      title: "День 3 — Монтаж каркаса",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/10be6644-ef88-4fb5-960a-0276f633cfe0.jpg"
    },
    {
      day: 4,
      title: "День 4 — Возведение стен",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/1cfa4e6f-9219-4b70-a9ed-9033645333a8.jpg"
    },
    {
      day: 5,
      title: "День 5 — Завершение сруба",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/e4631dc6-3fc6-4a76-b6c3-06b05d99d4c6.jpg"
    },
    {
      day: 6,
      title: "День 6 — Установка стропил",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/09a24061-a0c9-426a-8cc6-30e321156650.jpg"
    },
    {
      day: 7,
      title: "День 7 — Укладка кровли",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/d838e77e-85aa-431b-9f0e-c6c226edd9f7.jpg"
    },
    {
      day: 8,
      title: "День 8 — Монтаж окон и дверей",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/e1d98c6d-c09f-4780-b56a-a2dadc226ad7.jpg"
    },
    {
      day: 9,
      title: "День 9 — Отделочные работы",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/fad983d7-d9f8-4e85-ac52-e03e824d1fb0.jpg"
    },
    {
      day: 10,
      title: "День 10 — Баня под крышу готова",
      image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/0062d144-6ef6-4d2f-ad31-7221386d5603.jpg"
    }
  ];

  return (
    <section id="timelapse" className="py-16 md:py-20 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Строительство бани за 10 дней
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Реальный пример строительства бани «под крышу» — от фундамента до готового объекта
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {days.map((item) => (
            <div 
              key={item.day}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent -z-10" />
                <div className="relative">
                  <div className="text-xs md:text-sm font-medium text-amber-400 mb-1">
                    День {item.day}
                  </div>
                  <div className="text-xs md:text-sm font-semibold line-clamp-2">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <p className="text-sm md:text-base text-muted-foreground">
            Работаем быстро и качественно. Каждый этап строго контролируется нашими мастерами
          </p>
        </div>
      </div>
    </section>
  );
};

export default TimelapseSection;
