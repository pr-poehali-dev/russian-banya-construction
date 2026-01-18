import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const AboutSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    "https://cdn.poehali.dev/files/IMG_20251211_114315 (2).jpg",
    "https://cdn.poehali.dev/files/1a2c671f_20260118_152414_9991d4e8_req_b74b5eeb.jpg",
    "https://cdn.poehali.dev/files/IMG_1593.jpg",
    "https://cdn.poehali.dev/files/2026-01-18_19-59-32.png",
    "https://cdn.poehali.dev/files/photo_2026-01-17_09-58-59.jpg",
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 px-2">Обо мне</h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start w-full max-w-full mb-16">
          <div className="space-y-6 w-full max-w-full overflow-x-hidden">
            <div className="text-base md:text-base text-muted-foreground leading-relaxed space-y-4 break-words">
              <p className="text-lg font-bold text-black">
                Меня зовут Александр.<br />
                Я — специалист по строительству, модернизации и ремонту русских бань.
              </p>
              
              <p className="text-lg font-bold text-black">Моя цель — построить баню «под ключ», чтобы Вы получали удовольствие, полезные процедуры и настоящее парение в русской бане.</p>
            </div>
          </div>
          <div className="w-full max-w-full overflow-hidden space-y-4">
            <div className="relative rounded-lg shadow-xl overflow-hidden group">
              <img
                src={galleryImages[currentIndex]}
                alt={`Фото ${currentIndex + 1}`}
                className="w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover object-center cursor-pointer"
                onClick={() => setSelectedImage(galleryImages[currentIndex])}
              />
              
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              >
                <Icon name="ChevronLeft" size={24} className="text-white" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              >
                <Icon name="ChevronRight" size={24} className="text-white" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="https://wa.me/79824900900" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Icon name="MessageCircle" size={20} className="text-white" />
              </a>
              <a href="https://t.me/+79824900900" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Icon name="Send" size={20} className="text-white" />
              </a>
              <a href="https://my.mail.ru/mail/perm-par/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden">
                <img src="https://cdn.poehali.dev/files/IlwnOob3_b8V56ug0ufBKQPFI6Di_pNsKHZUm7_yDwj0wSGwJVIhHVATvJ5AhTO56sg4PhSTOS7DvQ5swJRUSIh8.jpg" alt="МАКС" className="w-full h-full object-cover" />
              </a>
              <a href="tel:+79824900900" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Icon name="Phone" size={20} className="text-white" />
              </a>
              <a href="tel:+79824900900" className="text-2xl font-bold text-black hover:text-primary transition-colors">
                +7 (982) 490-09-00
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8"></h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon name="Award" size={48} className="text-primary mb-4" />
              <p className="font-semibold text-black">Более 15 лет опыта в строительстве бань</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon name="Users" size={48} className="text-primary mb-4" />
              <p className="font-semibold text-black">Десятки успешных проектов и довольных клиентов</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon name="Flame" size={48} className="text-primary mb-4" />
              <p className="font-semibold text-black">Знание технологий и нюансов настоящего парения</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon name="Handshake" size={48} className="text-primary mb-4" />
              <p className="font-semibold text-black">Прямое участие в каждом проекте, от консультации до сдачи объекта</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon name="MessageSquare" size={48} className="text-primary mb-4" />
              <p className="font-semibold text-black">Бесплатные консультации по строительству, ремонту и технологиям парения в русских банях</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon name="MapPin" size={48} className="text-primary mb-4" />
              <p className="font-semibold text-black">Бесплатный выезд на объект для осмотра и замеров</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon name="Calculator" size={48} className="text-primary mb-4" />
              <p className="font-semibold text-black">Быстрый расчет стоимости строительства по авторской программе</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon name="FileText" size={48} className="text-primary mb-4" />
              <p className="font-semibold text-black">Подробная смета с учетом всех нюансов и пожеланий заказчика</p>
            </div>
          </div>
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl w-[95vw] p-0 [&>button]:bg-white [&>button]:text-black [&>button]:hover:bg-gray-200">
            <div className="relative flex items-center justify-center bg-black">
              <img
                src={selectedImage || ""}
                alt="Просмотр фото"
                className="max-w-[85vw] h-auto max-h-[90vh] object-contain"
              />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const index = galleryImages.indexOf(selectedImage || "");
                  const prevIndex = index > 0 ? index - 1 : galleryImages.length - 1;
                  setSelectedImage(galleryImages[prevIndex]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <Icon name="ChevronLeft" size={32} className="text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const index = galleryImages.indexOf(selectedImage || "");
                  const nextIndex = index < galleryImages.length - 1 ? index + 1 : 0;
                  setSelectedImage(galleryImages[nextIndex]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <Icon name="ChevronRight" size={32} className="text-white" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AboutSection;