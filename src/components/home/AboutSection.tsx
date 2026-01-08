import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 px-2">Обо мне</h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start w-full max-w-full">
          <div className="space-y-6 w-full max-w-full overflow-x-hidden">
            <div className="text-base md:text-lg text-muted-foreground leading-relaxed space-y-4 break-words">
              <p>Меня зовут Александр. Я — специалист по строительству, модернизации и ремонту русских бань.</p>
              <p>Моя цель — чтобы вы не просто получили баню, а открыли для себя настоящее удовольствие от живого пара, тепла дерева и уюта, в котором хочется остаться надолго.</p>
              <p>Обладаю глубоким знанием традиционных технологий и нюансов настоящего русского парения. Подхожу к каждому проекту с душой: помогаю с выбором материалов, продумываю планировку до мелочей и слежу за каждым этапом строительства.</p>
              <p>За моими плечами более 15 лет опыта, десятки успешных проектов и довольных клиентов.</p>
            </div>
            <div className="flex justify-center md:justify-start w-full max-w-full bg-green-600">
              <Button 
                size="lg" 
                disabled 
                className="text-xs sm:text-sm md:text-lg px-4 sm:px-6 md:px-8 bg-green-600 text-black font-black shadow-lg w-full md:w-auto max-w-full break-words whitespace-normal h-auto py-3 leading-tight cursor-not-allowed"
              >Консультация по строительству или ремонту бани +7(982)4-900-900(Александр)</Button>
            </div>
          </div>
          <div className="w-full max-w-full overflow-hidden">
            <img 
              src="https://cdn.poehali.dev/files/IMG_20251211_114315 (2).jpg"
              alt="Мастер банных дел"
              className="rounded-lg shadow-xl w-full max-w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover object-[center_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;