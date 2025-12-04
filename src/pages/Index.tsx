import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-yellow-400 z-50 border-b border-yellow-500">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/e234d6d8-c101-4c8e-bf09-e9e9d739ad32.jpg" alt="Пермский Пар" className="h-12 w-12 object-contain bg-yellow-400 rounded" />
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-black leading-tight">Пермский Пар</div>
                <div className="text-xs text-black/70 -mt-0.5">строительная компания</div>
              </div>
            </div>
            <div className="hidden md:flex gap-8 items-center">
              <button onClick={() => scrollToSection("hero")} className="text-black hover:text-black/70 transition-colors font-medium">Главная</button>
              <button onClick={() => scrollToSection("about")} className="text-black hover:text-black/70 transition-colors font-medium">О бане</button>
              <button onClick={() => scrollToSection("services")} className="text-black hover:text-black/70 transition-colors font-medium">Услуги</button>
              <button onClick={() => scrollToSection("gallery")} className="text-black hover:text-black/70 transition-colors font-medium">Галерея</button>
              <button onClick={() => scrollToSection("contact")} className="text-black hover:text-black/70 transition-colors font-medium">Контакты</button>
              <a href="tel:+73422984030" className="text-black hover:text-black/70 transition-colors font-bold text-lg">+7 (342) 298-40-30</a>
            </div>
          </div>
        </nav>
      </header>

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/e5212274-23cb-48e3-a724-60171be466b0.jpg"
            alt="Парная с прямоугольной печью в облицовке камнем"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 leading-tight">
            Строительство<br />русских бань
          </h1>
          <p className="text-2xl md:text-3xl mb-6 font-medium">из бревна и бруса</p>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Современные технологии и традиционные материалы для создания вашей идеальной бани
          </p>
          <Button size="lg" onClick={() => navigate("/order")} className="text-lg px-8 bg-yellow-400 hover:bg-lime-400 text-black font-bold transition-colors">
            Получить расчет стоимости бани бесплатно
          </Button>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "TreePine", title: "Натуральные материалы", desc: "Используем только отборную древесину высшего качества" },
              { icon: "Shield", title: "Гарантия качества", desc: "10 лет гарантии на все виды работ" },
              { icon: "Clock", title: "Быстрое строительство", desc: "Завершим проект в согласованные сроки" }
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/ec71537c-0ec4-44a0-8c85-39bfa9caecd5.jpg"
                alt="Процесс парения с дубовыми вениками"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Почему именно русская баня?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Trees" size={20} className="text-primary" />
                    Древесина премиум-класса
                  </h3>
                  <p className="text-muted-foreground">
                    Работаем с северной сосной, кедром и липой. Каждое бревно проходит тщательный отбор и обработку по современным технологиям, сохраняя при этом все природные свойства древесины.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Zap" size={20} className="text-primary" />
                    Современные технологии
                  </h3>
                  <p className="text-muted-foreground">
                    Применяем инновационные методы строительства: каркасно-щитовые технологии, энергоэффективные системы утепления, экологичные пропитки для защиты древесины.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Hammer" size={20} className="text-primary" />
                    Традиционное мастерство
                  </h3>
                  <p className="text-muted-foreground">
                    Сочетаем вековые традиции русского зодчества с современными стандартами качества. Наши мастера имеют многолетний опыт работы с деревом.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "FileText", title: "Проектирование", desc: "Индивидуальный дизайн-проект с учетом всех ваших пожеланий" },
              { icon: "HardHat", title: "Строительство", desc: "Полный цикл строительных работ под ключ" },
              { icon: "Wrench", title: "Инженерные системы", desc: "Установка печи, водоснабжения, вентиляции" },
              { icon: "Sparkles", title: "Отделка", desc: "Внутренняя и внешняя отделка премиум-класса" }
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon name={service.icon} className="text-secondary" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{service.title}</h3>
                  <p className="text-muted-foreground text-sm text-center">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Галерея проектов</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/a040c8be-e5e8-4069-a009-40bf4ef7c865.jpg",
              "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/2b80b273-881a-45e4-a9ba-60507cce938d.jpg",
              "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/62ad4a24-dc5e-412f-8d37-6c9d9b6a30aa.jpg",
              "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/a040c8be-e5e8-4069-a009-40bf4ef7c865.jpg",
              "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/2b80b273-881a-45e4-a9ba-60507cce938d.jpg",
              "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/62ad4a24-dc5e-412f-8d37-6c9d9b6a30aa.jpg"
            ].map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg aspect-[4/3] hover:shadow-xl transition-all">
                <img 
                  src={img}
                  alt={`Проект ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">Проект {idx + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-primary text-primary-foreground px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы начать строительство?</h2>
          <p className="text-xl mb-8 opacity-90">
            Свяжитесь с нами для бесплатной консультации и расчёта стоимости вашего проекта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+79001234567" className="flex items-center gap-2 text-lg hover:opacity-80 transition-opacity">
              <Icon name="Phone" size={20} />
              +7 (900) 123-45-67
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:info@banya.ru" className="flex items-center gap-2 text-lg hover:opacity-80 transition-opacity">
              <Icon name="Mail" size={20} />
              info@banya.ru
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Русская Баня. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;