import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ServicesSection = () => {
  const services = [
    { icon: "FileText", title: "Консультации", desc: "Перед началом строительства проводим полноценные бесплатные консультации по процессам парения, устройства бани, материалам, размерам и прочим очень важным вопросам." },
    { icon: "HardHat", title: "Строительство", desc: "Полный цикл строительных работ, внутренняя и внешняя отделка материалами премиум класса." },
    { icon: "Wrench", title: "Инженерные системы", desc: "Установка печи, водоснабжения, водоотведения, вентиляции, полков, электрики, отопления и т.д." },
    { icon: "Sparkles", title: "Дополнительно", desc: "Ремонт и модернизация существующих бань, террасы, банные чаны, купели" }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 w-full overflow-x-hidden">
      <div className="container mx-auto w-full max-w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 px-2">Наши услуги</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-full">
          {services.map((service, idx) => (
            <Card key={idx} className="w-full max-w-full">
              <CardContent className="pt-6 overflow-x-hidden">
                <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Icon name={service.icon} className="text-secondary" size={28} />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center break-words">{service.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm text-center break-words">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
