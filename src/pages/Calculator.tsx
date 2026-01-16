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
    const pilesCount = 12;
    const isPilesSelected = foundation === 'сваи';
    sections.push({
      title: 'Фундамент из винтовых свай',
      items: [
        { name: 'Свая винтовая 89/6,5/300(2,5м)', unit: 'шт', quantity: 12, price: 3000, total: isPilesSelected ? 36000 : 0 },
        { name: 'Оголовки для свай съемные(150х150)мм', unit: 'шт', quantity: 12, price: 600, total: isPilesSelected ? 7200 : 0 },
        { name: 'Брус для обвязки', unit: 'шт', quantity: 16, price: 4000, total: isPilesSelected ? 64000 : 0 },
        { name: 'Рубероид РПП 350', unit: 'м2', quantity: 15, price: 65, total: isPilesSelected ? 975 : 0 },
        { name: 'Антисептик "Фенелакс"(-15С)', unit: 'л', quantity: 5, price: 130, total: isPilesSelected ? 650 : 0 },
        { name: 'Саморезы черные', unit: 'шт', quantity: 350, price: 3, total: isPilesSelected ? 1050 : 0 },
        { name: 'Гвозди', unit: 'кг', quantity: 3, price: 200, total: isPilesSelected ? 600 : 0 },
        { name: 'Фиксаторы арматуры(35мм)', unit: 'шт', quantity: 100, price: 10, total: isPilesSelected ? 1000 : 0 },
        { name: 'Монтаж обвязки', unit: 'услуга', quantity: 1, price: 3205, total: isPilesSelected ? 3205 : 0 },
      ],
      subtotal: isPilesSelected ? 114680 : 0
    });

    // Обвязка и черновой пол - всегда показываем
    sections.push({
      title: 'Обвязка и черновой пол',
      items: [
        { name: 'Обвязочный брус(100х200х6000)мм', unit: 'м3', quantity: 0.6, price: 19500, total: 11700 },
        { name: 'Рубероид РПП 350', unit: 'м2', quantity: 30, price: 65, total: 1950 },
        { name: 'Скобы строительные(8x250)', unit: 'шт', quantity: 6, price: 60, total: 360 },
        { name: 'Монтаж обвязки', unit: 'м3', quantity: 0.6, price: 10000, total: 6000 },
        { name: 'Брус для сруба', unit: 'м3', quantity: 17.16, price: 19500, total: 334620 },
        { name: 'Джут(150мм)', unit: 'п.м', quantity: 600, price: 25, total: 15000 },
        { name: 'Скобы для степлера', unit: 'шт', quantity: 1000, price: 0.2, total: 200 },
        { name: 'Шкант для стропил', unit: 'шт', quantity: 36, price: 60, total: 2160 },
      ],
      subtotal: 364100
    });

    // Ленточный фундамент - всегда показываем, но считаем только если выбран
    const isStripSelected = foundation === 'ленточный';
    sections.push({
      title: 'Фундамент ленточный, с буронабивными сваями',
      items: [
        { name: 'Бетон B20 M250(на щебне)', unit: 'м3', quantity: 12, price: 8100, total: isStripSelected ? 97200 : 0 },
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
        { name: 'Монтаж фундамента, буронабивные сваи', unit: 'услуга', quantity: 1, price: 120000, total: isStripSelected ? 120000 : 0 },
        { name: 'Работы ямобуром', unit: 'услуга', quantity: 1, price: 30000, total: isStripSelected ? 30000 : 0 },
        { name: 'Работы экскаватором', unit: 'ч', quantity: 3, price: 2000, total: isStripSelected ? 6000 : 0 },
        { name: 'Обвязочный борт(100х200х6000)мм', unit: 'м3', quantity: 0.6, price: 19500, total: isStripSelected ? 11700 : 0 },
        { name: 'Рубероид РПП', unit: 'м2', quantity: 30, price: 65, total: isStripSelected ? 1950 : 0 },
        { name: 'Антисептик зимний', unit: 'л', quantity: 1, price: 150, total: isStripSelected ? 150 : 0 },
        { name: 'Скобы строительные(8х250)', unit: 'шт', quantity: 6, price: 60, total: isStripSelected ? 360 : 0 },
        { name: 'Монтаж обвязки', unit: 'м3', quantity: 0.6, price: 10000, total: isStripSelected ? 6000 : 0 },
      ],
      subtotal: isStripSelected ? 353270 : 0
    });

    // Сруб из бревна
    sections.push({
      title: 'Сруб из бревна',
      items: [
        { name: 'Брус для сруба', unit: 'м3', quantity: 21.07, price: 22000, total: 463540 },
        { name: 'Джут(150мм)', unit: 'п.м', quantity: 600, price: 25, total: 15000 },
        { name: 'Скобы для степлера', unit: 'шт', quantity: 5000, price: 0.9, total: 4500 },
        { name: 'Шкант березовый(24х1200)мм', unit: 'шт', quantity: 500, price: 9, total: 4500 },
        { name: 'Анкер для бруса(20х750)мм', unit: 'шт', quantity: 25, price: 120, total: 3000 },
        { name: 'Монтаж сруба', unit: 'м3', quantity: 21.07, price: 10000, total: 210700 },
      ],
      subtotal: 700360
    });

    // Кровля
    sections.push({
      title: 'Кровля',
      items: [
        { name: 'Доска для лаг, балок(100х150)мм', unit: 'м3', quantity: 1.62, price: 19500, total: 31590 },
        { name: 'Доска для стропил(50х150)мм', unit: 'м3', quantity: 1.7, price: 19500, total: 33150 },
        { name: 'Доска для обрешетки(40х100)мм', unit: 'м3', quantity: 1.7, price: 19500, total: 33150 },
        { name: 'Пленка гидроветрозащитная', unit: 'м2', quantity: 100, price: 150, total: 15000 },
        { name: 'Планка гидроизоляционная', unit: 'м2', quantity: 100, price: 150, total: 15000 },
        { name: 'Планка фронтонная(вет.планка)', unit: 'п.м', quantity: 8, price: 500, total: 4000 },
        { name: 'Планка коньковая(конёк)НС35', unit: 'п.м', quantity: 6, price: 500, total: 3000 },
        { name: 'Шайба уплотнительная оцинкованная(М10)', unit: 'шт', quantity: 30, price: 6, total: 180 },
        { name: 'Уголок крепежный оцинкованный(70х70)', unit: 'шт', quantity: 90, price: 30, total: 2700 },
        { name: 'Кровельный саморез(4,8х35)', unit: 'шт', quantity: 240, price: 6, total: 1440 },
        { name: 'Монтаж стропильной системы', unit: 'м2', quantity: 80, price: 3000, total: 240000 },
        { name: 'Доставка материалов', unit: 'услуга', quantity: 1, price: 84750, total: 84750 },
      ],
      subtotal: 702464
    });

    // Полы
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
      subtotal: 29590
    });

    // Отделка
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
      subtotal: 549690
    });

    // Дополнительно
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
      subtotal: 84750
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
                  <div>
                    <Label htmlFor="length" className="text-sm font-medium">Длина (м)</Label>
                    <Input
                      id="length"
                      type="number"
                      step="0.5"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="6"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width" className="text-sm font-medium">Ширина (м)</Label>
                    <Input
                      id="width"
                      type="number"
                      step="0.5"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="4"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="partitionLength" className="text-sm font-medium">
                    Длина перегородок (м)
                  </Label>
                  <Input
                    id="partitionLength"
                    type="number"
                    step="0.5"
                    value={partitionLength}
                    onChange={(e) => setPartitionLength(e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>

                {!foundation || !length || !width ? (
                  <div className="text-sm text-amber-700 bg-amber-50 p-4 rounded-lg border border-amber-200">
                    Заполните все обязательные поля для расчета
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>

          {estimate.length > 0 && (
            <div className="space-y-6">
              <Card className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                  <CardTitle className="text-2xl">Примерная смета</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  {estimate.map((section, idx) => (
                    <div
                      key={idx}
                      className={`transition-opacity ${section.subtotal === 0 ? 'opacity-40' : ''}`}
                    >
                      <h3 className="font-bold text-lg text-amber-800 mb-4 pb-2 border-b-2 border-amber-200">
                        {section.title}
                      </h3>
                      <div className="space-y-2 mb-4">
                        {section.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="grid grid-cols-[1fr,auto,auto] gap-4 text-sm py-1"
                          >
                            <span className="text-gray-700">
                              {item.name}
                            </span>
                            <span className="text-gray-500 text-right whitespace-nowrap">
                              {item.quantity} {item.unit}
                            </span>
                            <span className="font-medium text-right whitespace-nowrap">
                              {item.total.toLocaleString()} ₽
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-amber-200">
                        <span className="font-semibold text-amber-800">Итого по разделу:</span>
                        <span className="font-bold text-lg text-amber-900">
                          {section.subtotal.toLocaleString()} ₽
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 pt-6 border-t-4 border-amber-500">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-800">Общая стоимость:</span>
                      <span className="text-3xl font-bold text-amber-600">
                        {totalPrice.toLocaleString()} ₽
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
