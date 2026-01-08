import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AboutSection = () => {
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
            <img 
              src="https://cdn.poehali.dev/files/IMG_20251211_114315 (2).jpg"
              alt="Мастер банных дел"
              className="rounded-lg shadow-xl w-full max-w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover object-[center_20%]"
            />
            <a href="tel:+79824900900" className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-2xl py-4 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-lg">
              <Icon name="Phone" size={28} />
              +7 (982) 490-09-00
            </a>
            <div className="flex items-center justify-center gap-4">
              <a href="https://wa.me/79824900900" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md">
                <Icon name="MessageCircle" size={28} className="text-white" />
              </a>
              <a href="https://t.me/+79824900900" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md">
                <Icon name="Send" size={28} className="text-white" />
              </a>
              <a href="https://my.mail.ru/mail/perm-par/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden shadow-md">
                <img src="https://cdn.poehali.dev/files/IlwnOob3_b8V56ug0ufBKQPFI6Di_pNsKHZUm7_yDwj0wSGwJVIhHVATvJ5AhTO56sg4PhSTOS7DvQ5swJRUSIh8.jpg" alt="МАКС" className="w-full h-full object-cover" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;