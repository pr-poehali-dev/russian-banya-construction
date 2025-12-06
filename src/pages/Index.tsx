import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isButtonSticky, setIsButtonSticky] = useState(false);

  const projectGalleries = [
    [
      "https://cdn.poehali.dev/files/21891db6-8b5a-49ef-85a8-c1986de51d44.JPG",
      "https://cdn.poehali.dev/files/fd3c3beb-58e6-4d41-8f1c-16c4e6f576ac.JPG",
      "https://cdn.poehali.dev/files/9db95649-86f2-4493-be39-4d7acb47ba14.JPG",
      "https://cdn.poehali.dev/files/f92cf9b3-fcf2-45e8-942d-4af9154f1760.JPG",
      "https://cdn.poehali.dev/files/242e8fc2-f9ba-46fc-9bc3-657aa6915553.JPG",
      "https://cdn.poehali.dev/files/55a193e7-ac59-4782-9e54-0776e338f0af.JPG",
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
      "https://cdn.poehali.dev/files/0c49f489-1f6b-4479-8142-3603d899660a.png",
      "https://cdn.poehali.dev/files/9a264058-2d14-4695-bd33-455d0d97aad9.png",
      "https://cdn.poehali.dev/files/5b94e280-3e52-4724-9d15-ffe56a2b6bad.png",
      "https://cdn.poehali.dev/files/84798a93-dd08-41eb-b20d-1a3611acf1be.png",
      "https://cdn.poehali.dev/files/cca216a7-9b9e-425b-b0e4-d352cea5b6a4.png",
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
      "https://cdn.poehali.dev/files/475d1fc5-71db-4437-8990-d067b0a25d0c.jpg",
      "https://cdn.poehali.dev/files/7928a4f1-9c7c-43fd-ab17-6babb6e37be7.JPG",
      "https://cdn.poehali.dev/files/a468393d-98fc-4692-934b-115e4be196ad.JPG",
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

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsButtonSticky(heroBottom <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div className="text-left mt-2">
            <p className="text-sm text-black font-bold italic">Русская баня — это не помещение, это процесс!</p>
          </div>
        </nav>
        {isButtonSticky && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full py-3">
            <Button 
              size="lg" 
              onClick={() => navigate("/order")} 
              className="text-lg px-8 bg-lime-400 hover:bg-lime-400 text-black font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg animate-fade-in whitespace-nowrap"
            >
              Получить расчет стоимости бани бесплатно
            </Button>
          </div>
        )}
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
          <Button size="lg" onClick={() => navigate("/order")} className="text-lg px-8 bg-lime-400 hover:bg-lime-400 text-black font-bold transition-transform hover:scale-105 active:scale-95">
            Получить расчет стоимости бани бесплатно
          </Button>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "TreePine", title: "Натуральные современные материалы", desc: "Мы используем только отборную древесину, натуральные масла и воски, природный камень и современные высокоэффективные печи" },
              { icon: "Hammer", title: "Технологичное строительство", desc: "Строим парные с эффектом русской бани, с учетом традиций и современных тенденций в эстетическом и практическом использовании бани" },
              { icon: "Shield", title: "Гарантия качества", desc: "Опыт строительства более 15 лет. 5 лет гарантии на работы по договору, твердая смета, поэтапная оплата" }
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-start gap-2">
                    <Icon name={item.icon} className="text-primary flex-shrink-0 mt-1" size={48} />
                    {item.title}
                  </h3>
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
                className="rounded-lg shadow-xl mb-6"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Icon name="Flame" size={20} className="text-primary" />
                  Эффект русской бани
                </h3>
                <p className="text-muted-foreground"><strong>Эффект русской бани</strong> - это правильное соотношение <strong>температуры</strong> и <strong>влажности</strong> в парной. А так же, правильная конфигурация парной, выбор печи, устройство полков для парения, вентиляция. Для достижения такого эффекта, мы применяем опыт и знания физических процессов в парной и физиологии организма, современные материалы и технологии, а так же, собственный опыт и практику в парении.</p>
              </div>
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
                img: "https://cdn.poehali.dev/files/21891db6-8b5a-49ef-85a8-c1986de51d44.JPG",
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
                img: "https://cdn.poehali.dev/files/0c49f489-1f6b-4479-8142-3603d899660a.png",
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
                img: "https://cdn.poehali.dev/files/475d1fc5-71db-4437-8990-d067b0a25d0c.jpg",
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