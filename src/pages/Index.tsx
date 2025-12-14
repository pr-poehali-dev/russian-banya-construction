import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrderFormSection from "@/components/OrderFormSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const projectGalleries = [
    [
      "https://cdn.poehali.dev/files/photo_2025-12-11_22-03-04.jpg",
      "https://cdn.poehali.dev/files/fd3c3beb-58e6-4d41-8f1c-16c4e6f576ac.JPG",
      "https://cdn.poehali.dev/files/9db95649-86f2-4493-be39-4d7acb47ba14.JPG",
      "https://cdn.poehali.dev/files/55a193e7-ac59-4782-9e54-0776e338f0af.JPG",
      "https://cdn.poehali.dev/files/242e8fc2-f9ba-46fc-9bc3-657aa6915553.JPG",
      "https://cdn.poehali.dev/files/f92cf9b3-fcf2-45e8-942d-4af9154f1760.JPG",
      "https://cdn.poehali.dev/files/c3f01861-ddfa-4365-8096-45ee644563d6.JPG",
      "https://cdn.poehali.dev/files/e612108f-9639-4eb8-92eb-7cf986c34f31.JPG",
      "https://cdn.poehali.dev/files/4e6b64a3-b7b3-4fba-af24-07ed8c17bd82.JPG",
      "https://cdn.poehali.dev/files/506ae37e-28ae-471e-8156-6c28ca4ba9db.JPG",
      "https://cdn.poehali.dev/files/1bb8c944-bfa2-42a5-b390-65e6df6dd5d6.JPG",
      "https://cdn.poehali.dev/files/89e29cc4-9f5e-4937-b56c-4be50d10f14d.JPG",
      "https://cdn.poehali.dev/files/f820bbd0-2db4-4948-978c-a3840219ebfa.JPG",
      "https://cdn.poehali.dev/files/dce63058-7770-4a36-b3a0-be7ccc1b6da8.JPG",
      "https://cdn.poehali.dev/files/6a05e040-7656-499e-bd66-509b5cea6a23.JPG",
      "https://cdn.poehali.dev/files/2d422aac-2e42-4cbf-a15d-1652c949d423.JPG",
      "https://cdn.poehali.dev/files/9b750020-b2e4-4e44-b917-a6f6a3c32043.JPG",
      "https://cdn.poehali.dev/files/bac906e9-8def-470a-9125-96dd78fc1a64.JPG",
      "https://cdn.poehali.dev/files/a485a14f-4056-4ba8-ba35-9aa846b2a045.JPG"
    ],
    [
      "https://cdn.poehali.dev/files/e145e902-0d5a-4598-9062-6395356985f0.jpg",
      "https://cdn.poehali.dev/files/44a34322-94c4-4927-b372-e632bd76e8c3.png",
      "https://cdn.poehali.dev/files/7c45af13-f389-40c5-a0ec-e0bed1884fef.jpg",
      "https://cdn.poehali.dev/files/cfa7f22e-7434-41a8-83cb-57c58472a187.jpg",
      "https://cdn.poehali.dev/files/0d1e0e9b-67ef-4b9f-8a21-913de4d4c829.jpg",
      "https://cdn.poehali.dev/files/4b438963-c14c-4a31-a4f6-dddd9a791e0c.jpg",
      "https://cdn.poehali.dev/files/6c712b7d-0a01-41fe-89c1-29ec45bad1dd.jpg"
    ],
    [
      "https://cdn.poehali.dev/files/1d9d6ed2-45ec-4f8f-a51f-bc5915cdd76a.jpg",
      "https://cdn.poehali.dev/files/2451e998-d599-4eeb-8bf3-8585ffab4342.jpg",
      "https://cdn.poehali.dev/files/48198ca6-3425-4781-aba7-849426247fc4.jpg",
      "https://cdn.poehali.dev/files/1f94dc5e-69ba-4805-8f4b-ca5bbf6a404c.jpg",
      "https://cdn.poehali.dev/files/e9474b80-69ae-4a00-8574-c27200bb57ba.jpg"
    ],
    [
      "https://cdn.poehali.dev/files/cca216a7-9b9e-425b-b0e4-d352cea5b6a4.png",
      "https://cdn.poehali.dev/files/9a264058-2d14-4695-bd33-455d0d97aad9.png",
      "https://cdn.poehali.dev/files/5b94e280-3e52-4724-9d15-ffe56a2b6bad.png",
      "https://cdn.poehali.dev/files/84798a93-dd08-41eb-b20d-1a3611acf1be.png",
      "https://cdn.poehali.dev/files/0c49f489-1f6b-4479-8142-3603d899660a.png",
      "https://cdn.poehali.dev/files/7062d1f4-7309-472d-bc60-6819f57dbd2f.png",
      "https://cdn.poehali.dev/files/aec4a2ca-0cc4-45f5-8a1f-76001cdb8530.png",
      "https://cdn.poehali.dev/files/61280d11-4eee-40f4-9105-3a20b63619e0.jpg",
      "https://cdn.poehali.dev/files/0b03e8cf-ef69-475b-a180-72929c4813b6.jpg",
      "https://cdn.poehali.dev/files/35c2929b-6726-4db3-aa64-52835d7f9c45.jpg"
    ],
    [
      "https://cdn.poehali.dev/files/cdfc8af5-e7bc-49ee-96c8-0b9b3dced3af.JPG",
      "https://cdn.poehali.dev/files/f919fd01-44da-4352-a059-ce1887970b68.JPG",
      "https://cdn.poehali.dev/files/0d341b86-5a44-457e-8b25-aed527fa0319.JPG",
      "https://cdn.poehali.dev/files/6985144b-f603-4f7c-8c6a-4f5621ba2438.JPG",
      "https://cdn.poehali.dev/files/ff9e85d0-683d-48ed-b9d8-ada1dc2b48c5.JPG",
      "https://cdn.poehali.dev/files/e8b09492-d10f-4b61-85b2-578f1cad9d2d.JPG",
      "https://cdn.poehali.dev/files/7351792a-30f0-45d4-ba22-5323e33fac9b.JPG",
      "https://cdn.poehali.dev/files/149818f6-0f8d-406f-802c-236ae430f5a2.JPG",
      "https://cdn.poehali.dev/files/91e41b87-6743-4d3e-b213-8775f982bc1d.JPG",
      "https://cdn.poehali.dev/files/7f87c675-ab58-4042-8cec-6640cc6ab8fe.JPG"
    ],
    [
      "https://cdn.poehali.dev/files/a468393d-98fc-4692-934b-115e4be196ad.JPG",
      "https://cdn.poehali.dev/files/7928a4f1-9c7c-43fd-ab17-6babb6e37be7.JPG",
      "https://cdn.poehali.dev/files/475d1fc5-71db-4437-8990-d067b0a25d0c.jpg",
      "https://cdn.poehali.dev/files/ce713e72-983e-416c-bc45-d51e637013a5.JPG",
      "https://cdn.poehali.dev/files/5dc59788-ab7e-495e-97d4-952d49b7306f.JPG",
      "https://cdn.poehali.dev/files/22192856-ed5b-412f-9622-18c712999ffa.JPG",
      "https://cdn.poehali.dev/files/ef3fe192-94c4-4d6a-871c-2420502aaa8f.JPG"
    ]
  ];

  const openGallery = (projectIndex: number) => {
    if (projectGalleries[projectIndex].length > 0) {
      setSelectedProject(projectIndex);
      setCurrentImageIndex(0);
    }
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject !== null) {
      setCurrentImageIndex((prev) => 
        prev < projectGalleries[selectedProject].length - 1 ? prev + 1 : prev
      );
    }
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (selectedProject !== null) {
        e.preventDefault();
        if (e.deltaY > 0) {
          nextImage();
        } else if (e.deltaY < 0) {
          prevImage();
        }
      }
    };

    if (selectedProject !== null) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [selectedProject, currentImageIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 w-full bg-yellow-400 z-50 border-b-2 border-yellow-500">
        <nav className="container mx-auto px-3 sm:px-6 py-1 relative">
          <div className="flex items-start justify-between w-full">
            <div className="flex items-start gap-2 mt-1">
              <img src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/e234d6d8-c101-4c8e-bf09-e9e9d739ad32.jpg" alt="Пермский Пар" className="h-8 w-8 md:h-10 md:w-10 object-contain bg-yellow-400 rounded" />
              <div className="flex flex-col items-start">
                <div className="text-xl md:text-2xl font-bold text-black leading-tight">Пермский Пар</div>
                <div className="text-[9px] md:text-[10px] text-black/70 -mt-0.5">строительная компания г.Пермь</div>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-1">
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
              <div className="hidden md:flex flex-col items-start gap-1">
                <a href="tel:+73422984030" className="text-black hover:text-black/70 transition-colors font-bold text-[18px] leading-tight flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (342) 298-40-30
                </a>
                <a href="tel:+79824900900" className="text-black hover:text-black/70 transition-colors font-bold text-[18px] leading-tight flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (982) 490-09-00
                </a>
                <div className="flex items-start gap-2 text-black/70 text-[11px] mt-1">
                  <Icon name="Clock" size={14} />
                  <div className="flex flex-col items-start">
                    <span>Пн-Пт 08.00-20.00</span>
                    <span>Сб-Вс 10.00-15.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex gap-3 lg:gap-6 items-start absolute left-1/2 -translate-x-1/2 top-1 whitespace-nowrap">
            <button onClick={() => scrollToSection("hero")} className="text-black hover:text-black/70 transition-colors font-medium text-sm lg:text-base">Главная</button>
            <button onClick={() => scrollToSection("about")} className="text-black hover:text-black/70 transition-colors font-medium text-sm lg:text-base">Обо мне</button>
            <button onClick={() => scrollToSection("gallery")} className="text-black hover:text-black/70 transition-colors font-medium text-sm lg:text-base">Галерея</button>
            <button onClick={() => scrollToSection("order")} className="text-black hover:text-black/70 transition-colors font-medium text-sm lg:text-base">Калькулятор</button>
            <button onClick={() => scrollToSection("services")} className="text-black hover:text-black/70 transition-colors font-medium text-sm lg:text-base">Услуги</button>
            <button onClick={() => scrollToSection("contact")} className="text-black hover:text-black/70 transition-colors font-medium text-sm lg:text-base">Контакты</button>
            <button onClick={() => navigate('/tour-guides')} className="text-black hover:bg-yellow-500 transition-colors font-medium text-sm lg:text-base bg-yellow-500 px-3 py-1 rounded-md">Гиды</button>
          </div>
          <div className="text-center px-1 absolute left-1/2 -translate-x-1/2 top-14">
            <p className="text-xs sm:text-sm text-black font-medium whitespace-nowrap">Русская баня — это не помещение, это процесс!</p>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden fixed top-[100px] left-0 right-0 bg-yellow-400 border-t border-yellow-500 shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto">
              <div className="flex flex-col py-2">
                <button onClick={() => { scrollToSection("hero"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Главная</button>
                <button onClick={() => { scrollToSection("about"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Обо мне</button>
                <button onClick={() => { scrollToSection("gallery"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Галерея</button>
                <button onClick={() => { scrollToSection("order"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Калькулятор</button>
                <button onClick={() => { scrollToSection("services"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Услуги</button>
                <button onClick={() => { scrollToSection("contact"); setIsMobileMenuOpen(false); }} className="text-black hover:bg-yellow-500 transition-colors font-medium py-3 px-4 text-left">Контакты</button>
                <button onClick={() => { navigate('/tour-guides'); setIsMobileMenuOpen(false); }} className="text-black bg-yellow-500 hover:bg-yellow-600 transition-colors font-bold py-3 px-4 text-left">🗺️ Сайт гидов</button>
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

      </header>

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
        <div className="absolute inset-0">
          <img 
            src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/e5212274-23cb-48e3-a724-60171be466b0.jpg"
            alt="Парная с прямоугольной печью в облицовке камнем"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in w-full">
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-2 leading-tight">
            Строим бани<br />из бревна и бруса
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



      <section id="about" className="py-20 px-4 sm:px-6 w-full overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Обо мне</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>Меня зовут Александр. Я — специалист по строительству русских бань с огромным стажем и любовью к своему делу.</p>
                <p>Моя цель — чтобы вы не просто получили баню, а открыли для себя настоящее удовольствие от живого пара, тепла дерева и уюта, в котором хочется остаться надолго.</p>
                <p>Обладаю глубоким знанием традиционных технологий и нюансов настоящего русского парения. Подхожу к каждому проекту с душой: помогаю с выбором материалов, продумываю планировку до мелочей и слежу за каждым этапом строительства.</p>
                <p>За моими плечами больше 15 лет опыта, десятки успешных проектов и довольных клиентов.</p>
              </div>
              <div className="flex justify-center md:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection("order")} 
                  className="text-sm md:text-lg px-6 md:px-8 bg-green-600 hover:bg-green-700 text-white font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg w-full md:w-auto"
                >
                  Получить подробный расчет стоимости бани
                </Button>
              </div>
            </div>
            <div>
              <img 
                src="https://cdn.poehali.dev/files/IMG_20251211_114315 (2).jpg"
                alt="Мастер банных дел"
                className="rounded-lg shadow-xl w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover object-[center_20%]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-muted/30 px-4 sm:px-6 w-full overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Несколько примеров построенных бань и парных</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: "https://cdn.poehali.dev/files/photo_2025-12-11_22-03-04.jpg",
                title: "Баня из бревна 6×12",
                size: "6×12 м",
                material: "Оцилиндрованное бревно",
                location: "Резиденция \"Веретье\", Пермский край"
              },
              {
                img: "https://cdn.poehali.dev/files/e145e902-0d5a-4598-9062-6395356985f0.jpg",
                title: "Баня из бревна 3×6",
                size: "3×6 м",
                material: "Оцилиндрованное бревно",
                location: "д. Гамы, Пермский край"
              },
              {
                img: "https://cdn.poehali.dev/files/1d9d6ed2-45ec-4f8f-a51f-bc5915cdd76a.jpg",
                title: "Баня из бревна 6×6",
                size: "6×6 м",
                material: "Рубленное бревно",
                location: "д. Скобелевка, Пермский край"
              },
              {
                img: "https://cdn.poehali.dev/files/cca216a7-9b9e-425b-b0e4-d352cea5b6a4.png",
                title: "Баня из бруса 6×6",
                size: "6×6 м",
                material: "Профилированный брус",
                location: "д. Красная Слудка, Пермский край"
              },
              {
                img: "https://cdn.poehali.dev/files/cdfc8af5-e7bc-49ee-96c8-0b9b3dced3af.JPG",
                title: "Баня из бруса 6×8",
                size: "6×8 м",
                material: "Брус естественной влажности",
                location: "г. Добрянка, Пермский край"
              },
              {
                img: "https://cdn.poehali.dev/files/a468393d-98fc-4692-934b-115e4be196ad.JPG",
                title: "Баня из бревна 5×5",
                size: "5×5 м",
                material: "Оцилиндрованное бревно",
                location: "п. Усть-Качка, Пермский край"
              }
            ].map((project, idx) => (
              <Card 
                key={idx} 
                className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer"
                onClick={() => openGallery(idx)}
              >
                <div className="overflow-hidden relative group">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className={`w-full h-64 object-cover hover:scale-110 transition-transform duration-500 ${idx === 0 ? 'object-[70%_center]' : ''}`}
                  />
                  {projectGalleries[idx].length > 0 && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center">
                        <Icon name="Images" size={40} className="mx-auto mb-2" />
                        <p className="text-lg font-semibold">{projectGalleries[idx].length} фото</p>
                      </div>
                    </div>
                  )}
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

      <OrderFormSection />

      <section id="services" className="py-20 px-4 sm:px-6 w-full overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "FileText", title: "Консультации", desc: "Перед началом строительства проводим полноценные бесплатные консультации по процессам парения, устройства бани, материалам, размерам и прочим очень важным вопросам." },
              { icon: "HardHat", title: "Строительство", desc: "Полный цикл строительных работ, внутренняя и внешняя отделка материалами премиум класса." },
              { icon: "Wrench", title: "Инженерные системы", desc: "Установка печи, водоснабжения, водоотведения, вентиляции, полков, электрики, отопления и т.д." },
              { icon: "Sparkles", title: "Дополнительно", desc: "Ремонт и модернизация существующих бань, террасы, банные чаны, купели" }
            ].map((service, idx) => (
              <Card key={idx}>
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

      <Dialog open={selectedProject !== null} onOpenChange={closeGallery}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto" hideClose>
          {selectedProject !== null && (
            <div className="relative">
              <img 
                src={projectGalleries[selectedProject][currentImageIndex]} 
                alt={`Фото ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[50vh] object-contain rounded-lg"
              />
              <div className="flex items-center justify-between mt-4">
                <Button 
                  variant="outline" 
                  onClick={prevImage} 
                  disabled={currentImageIndex === 0}
                  size="icon"
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentImageIndex + 1} / {projectGalleries[selectedProject].length}
                </span>
                <Button 
                  variant="outline" 
                  onClick={nextImage} 
                  disabled={currentImageIndex === projectGalleries[selectedProject].length - 1}
                  size="icon"
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1.5 mt-3">
                {projectGalleries[selectedProject].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Миниатюра ${idx + 1}`}
                    className={`w-full h-12 object-cover rounded cursor-pointer border-2 transition-all ${
                      idx === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-primary/50'
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <section id="contact" className="py-12 sm:py-20 bg-yellow-400 text-black px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Готовы начать строительство?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
            Свяжитесь с нами для бесплатной консультации и расчёта стоимости вашего проекта
          </p>
          <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a href="https://wa.me/79824900900" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Icon name="MessageCircle" size={28} />
              </a>
              <a href="https://t.me/+79824900900" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Icon name="Send" size={28} />
              </a>
              <a href="tel:+79824900900" className="flex items-center gap-2 text-base sm:text-lg hover:opacity-80 transition-opacity">
                <Icon name="Phone" size={24} />
                <span className="whitespace-nowrap">+7 982 490-09-00</span>
              </a>
            </div>
            <a href="mailto:perm-par@mail.ru" className="flex items-center gap-2 text-base sm:text-lg hover:opacity-80 transition-opacity break-all">
              <Icon name="Mail" size={24} />
              <span className="break-all">perm-par@mail.ru</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border px-4 sm:px-6 w-full overflow-hidden">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2020г Пермский Пар. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;