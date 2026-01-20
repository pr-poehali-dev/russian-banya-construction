import { useState } from "react";

const TimelapseSection = () => {
  const [descriptions, setDescriptions] = useState([
    "Подготовка фундамента",
    "Доставка материалов", 
    "Монтаж каркаса",
    "Возведение стен",
    "Завершение сруба",
    "Установка стропил",
    "Укладка кровли",
    "Монтаж окон и дверей",
    "Отделочные работы",
    "Баня под крышу готова"
  ]);

  const images = [
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/cdcf3631-b7df-42cd-bcc7-b1c596a60032.jpg",
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/6df753bf-661d-4e15-9a7d-4e2ce80581f2.jpg",
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/10be6644-ef88-4fb5-960a-0276f633cfe0.jpg",
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/1cfa4e6f-9219-4b70-a9ed-9033645333a8.jpg",
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/e4631dc6-3fc6-4a76-b6c3-06b05d99d4c6.jpg",
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/24eba619-7928-4ea2-bf89-a4cdf983f045.jpg",
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/4f833e4f-dbba-4154-8441-5eee49755494.jpg",
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/60642d90-bf95-4ebc-9c4b-d386206f5cd1.jpg",
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/64642ba9-89a2-40b1-8c8f-7d09f62e97b0.jpg",
    "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/716f0597-ce22-499c-a454-fcdf7d92b40c.jpg"
  ];

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  return (
    <section id="timelapse" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8">
            Пример строительства бани "под крышу" за 10 дней
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img 
                  src={image}
                  alt={`День ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-500 mb-1">
                  День {index + 1}
                </div>
                <input
                  type="text"
                  value={descriptions[index]}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className="w-full text-sm text-center bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none transition-colors px-2 py-1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelapseSection;