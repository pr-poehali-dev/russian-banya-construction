import { useState } from "react";

export const reviewsData = [
  {
    name: "Александр Петров",
    location: "д. Веретье",
    avatar: "https://cdn.poehali.dev/files/веретье0.jpg",
    text: "Ребята построили баню 6х12 из оцилиндрованного бревна. Работали быстро, четко, без задержек. Особенно порадовала парная - жар мягкий, дышится легко. Печь подобрали идеально. Спасибо за качественную работу!",
    rating: 5
  },
  {
    name: "Марина",
    location: "п. Полазна",
    avatar: "https://cdn.poehali.dev/files/полазна1.JPG",
    text: "Долго выбирали исполнителя, остановились на этих мастерах и не пожалели ни разу! Баня 8х15 из бруса получилась просто огромная и красивая. Все сделано аккуратно, материалы качественные. Муж доволен как слон)) Рекомендую от всей души!",
    rating: 5
  },
  {
    name: "Сергей Иванович",
    location: "д. Гамы",
    avatar: "https://cdn.poehali.dev/files/гамы1.jpg",
    text: "Компактная банька 3х6, но сделана на совесть. Печка топится отлично, за час прогревается до кондиции. Ребята молодцы, работают профессионально.",
    rating: 5
  },
  {
    name: "Ольга Викторовна",
    location: "д. Ключи",
    avatar: "https://cdn.poehali.dev/files/ключи1.JPG",
    text: "Заказывали баню из клееного бруса 10х10. Результат превзошел все ожидания! Качество материалов на высоте, сборка идеальная. Внутри просторно, светло. Парная - просто огонь! Отдельное спасибо за помощь с планировкой, учли все наши пожелания.",
    rating: 5
  },
  {
    name: "Дмитрий",
    location: "д. Скобелевка",
    avatar: "https://cdn.poehali.dev/files/скобелевка1.jpg",
    text: "Делали ремонт старой бани - парная и помывочная. Преобразили полностью! Теперь как новая. Цена адекватная, работают быстро.",
    rating: 5
  },
  {
    name: "Татьяна Николаевна",
    location: "д. Красная Слудка",
    avatar: "https://cdn.poehali.dev/files/слудка1.png",
    text: "Построили нам чудесную баньку 6х6 из профилированного бруса. Очень довольны! Ребята работают слаженно, знают свое дело. Все этапы прошли в срок, без накладок. Теперь каждые выходные паримся всей семьей. Огромное спасибо мастерам!",
    rating: 5
  },
  {
    name: "Андрей Владимирович",
    location: "г. Добрянка",
    avatar: "https://cdn.poehali.dev/files/добрянка1.jpg",
    text: "Баня 6х8 из бруса. Строили летом, к осени уже парились. Качество работы отличное, претензий нет. Рекомендую!",
    rating: 5
  },
  {
    name: "Елена",
    location: "д. Налимиха",
    avatar: "https://cdn.poehali.dev/files/500.jpg",
    text: "Хочу поблагодарить мастеров за прекрасную работу! Баня из бревна 6х8 получилась очень красивая и функциональная. Парная прогревается равномерно, жар держится долго. Всё сделано качественно и с душой. Соседи теперь тоже хотят к вам обращаться)",
    rating: 5
  },
  {
    name: "Игорь Павлович",
    location: "д. Кольцово",
    avatar: "https://cdn.poehali.dev/files/кольцово1.JPG",
    text: "Заказывал баню 6х9 из оцилиндрованного бревна. Работой очень доволен! Мастера приезжали вовремя, работали аккуратно и быстро. Материал качественный, всё подогнано идеально. Парилка получилась супер - жар мягкий, долго держится. Рекомендую!",
    rating: 5
  },
  {
    name: "Светлана",
    location: "д. Кузьминка",
    avatar: "https://cdn.poehali.dev/files/кузьминка1.JPG",
    text: "Долго искали исполнителя для постройки бани, остановились на этих ребятах и не прогадали. Построили баню 5х6 из профилированного бруса за месяц. Всё четко, качественно, без лишних вопросов. Спасибо большое!",
    rating: 5
  },
  {
    name: "Валерий Степанович",
    location: "п. Сылва",
    avatar: "https://cdn.poehali.dev/files/сылва1.JPG",
    text: "Отличная работа! Сделали баню под ключ 8х10. Парная прогревается за 40 минут и держит температуру долго. Печь подобрали отличную. Все материалы качественные, сборка профессиональная. Очень доволен результатом!",
    rating: 5
  },
  {
    name: "Наталья Ивановна",
    location: "д. Уткина",
    avatar: "https://cdn.poehali.dev/files/уткина1.JPG",
    text: "Построили нам баню 6х6 из клееного бруса. Получилось очень красиво и функционально! Внутри просторно, всё продумано до мелочей. Мастера работали быстро и аккуратно. Большое спасибо за качественную работу!",
    rating: 5
  },
  {
    name: "Виктор",
    location: "д. Путино",
    avatar: "https://cdn.poehali.dev/files/путино1.JPG",
    text: "Заказывал ремонт старой бани - меняли полы, обшивку, устанавливали новую печь. Ребята сделали всё быстро и качественно. Баня как новая! Цена адекватная, работой доволен на 100%.",
    rating: 5
  },
  {
    name: "Мария Сергеевна",
    location: "п. Чайковский",
    avatar: "https://cdn.poehali.dev/files/чайковский1.jpg",
    text: "Очень благодарна мастерам за отличную баню! Строили из бруса 6х7, получилось уютно и красиво. Парная прогревается быстро, жар держится долго. Всё выполнено качественно и в срок. Очень довольна!",
    rating: 5
  },
  {
    name: "Николай Петрович",
    location: "п. Одино",
    avatar: "https://cdn.poehali.dev/files/одино1.JPG",
    text: "Построили баню 6х15 из рубленого бревна. Грандиозный проект! Ребята справились на отлично. Работали слаженно, материалы отборные. Получился настоящий банный комплекс. Всем рекомендую!",
    rating: 5
  },
  {
    name: "Любовь Алексеевна",
    location: "п. Троица",
    avatar: "https://cdn.poehali.dev/files/троица1.jpg",
    text: "Заказывали баню 6х5 из рубленого бревна. Результат превзошел ожидания! Мастера настоящие профессионалы, всё сделано качественно. Парная прогревается быстро, держит жар отлично. Спасибо!",
    rating: 5
  },
  {
    name: "Георгий",
    location: "д. Налимиха",
    avatar: "https://cdn.poehali.dev/files/налимиха1.jpg",
    text: "Баня 6х8 из оцилиндрованного бревна. Ребята работали чётко, без простоев. Материал качественный, сборка аккуратная. Парилка получилась отличная - жар мягкий, дышится легко. Доволен на все 100%!",
    rating: 5
  },
  {
    name: "Анна Владимировна",
    location: "д. Филатово",
    avatar: "https://cdn.poehali.dev/files/филатово1.jpg",
    text: "Построили баню 6х6 из рубленого бревна. Очень красиво и качественно! Мастера работали аккуратно, учитывали все пожелания. Парная прогревается равномерно. Соседи в восторге!",
    rating: 5
  },
  {
    name: "Константин Иванович",
    location: "д. Горюшки",
    avatar: "https://cdn.poehali.dev/files/горюшки1.jpg",
    text: "Заказывал баню 6х8 из рубленого бревна. Работой полностью доволен! Ребята профессионалы своего дела. Всё сделано качественно, материалы отличные. Печь топится великолепно!",
    rating: 5
  },
  {
    name: "Юлия Павловна",
    location: "п. Жебреи",
    avatar: "https://cdn.poehali.dev/files/жебреи1.jpg",
    text: "Построили баню 6х6 из рубленого бревна. Получилось очень красиво! Мастера работали быстро и аккуратно. Парная держит температуру долго, жар мягкий. Всей семьёй довольны результатом!",
    rating: 5
  },
  {
    name: "Владимир Степанович",
    location: "п. Бершеть",
    avatar: "https://cdn.poehali.dev/files/бершеть1.jpg",
    text: "Заказывал баню 6х6 из бруса естественной влажности. Цена отличная, качество на высоте. Ребята работают профессионально, без лишних разговоров. Результатом очень доволен!",
    rating: 5
  },
  {
    name: "Екатерина",
    location: "г. Пермь",
    avatar: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/56ffd009-8b25-4c96-809f-a6cf2c993890.jpg",
    text: "Компактная баня 5х5 из оцилиндрованного бревна. Идеально для небольшого участка! Ребята сделали всё быстро и качественно. Парная прогревается отлично. Очень довольна!",
    rating: 5
  },
  {
    name: "Роман Викторович",
    location: "п. Горный",
    avatar: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/4df7f510-3b60-41dc-9e06-478de74ffdff.jpg",
    text: "Баня 6х6 из бруса. Строили летом, всё сделали за месяц. Качество работы отличное, материалы хорошие. Парная держит жар долго. Рекомендую этих мастеров!",
    rating: 5
  },
  {
    name: "Ирина Александровна",
    location: "Заозерье, г. Пермь",
    avatar: "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/70f5d533-55de-4d3a-9b21-b3080dc9ef87.jpg",
    text: "Маленькая баня 3х5, но сделана на совесть! Компактная и функциональная. Мастера учли все пожелания. Парилка прогревается быстро. Очень довольна результатом!",
    rating: 5
  }
];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviewsData');
    return saved ? JSON.parse(saved) : reviewsData;
  });

  const handleChange = (index: number, field: string, value: string) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = { ...updatedReviews[index], [field]: value };
    setReviews(updatedReviews);
    localStorage.setItem('reviewsData', JSON.stringify(updatedReviews));
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">Отзывы моих клиентов</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review: any, index: number) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={review.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="font-bold text-lg text-gray-900 w-full bg-transparent border-none outline-none focus:bg-gray-50 px-1 -mx-1 rounded"
                  />
                  <input
                    type="text"
                    value={review.location}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    className="text-sm text-gray-500 w-full bg-transparent border-none outline-none focus:bg-gray-50 px-1 -mx-1 rounded"
                  />
                </div>
              </div>
              
              <textarea
                value={review.text}
                onChange={(e) => handleChange(index, 'text', e.target.value)}
                className="text-gray-700 leading-relaxed flex-1 bg-transparent border-none outline-none focus:bg-gray-50 px-1 -mx-1 rounded resize-none"
                rows={4}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;