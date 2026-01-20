interface EstimateLiveProps {
  material: string;
  length: string;
  width: string;
  foundation: string;
  location: string;
  partitionsLength: string;
  floors: string;
}

const EstimateLive = ({ 
  material, 
  length, 
  width, 
  foundation, 
  location,
  partitionsLength,
  floors 
}: EstimateLiveProps) => {
  if (!length || !width || !material) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium mb-2">Заполните параметры калькулятора</p>
        <p className="text-sm">Выберите материал стен, длину и ширину для расчёта сметы</p>
      </div>
    );
  }

  const len = parseFloat(length);
  const wid = parseFloat(width);
  const area = len * wid;
  const perimeter = (len + wid) * 2;
  const partLen = partitionsLength ? parseFloat(partitionsLength) : 0;

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  type EstimateItem = {
    name: string;
    unit: string;
    quantity: number;
    price: number;
    total: number;
  };

  type EstimateSection = {
    title: string;
    items: EstimateItem[];
  };

  const sections: EstimateSection[] = [];

  if (foundation && foundation !== 'net') {
    const foundationItems: EstimateItem[] = [];
    
    if (foundation === 'lentochnyj') {
      foundationItems.push(
        { name: 'Бетон В20 М250(на щебне)', unit: 'м3', quantity: 12.00, price: 8100.00, total: 97200.00 },
        { name: 'Опалубка для свай (клееный)(150х150)мм', unit: 'шт', quantity: 19.00, price: 600.00, total: 11400.00 },
        { name: 'Пиломатериал обрезной, доска(50х200)мм', unit: 'м3', quantity: 1.50, price: 18000.00, total: 27000.00 },
        { name: 'Проволока вязальная(1,4мм)', unit: 'кг', quantity: 7.00, price: 300.00, total: 2100.00 },
        { name: 'Доска для опалубки и 1 стадию, мм', unit: 'м3', quantity: 4.00, price: 18000.00, total: 72000.00 },
        { name: 'Пленка полиэтиленовая(200мк)', unit: 'м2', quantity: 24.00, price: 60.00, total: 1440.00 },
        { name: 'Гвозди(3х70)мм', unit: 'кг', quantity: 8.00, price: 180.00, total: 1440.00 },
        { name: 'Рубероид РКП', unit: 'рулон', quantity: 4.00, price: 450.00, total: 1800.00 }
      );
    } else if (foundation === 'stolbchatyj') {
      foundationItems.push(
        { name: 'Сваи винтовые (диаметр 89мм)', unit: 'шт', quantity: 16.00, price: 1800.00, total: 28800.00 },
        { name: 'Монтаж винтовых свай', unit: 'шт', quantity: 16.00, price: 1200.00, total: 19200.00 },
        { name: 'Обвязка швеллером(12мм)', unit: 'м', quantity: perimeter, price: 950.00, total: perimeter * 950 },
        { name: 'Антикоррозийная обработка металла', unit: 'м2', quantity: 8.00, price: 180.00, total: 1440.00 }
      );
    }

    sections.push({
      title: `Фундамент ${foundation === 'lentochnyj' ? 'ленточный' : 'на винтовых сваях'}`,
      items: foundationItems
    });
  }

  const wallItems: EstimateItem[] = [];
  const materialName = material === 'ocilindrovannoe-brevno' ? 'Оцилиндрованное бревно Ø220мм' 
    : material === 'obychnyj-brus' ? 'Брус профилированный 150х150мм'
    : 'Брус клееный 150х150мм';
  
  const materialPricePerM3 = material === 'ocilindrovannoe-brevno' ? 27000 
    : material === 'obychnyj-brus' ? 22000 
    : 32000;

  const wallVolume = (perimeter * 2.2 * 0.15) + (partLen * 2.2 * 0.1);
  const roofArea = floors === '2' ? area * 1.5 : area * 1.2;

  wallItems.push(
    { name: materialName, unit: 'м3', quantity: wallVolume, price: materialPricePerM3, total: wallVolume * materialPricePerM3 },
    { name: 'Доска пола(40х150)мм', unit: 'м3', quantity: area * 0.04, price: 18000, total: area * 0.04 * 18000 },
    { name: 'Доска потолка(25х150)мм', unit: 'м3', quantity: area * 0.025, price: 18000, total: area * 0.025 * 18000 },
    { name: 'Балки перекрытия(100х200)мм', unit: 'м3', quantity: area * 0.06, price: 20000, total: area * 0.06 * 20000 },
    { name: 'Стропильная система', unit: 'м3', quantity: roofArea * 0.05, price: 20000, total: roofArea * 0.05 * 20000 },
    { name: 'Обрешетка кровли(25х100)мм', unit: 'м3', quantity: roofArea * 0.01, price: 18000, total: roofArea * 0.01 * 18000 },
    { name: 'Гидроизоляция(Изоспан)', unit: 'м2', quantity: roofArea, price: 85, total: roofArea * 85 },
    { name: 'Металлочерепица', unit: 'м2', quantity: roofArea, price: 450, total: roofArea * 450 },
    { name: 'Доборные элементы кровли', unit: 'комп', quantity: 1, price: 12000, total: 12000 },
    { name: 'Утеплитель Ursa(100мм)', unit: 'м3', quantity: area * 0.1, price: 2800, total: area * 0.1 * 2800 },
    { name: 'Пароизоляция(Изоспан B)', unit: 'м2', quantity: area, price: 45, total: area * 45 },
    { name: 'Огнебиозащита(Сенеж)', unit: 'л', quantity: area * 0.3, price: 480, total: area * 0.3 * 480 },
    { name: 'Нагели деревянные(Ø25мм)', unit: 'шт', quantity: perimeter * 4, price: 35, total: perimeter * 4 * 35 },
    { name: 'Джут межвенцовый(8мм)', unit: 'м.п', quantity: perimeter * 15, price: 25, total: perimeter * 15 * 25 }
  );

  sections.push({
    title: 'Материалы и работы',
    items: wallItems
  });

  const workItems: EstimateItem[] = [
    { name: 'Монтаж сруба', unit: 'м2', quantity: area, price: 4500, total: area * 4500 },
    { name: 'Монтаж стропильной системы', unit: 'м2', quantity: roofArea, price: 650, total: roofArea * 650 },
    { name: 'Монтаж кровли', unit: 'м2', quantity: roofArea, price: 450, total: roofArea * 450 },
    { name: 'Устройство полов', unit: 'м2', quantity: area, price: 800, total: area * 800 },
    { name: 'Устройство потолков', unit: 'м2', quantity: area, price: 600, total: area * 600 }
  ];

  sections.push({
    title: 'Монтажные работы',
    items: workItems
  });

  let grandTotal = 0;
  sections.forEach(section => {
    section.items.forEach(item => {
      grandTotal += item.total;
    });
  });

  const currentDate = new Date().toLocaleDateString('ru-RU');

  return (
    <div className="space-y-0 max-h-[600px] overflow-y-auto">
      <div className="bg-white border-2 border-black">
        <div className="border-b-2 border-black p-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="font-bold text-base">Предварительная примерная смета компании "Пермский Пар"</h2>
            </div>
            <div className="text-right text-xs">
              <div>тел. +7 (342) 298-40-30</div>
              <div>тел. +7(982) 490 09 00</div>
            </div>
          </div>
        </div>

        <table className="w-full text-[10px] border-collapse">
          <tbody>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5 font-bold text-center" colSpan={3}>Заказчик</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5 w-1/3"></td>
              <td className="border-r border-black p-1.5 w-1/3 text-center">телефон</td>
              <td className="p-1.5 w-1/3"></td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5 text-center">почта</td>
              <td className="p-1.5"></td>
            </tr>
            <tr className="border-b border-black bg-gray-50">
              <td className="border-r border-black p-1.5 font-bold text-center" colSpan={3}>Данные объекта</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5 font-bold">Параметры</td>
              <td className="border-r border-black p-1.5 font-bold text-center">Значения</td>
              <td className="p-1.5 font-bold text-center">Дополнительные значения</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5">Фундамент</td>
              <td className="border-r border-black p-1.5 text-center">
                {foundation === 'lentochnyj' ? 'Винтовые сваи' : foundation === 'stolbchatyj' ? 'Винтовые сваи' : 'Без фундамента'}
              </td>
              <td className="border-r border-black p-1.5 text-center">Периметр фундамента, м</td>
              <td className="p-1.5 text-right">30</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5">Что хотите построить</td>
              <td className="border-r border-black p-1.5 text-center">Баня под крышу</td>
              <td className="border-r border-black p-1.5 text-center">Высота 1 этажа в чистоте, м</td>
              <td className="p-1.5 text-right">2,2</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5">Из чего хотите построить</td>
              <td className="border-r border-black p-1.5 text-center">{materialName}</td>
              <td className="border-r border-black p-1.5 text-center">Высота сруба 1 этажа, м</td>
              <td className="p-1.5 text-right">2,8</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5">Этажность</td>
              <td className="border-r border-black p-1.5 text-center">{floors === '2' ? '1,5 этажа' : '1 этаж'}</td>
              <td className="border-r border-black p-1.5 text-center">Высота мансарды, м</td>
              <td className="p-1.5 text-right">3,4</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5">Длина строения, м</td>
              <td className="border-r border-black p-1.5 text-center">{len}</td>
              <td className="border-r border-black p-1.5 text-center">Высота стен мансарды, м</td>
              <td className="p-1.5 text-right">1</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5">Ширина строения, м</td>
              <td className="border-r border-black p-1.5 text-center">{wid}</td>
              <td className="border-r border-black p-1.5 text-center">Высота стен всего сруба, м</td>
              <td className="p-1.5 text-right">3,8</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5">Длина перегородок 1 этажа, м</td>
              <td className="border-r border-black p-1.5 text-center">{partLen}</td>
              <td className="border-r border-black p-1.5 text-center">Площадь, м2</td>
              <td className="p-1.5 text-right">{area.toFixed(0)}</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5">Расстояние до объекта в 1 сторону, км</td>
              <td className="border-r border-black p-1.5 text-center">0</td>
              <td className="border-r border-black p-1.5 text-center">Высота крыши, м</td>
              <td className="p-1.5 text-right">2,4</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5 text-center">Длина конька, м</td>
              <td className="p-1.5 text-right">7</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5 text-center">Длина стропила, м</td>
              <td className="p-1.5 text-right">4,9</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5 text-center">Площадь кровли, м</td>
              <td className="p-1.5 text-right">80</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5 text-center">Количество стропильных пар, шт</td>
              <td className="p-1.5 text-right">15</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5"></td>
              <td className="border-r border-black p-1.5"></td>
              <td className="p-1.5"></td>
            </tr>
          </tbody>
        </table>

        <div className="p-2 bg-gray-100 border-y-2 border-black">
          <h3 className="font-bold text-xs text-center">Расчеты</h3>
        </div>

        <table className="w-full text-[9px] border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-black">
              <th className="border-r border-black p-1.5 text-left font-bold">Наименование материалов и работ</th>
              <th className="border-r border-black p-1.5 text-center font-bold w-12">Ед.из</th>
              <th className="border-r border-black p-1.5 text-right font-bold w-16">Кол-во</th>
              <th className="border-r border-black p-1.5 text-right font-bold w-20">Цена, р</th>
              <th className="border-r border-black p-1.5 text-right font-bold w-24">Стоимость, р</th>
              <th className="p-1.5 text-right font-bold w-24">Поставщ, р</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, sectionIdx) => {
              const sectionTotal = section.items.reduce((sum, item) => sum + item.total, 0);
              
              return (
                <React.Fragment key={sectionIdx}>
                  <tr className="bg-yellow-100 border-y border-black">
                    <td colSpan={6} className="p-1.5 font-bold">{section.title}</td>
                  </tr>
                  {section.items.map((item, itemIdx) => (
                    <tr key={itemIdx} className={`border-b border-gray-300 ${itemIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="border-r border-gray-300 p-1.5">{item.name}</td>
                      <td className="border-r border-gray-300 p-1.5 text-center">{item.unit}</td>
                      <td className="border-r border-gray-300 p-1.5 text-right">{formatNumber(item.quantity)}</td>
                      <td className="border-r border-gray-300 p-1.5 text-right">{formatNumber(item.price)}</td>
                      <td className="border-r border-gray-300 p-1.5 text-right font-medium">{formatNumber(item.total)}</td>
                      <td className="p-1.5 text-right"></td>
                    </tr>
                  ))}
                  <tr className="bg-gray-200 border-y border-black">
                    <td colSpan={4} className="border-r border-black p-1.5 text-right font-bold">Итого по разделу:</td>
                    <td colSpan={2} className="p-1.5 text-right font-bold">{formatNumber(sectionTotal)}</td>
                  </tr>
                </React.Fragment>
              );
            })}
            <tr className="bg-yellow-200 border-t-2 border-black">
              <td colSpan={4} className="border-r border-black p-2 text-right font-bold text-base">ИТОГО</td>
              <td colSpan={2} className="p-2 text-right font-bold text-base">{formatNumber(grandTotal)}</td>
            </tr>
          </tbody>
        </table>

        <div className="p-3 border-t-2 border-black text-[9px] space-y-1">
          <p className="font-bold">Примечания:</p>
          <p>• Смета является предварительной и может быть уточнена после выезда специалиста на объект</p>
          <p>• Цены указаны с учетом материалов и работ на {currentDate}</p>
          <p>• Точный расчет производится после замеров и согласования проекта</p>
        </div>
      </div>
    </div>
  );
};

export default EstimateLive;