import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const AboutSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    "https://cdn.poehali.dev/files/IMG_20251211_114315 (2).jpg",
    "https://cdn.poehali.dev/files/2025-02-11 15-01-22.JPG",
    "https://cdn.poehali.dev/files/IMG_1593.jpg",
    "https://cdn.poehali.dev/files/IMG_2984.jpg",
    "https://cdn.poehali.dev/files/photo_2026-01-17_09-58-59.jpg",
    "https://cdn.poehali.dev/files/photo_2026-01-18_19-06-10.jpg",
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 px-2">Обо мне</h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start w-full max-w-full">
          <div className="space-y-6 w-full max-w-full overflow-x-hidden">
            <div className="text-base md:text-base text-muted-foreground leading-relaxed space-y-4 break-words">
              <p className="text-lg font-bold text-black">
                Меня зовут Александр.<br />
                Я — специалист по строительству, модернизации и ремонту русских бань.
              </p>
              
              <div className="flex items-start gap-3">
                <Icon name="Award" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-black text-sm">Более 15 лет опыта в строительстве бань</p>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="Users" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-black text-sm">Десятки успешных проектов и довольных клиентов</p>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="Flame" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-black text-sm">Знание технологий и нюансов настоящего парения</p>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="Handshake" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-black text-sm">Прямое участие в каждом проекте, от консультации до сдачи</p>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="MessageSquare" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-black text-sm">Бесплатные консультации по строительству, ремонту и технологиям парения в русских банях</p>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-black text-sm">Бесплатный выезд на объект для осмотра и замеров</p>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="Calculator" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-black text-sm">Быстрый расчет стоимости строительства по авторской программе</p>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="FileText" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="font-semibold text-black text-sm">Подробная смета с учетом всех нюансов и пожеланий заказчика</p>
              </div>

              <p className="text-lg font-bold text-black">Моя цель — построить баню «под ключ», чтобы Вы получали удовольствие, полезные процедуры и настоящее парение в русской бане.</p>
            </div>
          </div>
          <div className="w-full max-w-full overflow-hidden space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity shadow-lg"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Фото ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
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

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-full p-0">
            <div className="relative">
              <img
                src={selectedImage || ""}
                alt="Просмотр фото"
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryImages.indexOf(selectedImage || "");
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
                  setSelectedImage(galleryImages[prevIndex]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <Icon name="ChevronLeft" size={32} className="text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryImages.indexOf(selectedImage || "");
                  const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
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