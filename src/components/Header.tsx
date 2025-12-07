import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isButtonSticky: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  scrollToSection: (id: string) => void;
}

export const Header = ({ isButtonSticky, isMobileMenuOpen, setIsMobileMenuOpen, scrollToSection }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-yellow-400 z-50 border-b border-yellow-500">
      <nav className="container mx-auto px-3 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/e234d6d8-c101-4c8e-bf09-e9e9d739ad32.jpg" alt="Пермский Пар" className="h-10 w-10 sm:h-12 sm:w-12 object-contain bg-yellow-400 rounded" />
            <div className="flex flex-col items-start">
              <div className="text-lg sm:text-2xl font-bold text-black leading-tight">Пермский Пар</div>
              <div className="text-[10px] sm:text-xs text-black/70 -mt-0.5">строительная компания</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:+73422984030" className="md:hidden text-black hover:text-black/70 transition-colors">
              <Icon name="Phone" size={24} />
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden text-black hover:text-black/70 transition-colors"
              aria-label="Меню"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={28} />
            </button>
            <div className="hidden md:flex gap-8 items-center">
              <button onClick={() => scrollToSection("hero")} className="text-black hover:text-black/70 transition-colors font-medium">Главная</button>
              <button onClick={() => scrollToSection("about")} className="text-black hover:text-black/70 transition-colors font-medium">О бане</button>
              <button onClick={() => scrollToSection("services")} className="text-black hover:text-black/70 transition-colors font-medium">Услуги</button>
              <button onClick={() => scrollToSection("gallery")} className="text-black hover:text-black/70 transition-colors font-medium">Галерея</button>
              <button onClick={() => scrollToSection("contact")} className="text-black hover:text-black/70 transition-colors font-medium">Контакты</button>
              <a href="tel:+73422984030" className="text-black hover:text-black/70 transition-colors font-bold text-lg">+7 (342) 298-40-30</a>
            </div>
          </div>
        </div>
        <div className="text-left mt-1 sm:mt-2 px-1">
          <p className="text-xs sm:text-sm text-black font-bold italic">Русская баня — это не помещение, это процесс!</p>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-[100px] left-0 right-0 bg-yellow-400 border-t border-yellow-500 shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col py-2">
              <button onClick={() => { scrollToSection("hero"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Главная</button>
              <button onClick={() => { scrollToSection("about"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">О бане</button>
              <button onClick={() => { scrollToSection("services"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Услуги</button>
              <button onClick={() => { scrollToSection("gallery"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Галерея</button>
              <button onClick={() => { scrollToSection("contact"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Контакты</button>
              <a href="tel:+73422984030" className="text-black hover:bg-yellow-500 transition-colors font-bold py-3 px-4 text-left flex items-center gap-2">
                <Icon name="Phone" size={20} />
                +7 (342) 298-40-30
              </a>
            </div>
          </div>
        )}
      </nav>
      {isButtonSticky && (
        <div className="fixed left-0 right-0 bottom-4 px-4 flex justify-center z-40 pointer-events-none">
          <Button 
            size="lg" 
            onClick={() => navigate("/order")} 
            className="pointer-events-auto text-xs sm:text-sm md:text-lg px-3 sm:px-6 md:px-8 bg-lime-400 hover:bg-lime-400 text-black font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg animate-fade-in whitespace-normal h-auto py-2 sm:py-3 leading-tight max-w-[95vw] w-full sm:w-auto"
          >
            Получить расчет стоимости бани бесплатно
          </Button>
        </div>
      )}
    </header>
  );
};