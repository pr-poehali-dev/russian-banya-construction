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
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="https://wa.me/79824900900" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Icon name="MessageCircle" size={24} className="text-white" />
              </a>
              <a href="https://t.me/+79824900900" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Icon name="Send" size={24} className="text-white" />
              </a>
              <a href="https://my.mail.ru/mail/perm-par/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Icon name="MessagesSquare" size={24} className="text-white" />
              </a>
              <a href="tel:+79824900900" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Icon name="Phone" size={24} className="text-white" />
              </a>
              <a href="tel:+79824900900" className="text-xl font-bold text-black hover:text-primary transition-colors">
                +7 (982) 490-09-00
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;