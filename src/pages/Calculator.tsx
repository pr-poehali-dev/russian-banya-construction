import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  subtotal: number;
}

const Calculator = () => {
  const [foundation, setFoundation] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [partitionLength, setPartitionLength] = useState<string>('');
  const [estimate, setEstimate] = useState<EstimateSection[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateEstimate = () => {
    if (!foundation || !length || !width) return;

    const l = parseFloat(length);
    const w = parseFloat(width);
    const pl = partitionLength ? parseFloat(partitionLength) : 0;
    const area = l * w;
    const perimeter = 2 * (l + w) + pl;

    const sections: EstimateSection[] = [];

    // Винтовые сваи - всегда показываем, но считаем только если выбраны
    const pilesCount = Math.ceil(perimeter / 2);
    const isPilesSelected = foundation === 'сваи';
    sections.push({
      title: 'Фундамент из винтовых свай',
      items: [
        { name: 'Свая винтовая 89/6,5/300(2,5м)', unit: 'шт', quantity: pilesCount, price: 3000, total: isPilesSelected ? pilesCount * 3000 : 0 },
        { name: 'Оголовки для свай съемные(150х150)мм', unit: 'шт', quantity: pilesCount, price: 600, total: isPilesSelected ? pilesCount * 600 : 0 },
        { name: 'Монтаж свай', unit: 'шт', quantity: pilesCount, price: 4000, total: isPilesSelected ? pilesCount * 4000 : 0 },
        { name: 'Брус обвязочный(100х200)мм', unit: 'м3', quantity: 1, price: 19500, total: isPilesSelected ? 19500 : 0 },
        { name: 'Рубероид РПП 300', unit: 'м2', quantity: 6, price: 65, total: isPilesSelected ? 390 : 0 },
        { name: 'Антисептик зимний "Фенелакс"(-15С)', unit: 'л', quantity: 6, price: 130, total: isPilesSelected ? 780 : 0 },
        { name: 'Саморезы(4х90)мм', unit: 'шт', quantity: 150, price: 3, total: isPilesSelected ? 450 : 0 },
        { name: 'Гвозди(4х120)мм', unit: 'кг', quantity: 2, price: 200, total: isPilesSelected ? 400 : 0 },
        { name: 'Монтаж обвязки', unit: 'м3', quantity: 1, price: 1960, total: isPilesSelected ? 1960 : 0 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = isPilesSelected ? sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0) : 0;

    // Ленточный фундамент - всегда показываем, но считаем только если выбран
    const concrete = perimeter * 0.6 * 0.5;
    const isStripSelected = foundation === 'ленточный';
    sections.push({
      title: 'Фундамент ленточный, с буронабивными сваями',
      items: [
        { name: 'Бетон B20 M250(на щебне)', unit: 'м3', quantity: parseFloat(concrete.toFixed(2)), price: 8100, total: isStripSelected ? Math.round(concrete * 8100) : 0 },
        { name: 'Дренажная подушка(ПГС)', unit: 'т', quantity: 5, price: 1000, total: isStripSelected ? 5000 : 0 },
        { name: 'Арматура металлическая(А480)', unit: 'кг', quantity: 7, price: 50, total: isStripSelected ? 350 : 0 },
        { name: 'Арматура металлическая(А240)', unit: 'кг', quantity: 4, price: 50, total: isStripSelected ? 200 : 0 },
        { name: 'Доска для опалубки 1-й сорт(50х200х6000)мм', unit: 'м3', quantity: 2.52, price: 19500, total: isStripSelected ? 49140 : 0 },
        { name: 'Гвозди для опалубки и др.(100х4)мм', unit: 'кг', quantity: 14, price: 200, total: isStripSelected ? 2800 : 0 },
        { name: 'Пленка под опалубку 200мкм', unit: 'м2', quantity: 200, price: 70, total: isStripSelected ? 14000 : 0 },
        { name: 'Саморезы черные(4,2х90)мм', unit: 'шт', quantity: 600, price: 3, total: isStripSelected ? 1800 : 0 },
        { name: 'Пленка полиэтиленовая 200мкм', unit: 'м2', quantity: 50, price: 70, total: isStripSelected ? 3500 : 0 },
        { name: 'Скобы для степлера', unit: 'шт', quantity: 600, price: 0.2, total: isStripSelected ? 120 : 0 },
        { name: 'Фиксаторы арматуры(35мм)', unit: 'шт', quantity: 300, price: 10, total: isStripSelected ? 3000 : 0 },
        { name: 'Монтаж фундамента, буронабивные сваи', unit: 'м3', quantity: parseFloat(concrete.toFixed(2)), price: 10000, total: isStripSelected ? Math.round(concrete * 10000) : 0 },
        { name: 'Работы ямобуром, под буронабивные сваи', unit: 'шт', quantity: 30, price: 1000, total: isStripSelected ? 30000 : 0 },
        { name: 'Работы экскаватором', unit: 'ч', quantity: 3, price: 2000, total: isStripSelected ? 6000 : 0 },
        { name: 'Обвязочный борт(100х200х6000)мм', unit: 'м3', quantity: 0.6, price: 19500, total: isStripSelected ? 11700 : 0 },
        { name: 'Рубероид РПП', unit: 'м2', quantity: 30, price: 65, total: isStripSelected ? 1950 : 0 },
        { name: 'Антисептик зимний "Фенелакс"(-15С)', unit: 'л', quantity: 1, price: 150, total: isStripSelected ? 150 : 0 },
        { name: 'Скобы строительные(8х250)', unit: 'шт', quantity: 6, price: 60, total: isStripSelected ? 360 : 0 },
        { name: 'Монтаж обвязки', unit: 'м3', quantity: 0.6, price: 10000, total: isStripSelected ? 6000 : 0 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = isStripSelected ? sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0) : 0;

    sections.push({
      title: 'Обвязка и черновой пол',
      items: [
        { name: 'Брус для лаг, балок обвязки(100х150)мм', unit: 'м3', quantity: 4, price: 19500, total: 78000 },
        { name: 'Доска полов 1-й сорт(28х100)мм', unit: 'м2', quantity: 80, price: 1050, total: 84000 },
        { name: 'Пароизоляция(без фольги)', unit: 'м2', quantity: 80, price: 35, total: 2800 },
        { name: 'Утеплитель каменная вата(50мм)', unit: 'м2', quantity: 40, price: 250, total: 10000 },
        { name: 'Гидро-ветрозащита', unit: 'м2', quantity: 80, price: 65, total: 5200 },
        { name: 'Гвозди(3х60)мм', unit: 'кг', quantity: 10, price: 200, total: 2000 },
        { name: 'Скобы для степлера', unit: 'шт', quantity: 1000, price: 0.2, total: 200 },
        { name: 'Антисептик', unit: 'л', quantity: 20, price: 130, total: 2600 },
        { name: 'Уголок крепежный оцинкованный(70х70)', unit: 'шт', quantity: 90, price: 30, total: 2700 },
        { name: 'Саморезы(4х50)мм', unit: 'шт', quantity: 180, price: 3, total: 540 },
        { name: 'Саморезы(5х90)мм', unit: 'шт', quantity: 360, price: 6, total: 2160 },
        { name: 'Монтаж обвязки', unit: 'м3', quantity: 4, price: 7500, total: 30000 },
        { name: 'Монтаж лаг пола', unit: 'шт', quantity: 18, price: 600, total: 10800 },
        { name: 'Монтаж утепления', unit: 'м2', quantity: 40, price: 225, total: 9000 },
        { name: 'Монтаж чернового пола', unit: 'м2', quantity: 80, price: 1550, total: 124000 },
        { name: 'Монтаж лаг под чистовой пол', unit: 'м2', quantity: 0.6, price: 100, total: 60 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    const logVolume = perimeter * 0.15 * 2.5;
    const partitionVolume = pl > 0 ? parseFloat((pl * 0.15 * 2.5).toFixed(2)) : 0;
    sections.push({
      title: 'Сруб из бревна',
      items: [
        { name: 'Брус для сруба', unit: 'м3', quantity: parseFloat(logVolume.toFixed(2)), price: 19500, total: Math.round(logVolume * 19500) },
        { name: 'Брус для перегородки', unit: 'м3', quantity: partitionVolume, price: 19500, total: Math.round(partitionVolume * 19500) },
        { name: 'Джут(150мм)', unit: 'п.м', quantity: 400, price: 25, total: 10000 },
        { name: 'Скобы для степлера', unit: 'шт', quantity: 1000, price: 0.2, total: 200 },
        { name: 'Шкант березовый(24х1200)мм', unit: 'шт', quantity: 500, price: 9, total: 4500 },
        { name: 'Анкер для бруса(20х750)мм', unit: 'шт', quantity: 25, price: 120, total: 3000 },
        { name: 'Монтаж сруба', unit: 'м3', quantity: parseFloat(logVolume.toFixed(2)), price: 10000, total: Math.round(logVolume * 10000) },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);



    const roofArea = area * 1.3;
    sections.push({
      title: 'Кровля',
      items: [
        { name: 'Брус для сруба', unit: 'м3', quantity: 17.16, price: 19500, total: 334620 },
        { name: 'Доска 1-й сорт(28х150)мм', unit: 'м3', quantity: 600, price: 25, total: 15000 },
        { name: 'Скобы для степпера(№10)', unit: 'шт', quantity: 50, price: 60, total: 3000 },
        { name: 'Шкант для стропил и др.', unit: 'шт', quantity: 36, price: 100, total: 3600 },
        { name: 'Пленка гидроветрозащитная', unit: 'м2', quantity: 100, price: 75, total: 7500 },
        { name: 'Шпилька резьбовая оцинкованная(10х1000)мм', unit: 'м', quantity: 21.07, price: 22000, total: 463540 },
        { name: 'Гайка оцинкованная(М10)', unit: 'шт', quantity: 600, price: 25, total: 15000 },
        { name: 'Шайба увеличенная оцинкованная(М10)', unit: 'шт', quantity: 600, price: 6, total: 3600 },
        { name: 'Уголок крепежный оцинкованный(70х70)', unit: 'шт', quantity: 5000, price: 9, total: 45000 },
        { name: 'Шуруп "глухарь"(8х40)мм', unit: 'шт', quantity: 21, price: 100, total: 2100 },
        { name: 'Джут для стропил', unit: 'п.м', quantity: 1.62, price: 19500, total: 31590 },
        { name: 'Доска для лаг, балок(100х150)мм', unit: 'м3', quantity: 1.62, price: 19500, total: 31590 },
        { name: 'Доска для стропил и др.(50х150)мм', unit: 'м3', quantity: 1.7, price: 19500, total: 33150 },
        { name: 'Доска для обрешетки и разжелобков(40х100)мм', unit: 'м3', quantity: 1.7, price: 19500, total: 33150 },
        { name: 'Пленка гидроветрозащитная', unit: 'м2', quantity: 100, price: 150, total: 15000 },
        { name: 'Планка гидроизоляционная', unit: 'м2', quantity: 100, price: 150, total: 15000 },
        { name: 'Планка фронтонная(вет.планка)', unit: 'п.м', quantity: 8, price: 500, total: 4000 },
        { name: 'Планка коньковая (конёк)НС35', unit: 'п.м', quantity: 6, price: 500, total: 3000 },
        { name: 'Шайба уплотнительная оцинкованная(М10)', unit: 'шт', quantity: 30, price: 6, total: 180 },
        { name: 'Уголок крепежный оцинкованный(70х70)', unit: 'шт', quantity: 90, price: 30, total: 2700 },
        { name: 'Кровельный саморез(4,8х35)', unit: 'шт', quantity: 240, price: 6, total: 1440 },
        { name: 'Монтаж стропильной системы', unit: 'м2', quantity: parseFloat(roofArea.toFixed(2)), price: 3000, total: Math.round(roofArea * 3000) },
        { name: 'Доставка материалов, транспортный расход, лоси и тп', unit: '', quantity: 1, price: 84750, total: 84750 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    sections.push({
      title: 'Полы',
      items: [
        { name: 'Вагонка(А1х100)мм', unit: 'м2', quantity: 16, price: 200, total: 3200 },
        { name: 'Металлочерепица', unit: 'м2', quantity: 80, price: 750, total: 60000 },
        { name: 'Планка карнизная', unit: 'п.м', quantity: 16, price: 240, total: 3840 },
        { name: 'Ветровая планка', unit: 'п.м', quantity: 20, price: 240, total: 4800 },
        { name: 'Кровельные саморезы(4,8х35)', unit: 'шт', quantity: 15, price: 240, total: 3600 },
        { name: 'Снегозадержатель сплошной(3,3м)', unit: 'шт', quantity: 2, price: 2450, total: 4900 },
        { name: 'Кровельные саморезы(4,8х35)', unit: 'шт', quantity: 240, price: 6, total: 1440 },
        { name: 'Монтаж кровли(цвет)', unit: 'м2', quantity: 80, price: 240, total: 19200 },
      ],
      subtotal: 100980
    });

    sections.push({
      title: 'Отделка',
      items: [
        { name: 'Вагонка(А1х100)мм', unit: 'м2', quantity: 3000, price: 240, total: 720000 },
        { name: 'Доска полов 1-й сорт(28х100)мм', unit: 'м2', quantity: 80, price: 1050, total: 84000 },
        { name: 'Балясина резная 80х80х90см', unit: 'шт', quantity: 17, price: 350, total: 5950 },
        { name: 'Ступень лиственница(40х300)мм', unit: 'м3', quantity: 1.2, price: 35000, total: 42000 },
        { name: 'Опорный столб резной №1 90х90х270см', unit: 'шт', quantity: 2, price: 3800, total: 7600 },
        { name: 'Перила/поручень лиственница(60х100)мм', unit: 'м3', quantity: 0.24, price: 45000, total: 10800 },
        { name: 'Монтаж лестницы', unit: 'м2', quantity: 2, price: 4500, total: 9000 },
      ],
      subtotal: 879350
    });

    sections.push({
      title: 'Дополнительно',
      items: [
        { name: 'Дверь металлическая(900х2100)мм', unit: 'шт', quantity: 1, price: 3000, total: 3000 },
        { name: 'Ручка(А1х100)мм', unit: 'шт', quantity: 16, price: 200, total: 3200 },
        { name: 'Металлочерепица', unit: 'м2', quantity: 80, price: 750, total: 60000 },
        { name: 'Стеклопакет(6х3,5мм)', unit: 'шт', quantity: 6, price: 2500, total: 15000 },
        { name: 'Монтаж окон', unit: 'шт', quantity: 6, price: 500, total: 3000 },
        { name: 'Обсадная коробка(обл150х150)мм', unit: 'к-т', quantity: 6, price: 2500, total: 15000 },
        { name: 'Коробка для двери(обл.90х200)мм', unit: 'шт', quantity: 1, price: 1500, total: 1500 },
      ],
      subtotal: 100700
    });

    const total = sections.reduce((sum, section) => sum + section.subtotal, 0);

    setEstimate(sections);
    setTotalPrice(total);
  };

  useEffect(() => {
    if (foundation && length && width) {
      calculateEstimate();
    }
  }, [foundation, length, width, partitionLength]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[400px,1fr] gap-8">
          <Card className="shadow-xl h-fit lg:sticky lg:top-8">
            <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <CardTitle className="text-2xl text-center">Калькулятор бани</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Выберите тип фундамента:</Label>
                <RadioGroup value={foundation} onValueChange={setFoundation}>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="ленточный" id="lenточный" />
                    <Label htmlFor="lenточный" className="cursor-pointer flex-1">
                      Ленточный фундамент
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="сваи" id="svai" />
                    <Label htmlFor="svai" className="cursor-pointer flex-1">
                      Винтовые сваи
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="есть" id="est" />
                    <Label htmlFor="est" className="cursor-pointer flex-1">
                      Фундамент уже есть
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length" className="text-base font-semibold">
                      Длина (м)
                    </Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="6"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-base font-semibold">
                      Ширина (м)
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="4"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="partition" className="text-base font-semibold">
                      Длина перегородок (м)
                    </Label>
                    <Input
                      id="partition"
                      type="number"
                      placeholder="0"
                      value={partitionLength}
                      onChange={(e) => setPartitionLength(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Периметр (м)
                    </Label>
                    <div className="h-11 flex items-center justify-center bg-gray-100 rounded-md border text-lg font-semibold text-gray-700">
                      {length && width ? (
                        (parseFloat(length) + parseFloat(width)) * 2 + (partitionLength ? parseFloat(partitionLength) : 0)
                      ).toFixed(2) : '—'}
                    </div>
                  </div>
                </div>
              </div>

              {totalPrice > 0 && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-center space-y-1">
                      <p className="text-gray-600 text-sm">Общая стоимость:</p>
                      <p className="text-3xl font-bold text-green-700">
                        {totalPrice.toLocaleString('ru-RU')} ₽
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        * Окончательная цена после осмотра объекта
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {estimate.length > 0 && (
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="text-xl text-center">
                  Детальная смета (расчет под крышу, без отделки)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {estimate.map((section, idx) => (
                    <div key={idx} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-bold text-lg mb-3 text-gray-800">{section.title}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="text-left p-2 font-semibold">Наименование</th>
                              <th className="text-center p-2 font-semibold w-20">Ед.из</th>
                              <th className="text-center p-2 font-semibold w-24">Кол-во</th>
                              <th className="text-right p-2 font-semibold w-28">Цена, ₽</th>
                              <th className="text-right p-2 font-semibold w-32">Стоимость, ₽</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.items.map((item, itemIdx) => (
                              <tr key={itemIdx} className={`border-t hover:bg-gray-50 ${item.total === 0 ? 'opacity-40' : ''}`}>
                                <td className="p-2">{item.name}</td>
                                <td className="text-center p-2">{item.unit}</td>
                                <td className="text-center p-2">{item.quantity > 0 ? item.quantity.toFixed(2) : '—'}</td>
                                <td className="text-right p-2">{item.price.toLocaleString('ru-RU')}</td>
                                <td className="text-right p-2 font-semibold">{item.total.toLocaleString('ru-RU')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-lg font-bold text-blue-700">
                          Поэтапно: {section.subtotal.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">ИТОГО:</span>
                      <span className="text-2xl font-bold text-green-700">
                        {totalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;