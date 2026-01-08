import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface HeaderProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const Header = ({ activeSection, scrollToSection }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const menuItems = [
    { id: "hero", label: "Главная" },
    { id: "about", label: "О мастере" },
    { id: "gallery", label: "Проекты" },
    { id: "order", label: "Калькулятор" },
    { id: "services", label: "Услуги" }
  ];

  return (
    <header className="fixed top-0 w-full bg-yellow-400 shadow-md z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl md:text-3xl font-black text-black">Пермский Пар</div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`text-black hover:bg-gray-100 transition-colors font-bold ${
                  activeSection === item.id ? "bg-gray-100" : ""
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a href="tel:+79824900900">
              <Button size="lg" className="bg-black hover:bg-black/90 text-yellow-400 font-bold">
                <Icon name="Phone" size={20} />
                +7 (982) 490-09-00
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-black hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[72px] left-0 w-full bg-yellow-400 shadow-lg border-t border-gray-200">
            <div className="flex flex-col py-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-black hover:bg-gray-100 transition-colors font-bold text-lg py-3 justify-start px-4 ${
                    activeSection === item.id ? "bg-gray-100" : ""
                  }`}
                >
                  {item.label}
                </Button>
              ))}
              <div className="border-t border-gray-200 my-2"></div>
              <a href="tel:+79824900900" className="text-black hover:bg-gray-100 transition-colors font-bold text-lg py-3 px-4 text-left flex items-center gap-2">
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
    </header>
  );
};

export default Header;