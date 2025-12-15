import { Card } from '@/components/ui/card';

interface EstimateItem {
  name: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
}

interface EstimateSection {
  title: string;
  items: EstimateItem[];
  total: number;
}

interface EstimateDocumentProps {
  material: string;
  length: string;
  width: string;
  foundation: string;
  location: string;
  stove: boolean;
  insulation: boolean;
  finishing: boolean;
}

const EstimateDocument = ({ 
  material, 
  length, 
  width, 
  foundation, 
  location,
  stove,
  insulation,
  finishing 
}: EstimateDocumentProps) => {
  const area = parseFloat(length) * parseFloat(width);
  const perimeter = (parseFloat(length) + parseFloat(width)) * 2;
  const height = 2.2;
  const wallVolume = perimeter * height * 0.15;
  const roofArea = area * 1.3;

  const sections: EstimateSection[] = [];

  const foundationNames = {
    lentochnyj: 'Винтовые сваи',
    stolbchatyj: 'Столбчатый фундамент',
    plitnyj: 'Монолитная плита'
  };

  if (foundation) {
    const foundationSection: EstimateSection = {
      title: `Фундамент из ${foundation === 'lentochnyj' ? 'винтовых свай' : foundation === 'stolbchatyj' ? 'столбов' : 'плиты'}`,
      items: [],
      total: 0
    };

    if (foundation === 'lentochnyj') {
      foundationSection.items.push(
        { name: 'Свая винтовая 89/6 (2,5м)', unit: 'шт', quantity: 11, price: 2500, total: 27500 },
        { name: 'Оголовки для свай съемные(150х150)мм', unit: 'шт', quantity: 11, price: 500, total: 5500 },
        { name: 'Услуги ямобура', unit: 'ч', quantity: 4, price: 1500, total: 6000 },
        { name: 'Монтаж свай', unit: 'шт', quantity: 11, price: 3000, total: 33000 }
      );
      foundationSection.total = 72000;
    } else if (foundation === 'stolbchatyj') {
      foundationSection.items.push(
        { name: 'Столбы бетонные', unit: 'шт', quantity: 9, price: 3500, total: 31500 },
        { name: 'Работы по установке', unit: 'шт', quantity: 9, price: 2000, total: 18000 }
      );
      foundationSection.total = 49500;
    } else {
      foundationSection.items.push(
        { name: 'Бетон М300', unit: 'м3', quantity: area * 0.25, price: 4500, total: Math.round(area * 0.25 * 4500) },
        { name: 'Арматура А500', unit: 'кг', quantity: area * 15, price: 55, total: Math.round(area * 15 * 55) },
        { name: 'Работы по заливке', unit: 'м2', quantity: area, price: 800, total: Math.round(area * 800) }
      );
      foundationSection.total = Math.round(area * 0.25 * 4500 + area * 15 * 55 + area * 800);
    }

    foundationSection.items.push(
      { name: 'Обвязочный брус(100х200)мм', unit: 'м3', quantity: 0.48, price: 18000, total: 8640 },
      { name: 'Рубероид РПП 300', unit: 'м2', quantity: 10, price: 55, total: 550 },
      { name: 'Антисептик зимний "Фенелакс"(-15С)', unit: 'л', quantity: 5, price: 90, total: 450 },
      { name: 'Шуруп "глухарь"(8х40) 1кг/ми', unit: 'шт', quantity: 22, price: 3.5, total: 77 },
      { name: 'Скобы строительные(8х250)', unit: 'шт', quantity: 6, price: 50, total: 300 },
      { name: 'Монтаж обвязки', unit: 'м3', quantity: 0.48, price: 7500, total: 3600 }
    );
    foundationSection.total += 13617;

    sections.push(foundationSection);
  }

  if (material) {
    const wallsSection: EstimateSection = {
      title: `Сруб из ${material === 'bревно' ? 'бревна' : 'бруса'}`,
      items: [
        { name: material === 'bревно' ? 'Бревно сруба' : 'Брус профилированный', unit: 'м3', quantity: wallVolume, price: material === 'bревно' ? 19500 : 17500, total: Math.round(wallVolume * (material === 'bревно' ? 19500 : 17500)) },
        { name: 'Бревно перегородки', unit: 'м3', quantity: 1.7, price: 17500, total: 29750 },
        { name: 'Бревно фронтонов', unit: 'м3', quantity: 0, price: 0, total: 0 }
      ],
      total: 0
    };
    wallsSection.total = Math.round(wallVolume * (material === 'bревно' ? 19500 : 17500) + 29750);
    sections.push(wallsSection);

    const frameworkSection: EstimateSection = {
      title: 'Общая кубатура',
      items: [
        { name: 'Джут(150мм)', unit: 'п.м', quantity: 600, price: 21, total: 12600 },
        { name: 'Шкант березовый(24х1200)мм', unit: 'шт', quantity: 80, price: 35, total: 2800 },
        { name: 'Скобы для степлера(№10)', unit: 'шт', quantity: 3000, price: 0.15, total: 450 },
        { name: 'Скобы строительные(8х250)', unit: 'шт', quantity: 31, price: 50, total: 1550 },
        { name: 'Без антисептика', unit: 'л', quantity: 30, price: 0, total: 0 },
        { name: 'Монтаж сруба', unit: 'м3', quantity: wallVolume + 1.7, price: 8500, total: Math.round((wallVolume + 1.7) * 8500) }
      ],
      total: 0
    };
    frameworkSection.total = 12600 + 2800 + 450 + 1550 + Math.round((wallVolume + 1.7) * 8500);
    sections.push(frameworkSection);

    const floorsSection: EstimateSection = {
      title: 'Лаги пола, балки перекрытия',
      items: [
        { name: 'Брус для лаг, балок(100х150)мм', unit: 'м3', quantity: 1.62, price: 18000, total: 29160 },
        { name: 'Монтаж лаг', unit: 'шт', quantity: 18, price: 600, total: 10800 }
      ],
      total: 39960
    };
    sections.push(floorsSection);
  }

  if (location) {
    const locationNames = {
      perm: 'Пермь',
      'perm-30km': 'До 30 км от Перми',
      'perm-50km': '30-50 км от Перми',
      'perm-100km': '50-100 км от Перми'
    };

    let deliveryPrice = 0;
    if (location === 'perm-30km') deliveryPrice = 5000;
    if (location === 'perm-50km') deliveryPrice = 10000;
    if (location === 'perm-100km') deliveryPrice = 20000;

    if (deliveryPrice > 0) {
      deliverySection.items = [
        { name: `Доставка материалов и выезд бригады (${locationNames[location as keyof typeof locationNames]})`, unit: 'услуга', quantity: 1, price: deliveryPrice, total: deliveryPrice }
      ];
      deliverySection.total = deliveryPrice;
      sections.push(deliverySection);
    }
  }

  if (stove) {
    sections.push({
      title: 'Печь и дымоход',
      items: [
        { name: 'Печь банная с баком', unit: 'шт', quantity: 1, price: 45000, total: 45000 },
        { name: 'Дымоход из нержавейки (комплект)', unit: 'компл', quantity: 1, price: 25000, total: 25000 },
        { name: 'Монтаж печи и дымохода', unit: 'услуга', quantity: 1, price: 10000, total: 10000 }
      ],
      total: 80000
    });
  }

  if (insulation) {
    sections.push({
      title: 'Утепление',
      items: [
        { name: 'Утеплитель базальтовый 100мм', unit: 'м2', quantity: area * 2, price: 450, total: Math.round(area * 2 * 450) },
        { name: 'Пароизоляция', unit: 'м2', quantity: area * 2, price: 35, total: Math.round(area * 2 * 35) },
        { name: 'Монтаж утепления', unit: 'м2', quantity: area * 2, price: 250, total: Math.round(area * 2 * 250) }
      ],
      total: Math.round(area * 2 * 735)
    });
  }

  if (finishing) {
    sections.push({
      title: 'Внутренняя отделка',
      items: [
        { name: 'Вагонка липа (класс А)', unit: 'м2', quantity: area * 2.5, price: 850, total: Math.round(area * 2.5 * 850) },
        { name: 'Полок (липа)', unit: 'компл', quantity: 1, price: 18000, total: 18000 },
        { name: 'Монтаж отделки', unit: 'м2', quantity: area * 2.5, price: 450, total: Math.round(area * 2.5 * 450) }
      ],
      total: Math.round(area * 2.5 * 1300 + 18000)
    });
  }

  const grandTotal = sections.reduce((sum, section) => sum + section.total, 0);

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatInteger = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <div className="p-8 bg-white">
        <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-900">
          <div>
            <h1 className="text-xl font-bold mb-2">Предварительная смета (расчет под крышу, без отделки)</h1>
            <p className="text-sm text-gray-600">Заказчик: _______________________</p>
          </div>
          <div className="text-right text-xs text-gray-600">
            <p>www.пермский-пар.рф</p>
            <p>тел. +7 (342) 298-40-30</p>
            <p>тел. +7(982)4-900-900</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-bold mb-3 bg-gray-100 px-3 py-2">Данные объекта</h2>
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3 font-medium w-1/3 bg-gray-50">Параметры</td>
                <td className="py-2 px-3 font-medium w-1/3 bg-gray-50">Значения</td>
                <td className="py-2 px-3 w-1/3 bg-gray-50">Дополнительные значения</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Фундамент</td>
                <td className="py-2 px-3">{foundation ? foundationNames[foundation as keyof typeof foundationNames] : '-'}</td>
                <td className="py-2 px-3 text-sm text-gray-600">-</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Что хотите построить</td>
                <td className="py-2 px-3">Баня под крышу</td>
                <td className="py-2 px-3">Высота 1 этажа в чистоте, м: <span className="font-medium">2,2</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Из чего хотите построить</td>
                <td className="py-2 px-3">{material === 'bревно' ? 'Оцилиндрованное бревно' : 'Профилированный брус'}</td>
                <td className="py-2 px-3">Высота 1,5 или 2 этажа, м: <span className="font-medium">1</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Этажность</td>
                <td className="py-2 px-3">1,5 этажа</td>
                <td className="py-2 px-3">Высота крыши, м: <span className="font-medium">1,2</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Диаметр бревна, м</td>
                <td className="py-2 px-3">0,2</td>
                <td className="py-2 px-3"></td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Фронтоны</td>
                <td className="py-2 px-3">Нет</td>
                <td className="py-2 px-3 text-sm text-gray-600">Изображение не<br/>является вашим<br/>проектом</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Длина строения, м</td>
                <td className="py-2 px-3 font-medium">{length}</td>
                <td rowSpan={4} className="py-2 px-3 align-top">
                  <img src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/65ab4513-a8b8-422d-99fd-2ed5589fa26f.jpg" alt="Баня" className="w-32 h-auto" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Ширина строения, м</td>
                <td className="py-2 px-3 font-medium">{width}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Длина перегородок 1 этажа, м</td>
                <td className="py-2 px-3">3</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Длина перегородок 2 этажа, м</td>
                <td className="py-2 px-3">0</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Расстояние до объекта в 1 сторону, км</td>
                <td className="py-2 px-3">0</td>
                <td className="py-2 px-3"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="font-bold mb-3 bg-gray-100 px-3 py-2">Расчеты</h2>
          
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="font-bold mb-2 text-sm bg-gray-50 px-3 py-2">{section.title}</h3>
              <table className="w-full text-xs border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-2 text-left">Наименование материалов и работ</th>
                    <th className="border border-gray-300 px-2 py-2 text-center w-16">Ед.из</th>
                    <th className="border border-gray-300 px-2 py-2 text-right w-20">Кол-во</th>
                    <th className="border border-gray-300 px-2 py-2 text-right w-24">Цена, р</th>
                    <th className="border border-gray-300 px-2 py-2 text-right w-28">Стоимость, р</th>
                    <th className="border border-gray-300 px-2 py-2 text-right w-28">Поэтапно, р</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1.5">{item.name}</td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center">{item.unit}</td>
                      <td className="border border-gray-300 px-2 py-1.5 text-right">{formatNumber(item.quantity)}</td>
                      <td className="border border-gray-300 px-2 py-1.5 text-right">{formatNumber(item.price)}</td>
                      <td className="border border-gray-300 px-2 py-1.5 text-right font-medium">{formatNumber(item.total)}</td>
                      <td className="border border-gray-300 px-2 py-1.5 text-right">
                        {itemIndex === section.items.length - 1 && (
                          <span className="font-bold">{formatNumber(section.total)}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="text-right">
            <div className="text-2xl font-bold border-t-2 border-gray-900 pt-3">
              ИТОГО: {formatInteger(Math.round(grandTotal))} ₽
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-600 space-y-2">
          <p>* Данная смета является предварительной и может быть скорректирована после выезда специалиста на объект</p>
          <p>* Цены действительны на момент составления сметы</p>
          <p>* Окончательная стоимость определяется после согласования проекта</p>
        </div>
      </div>
    </Card>
  );
};

export default EstimateDocument;