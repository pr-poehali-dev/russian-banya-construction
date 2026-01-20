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
  }
];

const ReviewsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">Отзывы </h2>
          <p className="text-gray-600 text-lg"></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.map((review, index) => (
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
                    defaultValue={review.name}
                    className="font-bold text-lg text-gray-900 w-full bg-transparent border-none outline-none focus:bg-gray-50 px-1 -mx-1 rounded"
                  />
                  <input
                    type="text"
                    defaultValue={review.location}
                    className="text-sm text-gray-500 w-full bg-transparent border-none outline-none focus:bg-gray-50 px-1 -mx-1 rounded"
                  />
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg"></span>
                    ))}
                  </div>
                </div>
              </div>
              
              <textarea
                defaultValue={review.text}
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