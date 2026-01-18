import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/files/photo_2026-01-09_18-38-03.jpg"
          alt="Интерьер бани с деревянной отделкой"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in w-full">
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-2 leading-tight">
          Строим и ремонтируем бани<br />из бревна и бруса
        </h1>
        <p className="text-lg sm:text-xl md:text-3xl mb-4 font-medium">В Перми и Пермском крае</p>
        <p className="text-base sm:text-lg md:text-2xl mb-6 max-w-2xl mx-auto leading-relaxed px-2">
          Современные парные с эффектом "русской бани"
        </p>
        <Button size="lg" onClick={() => scrollToSection("order")} className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 bg-green-600 hover:bg-green-700 text-white font-bold transition-transform hover:scale-105 active:scale-95 whitespace-normal h-auto py-3 leading-tight max-w-[90vw]">
          Получить подробный расчет стоимости бани
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;