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
    { id: "about", label: "Обо мне" },
    { id: "services", label: "Услуги" },
    { id: "gallery", label: "Галерея" },
    { id: "order", label: "Контакты" }
  ];

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-2xl md:text-3xl font-black text-primary">Пермский Пар</div>
            <div className="text-xs md:text-sm text-muted-foreground">строительная компания г.Пермь</div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`hover:bg-primary/10 transition-colors ${
                  activeSection === item.id ? "bg-primary/10 text-primary" : ""
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex flex-col text-right text-sm">
              <a href="tel:+73422984030" className="hover:text-primary transition-colors">+7 (342) 298-40-30</a>
              <a href="tel:+79824900900" className="hover:text-primary transition-colors">+7 (982) 490-09-00</a>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[72px] left-0 w-full bg-white shadow-lg border-t">
            <div className="flex flex-col py-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`hover:bg-primary/10 transition-colors text-lg py-3 justify-start ${
                    activeSection === item.id ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  {item.label}
                </Button>
              ))}
              <div className="border-t my-2"></div>
              <a href="tel:+73422984030" className="hover:bg-primary/10 transition-colors text-lg py-3 px-4 text-left flex items-center gap-2">
                <Icon name="Phone" size={20} />
                +7 (342) 298-40-30
              </a>
              <a href="tel:+79824900900" className="hover:bg-primary/10 transition-colors text-lg py-3 px-4 text-left flex items-center gap-2">
                <Icon name="Phone" size={20} />
                +7 (982) 490-09-00
              </a>
              <div className="px-4 py-2 text-muted-foreground text-sm">
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