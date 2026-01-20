const ReviewsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">Отзывы моих клиентов</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/веретье0.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Алексей</p>
                <p className="text-sm text-gray-500">Резиденция "Веретье"</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Александр построил баню под ключ, от фундамента до отделки и установки мебели. Сделал все коммуникации, банный чан, террасу. Сейчас строим с Александром дом из клееного бруса. Всем рекомендую этого специалиста!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/полазна1.JPG" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Вадим</p>
                <p className="text-sm text-gray-500">п. Полазна</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Делали с Александром внутреннюю отделку дома-бани. Отопление, электрика, шлифовка, покраска, наличники, потолки. Особенно понравилась отделка парной, Александр все доходчиво объяснил, как устроена парная, основы парения. Отдыхаем всей семьей, паримся по 2 раза в неделю!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/гамы1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Дмитрий</p>
                <p className="text-sm text-gray-500">д. Гамы</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Сначала заказали шлифовку и покраску сруба снаружи. Все понравилось, у ребят профессиональное немецкое беспылевое оборудование, немецкие масла. Решили сделать с александром и внутреннюю отделку. Все супер, особенно парная, настоящая русская баня!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/ключи1.JPG" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Александр Сергеевич</p>
                <p className="text-sm text-gray-500">д. Ключи</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Александра порекомендовал печник, который устанавливал камин в доме. Александр приехал на объект, обсудили детали отделки, сделал замеры, посчитал смету. Все работы сделали хорошо, особенно парную. Полок из абаши особенно понравился. паримся в бане всей семьей, очень нравиться.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/скобелевка1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Константин</p>
                <p className="text-sm text-gray-500">д. Скобелевка</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Александра порекомендовал общий знакомый. Сделали ремонт старой бани, парной и помывочной. Конечно, отличия колоссальные, все аккуратно, технологично, мягкий пар. планируем в дальнейшем ремонт комнаты отдыха и отделку снаружи.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/слудка1.png" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Татьяна Николаевна</p>
                <p className="text-sm text-gray-500">д. Красная Слудка</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Александр сделал отделку бани, установил печь, двери, окна, сантехнику. Даже камни сам в печь уложил, оказывается, это важно! Всем рекомендую!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/добрянка1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Андрей Владимирович</p>
                <p className="text-sm text-gray-500">г. Добрянка</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Баня 6х8 из бруса. Строили летом, к осени уже парились. Качество работы отличное, претензий нет. Рекомендую!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/500.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Елена</p>
                <p className="text-sm text-gray-500">д. Налимиха</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Хочу поблагодарить мастеров за прекрасную работу! Баня из бревна 6х8 получилась очень красивая и функциональная. Парная прогревается равномерно, жар держится долго. Всё сделано качественно и с душой. Соседи теперь тоже хотят к вам обращаться)</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/кольцово1.JPG" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Игорь Павлович</p>
                <p className="text-sm text-gray-500">д. Кольцово</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Заказывал баню 6х9 из оцилиндрованного бревна. Работой очень доволен! Мастера приезжали вовремя, работали аккуратно и быстро. Материал качественный, всё подогнано идеально. Парилка получилась супер - жар мягкий, долго держится. Рекомендую!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/кузьминка1.JPG" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Светлана</p>
                <p className="text-sm text-gray-500">д. Кузьминка</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Долго искали исполнителя для постройки бани, остановились на этих ребятах и не прогадали. Построили баню 5х6 из профилированного бруса за месяц. Всё четко, качественно, без лишних вопросов. Спасибо большое!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/сылва1.JPG" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Валерий Степанович</p>
                <p className="text-sm text-gray-500">п. Сылва</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Отличная работа! Сделали баню под ключ 8х10. Парная прогревается за 40 минут и держит температуру долго. Печь подобрали отличную. Все материалы качественные, сборка профессиональная. Очень доволен результатом!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/уткина1.JPG" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Наталья Ивановна</p>
                <p className="text-sm text-gray-500">д. Уткина</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Построили нам баню 6х6 из клееного бруса. Получилось очень красиво и функционально! Внутри просторно, всё продумано до мелочей. Мастера работали быстро и аккуратно. Большое спасибо за качественную работу!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/путино1.JPG" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Виктор</p>
                <p className="text-sm text-gray-500">д. Путино</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Заказывал ремонт старой бани - меняли полы, обшивку, устанавливали новую печь. Ребята сделали всё быстро и качественно. Баня как новая! Цена адекватная, работой доволен на 100%.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/чайковский1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Мария Сергеевна</p>
                <p className="text-sm text-gray-500">п. Чайковский</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Очень благодарна мастерам за отличную баню! Строили из бруса 6х7, получилось уютно и красиво. Парная прогревается быстро, жар держится долго. Всё выполнено качественно и в срок. Очень довольна!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/одино1.JPG" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Николай Петрович</p>
                <p className="text-sm text-gray-500">п. Одино</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Построили баню 6х15 из рубленого бревна. Грандиозный проект! Ребята справились на отлично. Работали слаженно, материалы отборные. Получился настоящий банный комплекс. Всем рекомендую!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/троица1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Любовь Алексеевна</p>
                <p className="text-sm text-gray-500">п. Троица</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Заказывали баню 6х5 из рубленого бревна. Результат превзошел ожидания! Мастера настоящие профессионалы, всё сделано качественно. Парная прогревается быстро, держит жар отлично. Спасибо!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/налимиха1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Георгий</p>
                <p className="text-sm text-gray-500">д. Налимиха</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Баня 6х8 из оцилиндрованного бревна. Ребята работали чётко, без простоев. Материал качественный, сборка аккуратная. Парилка получилась отличная - жар мягкий, дышится легко. Доволен на все 100%!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/филатово1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Анна Владимировна</p>
                <p className="text-sm text-gray-500">д. Филатово</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Построили баню 6х6 из рубленого бревна. Очень красиво и качественно! Мастера работали аккуратно, учитывали все пожелания. Парная прогревается равномерно. Соседи в восторге!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/горюшки1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Константин Иванович</p>
                <p className="text-sm text-gray-500">д. Горюшки</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Заказывал баню 6х8 из рубленого бревна. Работой полностью доволен! Ребята профессионалы своего дела. Всё сделано качественно, материалы отличные. Печь топится великолепно!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/жебреи1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Юлия Павловна</p>
                <p className="text-sm text-gray-500">п. Жебреи</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Построили баню 6х6 из рубленого бревна. Получилось очень красиво! Мастера работали быстро и аккуратно. Парная держит температуру долго, жар мягкий. Всей семьёй довольны результатом!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/files/бершеть1.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Владимир Степанович</p>
                <p className="text-sm text-gray-500">п. Бершеть</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Заказывал баню 6х6 из бруса естественной влажности. Цена отличная, качество на высоте. Ребята работают профессионально, без лишних разговоров. Результатом очень доволен!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/56ffd009-8b25-4c96-809f-a6cf2c993890.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Екатерина</p>
                <p className="text-sm text-gray-500">г. Пермь</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Компактная баня 5х5 из оцилиндрованного бревна. Идеально для небольшого участка! Ребята сделали всё быстро и качественно. Парная прогревается отлично. Очень довольна!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/4df7f510-3b60-41dc-9e06-478de74ffdff.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Роман Викторович</p>
                <p className="text-sm text-gray-500">п. Горный</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Баня 6х6 из бруса. Строили летом, всё сделали за месяц. Качество работы отличное, материалы хорошие. Парная держит жар долго. Рекомендую этих мастеров!</p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/70f5d533-55de-4d3a-9b21-b3080dc9ef87.jpg" alt="Отзыв" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">Ирина Александровна</p>
                <p className="text-sm text-gray-500">Заозерье, г. Пермь</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">Маленькая баня 3х5, но сделана на совесть! Компактная и функциональная. Мастера учли все пожелания. Парилка прогревается быстро. Очень довольна результатом!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;