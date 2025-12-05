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
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <img 
                src="https://cdn.poehali.dev/files/fc416752-82eb-400e-999b-154b1184a5d9.jpg"
                alt="Банщик парит вениками в русской бане"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Почему именно русская баня?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Icon name="History" size={20} className="text-primary" />
                    Многовековые традиции
                  </h3>
                  <p className="text-muted-foreground">В отличии от финских саун и турецких хамамов, русская баня во все времена была приоритетным выбором для  русского человека. </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Heart" size={20} className="text-primary" />
                    Польза для организма человека
                  </h3>
                  <p className="text-muted-foreground">Только эффект русской бани создает полезное тепловое, механическое и психологическое воздействие на тело человека.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Hammer" size={20} className="text-primary" />
                    Традиционное мастерство
                  </h3>
                  <p className="text-muted-foreground">Сочетание традиции русского зодчества с современными качественными материалами, дают возможность превратить русскую баню в приятный и полезный процесс отдыха и восстановления сил.</p>
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
              { icon: "FileText", title: "Консультации", desc: "Перед началом строительства проводим полноценные бесплатные консультации по процессам парения, устройства бани, материалам, размерам и прочим очень важным вопросам." },
              { icon: "HardHat", title: "Строительство", desc: "Полный цикл строительных работ, внутренняя и внешняя отделка материалами премиум класса." },
              { icon: "Wrench", title: "Инженерные системы", desc: "Установка печи, водоснабжения, водоотведения, вентиляции, полков, электрики, отопления и т.д." },
              { icon: "Sparkles", title: "Дополнительно", desc: "Ремонт и модернизация существующих бань, террасы, банные чаны, купели" }
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
          <h2 className="text-4xl font-bold text-center mb-4">Галерея проектов</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Реализованные проекты наших клиентов</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/02b72ce5-c227-4d11-9961-e4766d044f51.jpg",
                title: "Баня «Зимний Сад»",
                size: "6×6 м",
                material: "Оцилиндрованное бревно",
                location: "Пермский край"
              },
              {
                img: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/0c011709-5a10-4cd1-90a3-4a82fc78f84f.jpg",
                title: "Баня «Премиум»",
                size: "8×10 м",
                material: "Профилированный брус",
                location: "г. Пермь"
              },
              {
                img: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/633c9042-bf90-4025-87c1-126072f6d674.jpg",
                title: "Баня «Компакт»",
                size: "4×5 м",
                material: "Оцилиндрованное бревно",
                location: "д. Кондратово"
              },
              {
                img: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/e278da1b-3b8d-48f4-8caf-a5547d0cb2ea.jpg",
                title: "Баня «Семейная»",
                size: "10×12 м",
                material: "Клееный брус",
                location: "КП Лесная поляна"
              },
              {
                img: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/9614f8ff-a336-43b5-903d-0c8f3b60b43e.jpg",
                title: "Баня «Модерн»",
                size: "7×8 м",
                material: "Профилированный брус",
                location: "г. Березники"
              },
              {
                img: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/588c3540-c8e5-4bda-8ed2-1a7310330dd1.jpg",
                title: "Баня «Классика»",
                size: "6×8 м",
                material: "Оцилиндрованное бревно",
                location: "с. Култаево"
              }
            ].map((project, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="overflow-hidden">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="Ruler" size={16} className="text-primary" />
                      <span>Размер: {project.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="TreePine" size={16} className="text-primary" />
                      <span>{project.material}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-yellow-400 text-black px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы начать строительство?</h2>
          <p className="text-xl mb-8">
            Свяжитесь с нами для бесплатной консультации и расчёта стоимости вашего проекта
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-4">
              <a href="https://wa.me/79824900900" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Icon name="MessageCircle" size={28} />
              </a>
              <a href="https://t.me/+79824900900" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Icon name="Send" size={28} />
              </a>
              <a href="tel:+79824900900" className="flex items-center gap-2 text-lg hover:opacity-80 transition-opacity">
                <Icon name="Phone" size={24} />
                +7 982 490-09-00
              </a>
            </div>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:t.ugol59@mail.ru" className="flex items-center gap-2 text-lg hover:opacity-80 transition-opacity">
              <Icon name="Mail" size={24} />
              t.ugol59@mail.ru
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2020г Пермский Пар. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;