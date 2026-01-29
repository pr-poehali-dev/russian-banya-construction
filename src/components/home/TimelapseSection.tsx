interface TimelapseSectionProps {
  scrollToSection?: (id: string) => void;
}

const timelapseData = [
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/cdcf3631-b7df-42cd-bcc7-b1c596a60032.jpg",
    description: "Монтаж фундамента"
  },
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/6df753bf-661d-4e15-9a7d-4e2ce80581f2.jpg",
    description: "Доставка материалов"
  },
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/10be6644-ef88-4fb5-960a-0276f633cfe0.jpg",
    description: "Монтаж обвязки фундамента"
  },
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/1cfa4e6f-9219-4b70-a9ed-9033645333a8.jpg",
    description: "Возведение стен"
  },
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/e4631dc6-3fc6-4a76-b6c3-06b05d99d4c6.jpg",
    description: "Возведение стен"
  },
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/24eba619-7928-4ea2-bf89-a4cdf983f045.jpg",
    description: "Монтаж фронтонов"
  },
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/4f833e4f-dbba-4154-8441-5eee49755494.jpg",
    description: "Монтаж фронтонов"
  },
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/60642d90-bf95-4ebc-9c4b-d386206f5cd1.jpg",
    description: "Монтаж стропильной системы"
  },
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/64642ba9-89a2-40b1-8c8f-7d09f62e97b0.jpg",
    description: "Монтаж крыши"
  },
  {
    image: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/716f0597-ce22-499c-a454-fcdf7d92b40c.jpg",
    description: "Монтаж кровли"
  }
];

const TimelapseSection = ({ scrollToSection }: TimelapseSectionProps) => {

  return (
    <section id="timelapse" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8">
            Пример строительства бани "под крышу" за 10 дней
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {timelapseData.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img 
                  src={item.image}
                  alt={`День ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-500 mb-1">
                  День {index + 1}
                </div>
                <div className="text-sm text-gray-700">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => window.location.href = '/calculator'}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105 active:scale-95"
          >
            Стоимость бани за 2 минуты + Гайд "ТОП-10 ошибок строительства бани" в подарок
          </button>
        </div>
      </div>
    </section>
  );
};

export default TimelapseSection;