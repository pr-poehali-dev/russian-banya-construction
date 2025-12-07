import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export const ContentSections = () => {
  return (
    <>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "TreePine", title: "Натуральные современные материалы", desc: "Мы используем только отборную древесину, натуральные масла и воски, природный камень и современные высокоэффективные печи" },
              { icon: "Hammer", title: "Технологичное строительство", desc: "Строим парные с эффектом русской бани, с учетом традиций и современных тенденций в эстетическом и практическом использовании бани" },
              { icon: "Shield", title: "Гарантия качества", desc: "Опыт строительства более 15 лет. 5 лет гарантии на работы по договору, твердая смета, поэтапная оплата" }
            ].map((item, idx) => (
              <Card key={idx}>
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
              <h2 className="text-4xl font-bold mb-6">О русской бане</h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Русская баня — это не просто помещение, это целая философия здоровья и отдыха. 
                  В отличие от сауны, русская баня характеризуется умеренной температурой (60-70°C) 
                  и высокой влажностью (60-80%), что создаёт особый микроклимат.
                </p>
                <p>
                  Главная особенность настоящей русской бани — использование печи-каменки и веника. 
                  Правильно подобранные камни долго сохраняют тепло и дают мягкий пар, 
                  а веник усиливает целебный эффект процедуры.
                </p>
                <p className="font-semibold text-primary">
                  Мы строим бани по традиционным технологиям с применением современных материалов 
                  и оборудования, сохраняя аутентичный дух русской парной.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <img 
                src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/dce63058-7770-4a36-b3a0-be7ccc1b6da8.JPG"
                alt="Интерьер русской бани"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">15+</div>
                  <div className="text-sm text-muted-foreground">лет опыта</div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">200+</div>
                  <div className="text-sm text-muted-foreground">построенных бань</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-12">Полный цикл строительства бань под ключ</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "Home", title: "Баня под ключ", desc: "Проектирование, строительство, отделка и установка печи. Полный комплекс работ от фундамента до крыши." },
              { icon: "Flame", title: "Установка печей", desc: "Подбор и монтаж современных печей с высоким КПД. Работаем с ведущими производителями печного оборудования." },
              { icon: "Brush", title: "Отделка парных", desc: "Внутренняя отделка парных натуральным деревом с использованием специальных пропиток и защитных составов." },
              { icon: "Wrench", title: "Монтаж коммуникаций", desc: "Водоснабжение, канализация, электрика. Проектируем и монтируем все инженерные системы." },
              { icon: "Package", title: "Сруб из бревна", desc: "Строительство бань из оцилиндрованного бревна и бруса. Только качественная древесина северных пород." },
              { icon: "Timer", title: "Ремонт и реконструкция", desc: "Модернизация старых бань, замена печей, обновление отделки. Вернём вашей бане вторую жизнь." }
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon name={service.icon} className="text-primary mb-4" size={48} />
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Свяжитесь с нами</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Готовы ответить на ваши вопросы и рассчитать стоимость строительства бани
            </p>
            <div className="space-y-4">
              <a href="tel:+73422984030" className="flex items-center justify-center gap-3 text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
                <Icon name="Phone" size={32} />
                +7 (342) 298-40-30
              </a>
              <p className="text-muted-foreground">Звоните с 9:00 до 20:00 ежедневно</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">© 2024 Пермский Пар. Строительство русских бань под ключ в Перми и Пермском крае.</p>
          <p className="text-xs mt-2 opacity-80">ИП Иванов И.И. | ИНН 123456789012</p>
        </div>
      </footer>
    </>
  );
};
