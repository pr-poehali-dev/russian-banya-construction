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
    <header className="fixed top-0 w-full bg-yellow-400 z-50 border-b-2 border-yellow-500">
      <nav className="container mx-auto px-3 sm:px-6 py-1">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-start gap-2 sm:gap-3">
            <img src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/e234d6d8-c101-4c8e-bf09-e9e9d739ad32.jpg" alt="Пермский Пар" className="h-10 w-10 sm:h-12 sm:w-12 object-contain bg-yellow-400 rounded" />
            <div className="flex flex-col items-start">
              <div className="text-lg sm:text-2xl font-bold text-black leading-tight">Пермский Пар</div>
              <div className="text-[10px] sm:text-xs text-black/70 -mt-0.5">строительная компания г.Пермь</div>
            </div>
          </div>
          <div className="flex items-start gap-3 mt-0">
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
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between w-full mt-2">
          <div className="flex-1"></div>
          <div className="flex gap-6 items-center">
            <button onClick={() => scrollToSection("hero")} className="text-black hover:text-black/70 transition-colors font-medium">Главная</button>
            <button onClick={() => scrollToSection("about")} className="text-black hover:text-black/70 transition-colors font-medium">О бане</button>
            <button onClick={() => scrollToSection("services")} className="text-black hover:text-black/70 transition-colors font-medium">Услуги</button>
            <button onClick={() => scrollToSection("gallery")} className="text-black hover:text-black/70 transition-colors font-medium">Галерея</button>
            <button onClick={() => scrollToSection("contact")} className="text-black hover:text-black/70 transition-colors font-medium">Контакты</button>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col items-start gap-1">
              <a href="tel:+73422984030" className="text-black hover:text-black/70 transition-colors font-bold text-[18px] leading-tight flex items-center gap-2">
                <Icon name="Phone" size={18} />
                +7 (342) 298-40-30
              </a>
              <a href="tel:+79824900900" className="text-black hover:text-black/70 transition-colors font-bold text-[18px] leading-tight flex items-center gap-2">
                <Icon name="Phone" size={18} />
                +7 (982) 490-09-00
              </a>
              <div className="flex items-center gap-2 text-black/70 text-[11px] mt-1">
                <Icon name="Clock" size={14} />
                <div className="flex gap-3">
                  <span>Пн-Пт 08.00-20.00</span>
                  <span>Сб-Вс 10.00-15.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-left px-1">
          <p className="text-xs sm:text-sm text-black font-medium">Русская баня — это не помещение, это процесс!</p>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-[100px] left-0 right-0 bg-yellow-400 border-t border-yellow-500 shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col py-2">
              <button onClick={() => { scrollToSection("hero"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Главная</button>
              <button onClick={() => { scrollToSection("about"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">О бане</button>
              <button onClick={() => { scrollToSection("services"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Услуги</button>
              <button onClick={() => { scrollToSection("gallery"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Галерея</button>
              <button onClick={() => { scrollToSection("contact"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Контакты</button>
              <a href="tel:+73422984030" className="text-black hover:bg-yellow-500 transition-colors font-bold text-lg py-3 px-4 text-left flex items-center gap-2">
                <Icon name="Phone" size={20} />
                +7 (342) 298-40-30
              </a>
              <a href="tel:+79824900900" className="text-black hover:bg-yellow-500 transition-colors font-bold text-lg py-3 px-4 text-left flex items-center gap-2">
                <Icon name="Phone" size={20} />
                +7 (982) 490-09-00
              </a>
              <div className="px-4 py-2 text-black/70 text-sm">
                <div>Пн-Пт 08.00-20.00</div>
                <div>Сб-Вс 10.00-15.00</div>
              </div>
            </div>
          </div>
        )}
      </nav>
      {isButtonSticky && (
        <div className="fixed left-0 right-0 bottom-4 px-4 flex justify-center z-40 pointer-events-none">
          <Button 
            size="lg" 
            onClick={() => navigate("/order")} 
            className="pointer-events-auto text-xs sm:text-sm md:text-lg px-3 sm:px-6 md:px-8 bg-green-600 hover:bg-green-700 text-white font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg animate-fade-in whitespace-normal h-auto py-2 sm:py-3 leading-tight max-w-[95vw] w-full sm:w-auto"
          >
            Получить подробный расчет стоимости бани
          </Button>
        </div>
      )}
    </header>
  );
};