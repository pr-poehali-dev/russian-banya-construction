import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/e5212274-23cb-48e3-a724-60171be466b0.jpg"
          alt="Парная с прямоугольной печью в облицовке камнем"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in max-w-full">
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-2 leading-tight">
          Строительство<br />русских бань
        </h1>
        <p className="text-lg sm:text-xl md:text-3xl mb-4 font-medium">из бревна и бруса</p>
        <p className="text-base sm:text-lg md:text-2xl mb-6 max-w-2xl mx-auto leading-relaxed px-2">
          Современные технологии и традиционные материалы для создания вашей идеальной бани
        </p>
        <Button size="lg" onClick={() => navigate("/order")} className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 bg-lime-400 hover:bg-lime-400 text-black font-bold transition-transform hover:scale-105 active:scale-95 whitespace-normal h-auto py-3 leading-tight max-w-[90vw]">
          Получить расчет стоимости бани бесплатно
        </Button>
      </div>
    </section>
  );
};
