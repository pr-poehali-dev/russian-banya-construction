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
  const [length, setLength] = useState<string>('6');
  const [width, setWidth] = useState<string>('6');
  const [partitionLength, setPartitionLength] = useState<string>('6');
  const [estimate, setEstimate] = useState<EstimateSection[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateEstimate = () => {
    const l = length ? parseFloat(length) : 6;
    const w = width ? parseFloat(width) : 4;
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
      ],
      subtotal: isPilesSelected ? pilesCount * 7600 : 0
    });

    // Ленточный фундамент - всегда показываем, но считаем только если выбран
    const concrete = parseFloat((perimeter * 0.4).toFixed(2));
    const drainagePillow = Math.round(perimeter * 0.15);
    const reinforcement = Math.round(perimeter * 15 / 100) * 100;
    const bindingWire = Math.round(perimeter * 0.06);
    const formworkBoard = Math.round(perimeter * 0.126);
    const nails = Math.round(perimeter * 0.25);
    const screws = Math.round(perimeter * 20 / 100) * 100;
    const isStripSelected = foundation === 'ленточный';
    sections.push({
      title: 'Фундамент ленточный, с буронабивными сваями',
      items: [
        { name: 'Бетон B20 M250(на щебне)', unit: 'м3', quantity: concrete, price: 8100, total: isStripSelected ? Math.round(concrete * 8100) : 0 },
        { name: 'Дренажная подушка(ПГС)', unit: 'т', quantity: drainagePillow, price: 1000, total: isStripSelected ? drainagePillow * 1000 : 0 },
        { name: 'Арматура металлическая(12мм)', unit: 'п.м', quantity: reinforcement, price: 100, total: isStripSelected ? reinforcement * 100 : 0 },
        { name: 'Проволока вязальная(0,4мм)', unit: 'кг', quantity: bindingWire, price: 500, total: isStripSelected ? bindingWire * 500 : 0 },
        { name: 'Доска для опалубки 1-й сорт(50х200х6000)мм', unit: 'м3', quantity: formworkBoard, price: 19500, total: isStripSelected ? formworkBoard * 19500 : 0 },
        { name: 'Гвозди(4х100)мм', unit: 'кг', quantity: nails, price: 200, total: isStripSelected ? nails * 200 : 0 },
        { name: 'Саморезы черные(4,2х90)мм', unit: 'шт', quantity: screws, price: 3, total: isStripSelected ? screws * 3 : 0 },
        { name: 'Пленка полиэтиленовая(200мк)', unit: 'м2', quantity: 50, price: 70, total: isStripSelected ? 3500 : 0 },
        { name: 'Скобы для степпера(№10)', unit: 'шт', quantity: 2000, price: 0.2, total: isStripSelected ? 400 : 0 },
        { name: 'Фиксаторы арматуры(35мм)', unit: 'шт', quantity: 300, price: 10, total: isStripSelected ? 3000 : 0 },
        { name: 'Монтаж фундамента(с буронабивными сваями)', unit: 'м3', quantity: concrete, price: 10000, total: isStripSelected ? Math.round(concrete * 10000) : 0 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = isStripSelected ? sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0) : 0;

    sections.push({
      title: 'Обвязка и черновой пол',
      items: [
        { name: 'Обвязочный брус(100х200)мм', unit: 'м3', quantity: 0.48, price: 19500, total: 9360 },
        { name: 'Рубероид РПП 300', unit: 'м2', quantity: 20, price: 65, total: 1300 },
        { name: 'Антисептик зимний "Фенелакс"(-15С)', unit: 'л', quantity: 5, price: 130, total: 650 },
        { name: 'Шуруп "глухарь"(8х40)мм', unit: 'шт', quantity: Math.ceil(perimeter * 2), price: 4, total: Math.ceil(perimeter * 2) * 4 },
        { name: 'Скобы строительные(8х250)', unit: 'шт', quantity: 6, price: 60, total: 360 },
        { name: 'Монтаж обвязки', unit: 'м3', quantity: 0.48, price: 7500, total: 3600 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    const partitionVolume = pl > 0 ? parseFloat((pl * 0.15 * 2.5).toFixed(2)) : 0;
    sections.push({
      title: 'Сруб из бревна',
      items: [
        { name: 'Брус основного сруба', unit: 'м3', quantity: parseFloat((area * 1.2).toFixed(2)), price: 22000, total: Math.round(area * 1.2 * 22000) },
        { name: 'Брус перегородки', unit: 'м3', quantity: partitionVolume, price: 22000, total: Math.round(partitionVolume * 22000) },
        { name: 'Брус фронтонов', unit: 'м3', quantity: 0, price: 19500, total: 0 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    sections.push({
      title: 'Общая кубатура',
      items: [
        { name: 'Джут(150мм)', unit: 'п.м', quantity: 500, price: 25, total: 12500 },
        { name: 'Шкант березовый(24х1200)мм', unit: 'шт', quantity: 60, price: 40, total: 2400 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    sections.push({
      title: 'Монтаж бруса (строгание с 2х сторон, фаски с 4х)',
      items: [
        { name: 'Монтаж сруба', unit: 'м3', quantity: parseFloat((area * 1.2).toFixed(2)), price: 9000, total: Math.round(area * 1.2 * 9000) },
      ],
      subtotal: Math.round(area * 1.2 * 9000)
    });

    sections.push({
      title: 'Лаги пола, балки перекрытия',
      items: [
        { name: 'Брус для лаг, балок(100х150)мм', unit: 'м3', quantity: 1.62, price: 19500, total: 31590 },
        { name: 'Монтаж лаг', unit: 'шт', quantity: 18, price: 600, total: 10800 },
      ],
      subtotal: 42390
    });

    sections.push({
      title: 'Крыша',
      items: [
        { name: 'Доска 1-й сорт(50х150)мм', unit: 'м3', quantity: 1.46, price: 19500, total: 28518 },
        { name: 'Доска 1-й сорт(40х100)мм', unit: 'м3', quantity: 1.27, price: 19500, total: 24757 },
        { name: 'Брусок(50х50)мм', unit: 'м3', quantity: 0.22, price: 20000, total: 4383 },
        { name: 'Пленка гидроветрозащитная', unit: 'м2', quantity: 100, price: 75, total: 7500 },
        { name: 'Шпилька резьбовая оцинкованная(10х1000)мм', unit: 'м', quantity: 8, price: 100, total: 800 },
        { name: 'Гайка оцинкованная(М10)', unit: 'шт', quantity: 78, price: 6, total: 468 },
        { name: 'Шайба увеличенная оцинкованная(М10)', unit: 'шт', quantity: 78, price: 6, total: 468 },
        { name: 'Уголок крепежный оцинкованный(70х70)', unit: 'шт', quantity: 26, price: 30, total: 780 },
        { name: 'Шуруп "глухарь"(8х40)мм', unit: 'шт', quantity: 52, price: 4, total: 208 },
        { name: 'Джут(150мм)', unit: 'п.м', quantity: 30, price: 25, total: 750 },
        { name: 'Скобы для степпера(№10)', unit: 'шт', quantity: 1000, price: 0.2, total: 200 },
        { name: 'Гвозди(4х120)мм', unit: 'кг', quantity: 4, price: 200, total: 800 },
        { name: 'Гвозди(4х100)мм', unit: 'кг', quantity: 6, price: 200, total: 1200 },
        { name: 'Саморезы черные(4,2х90)мм', unit: 'шт', quantity: 250, price: 3, total: 750 },
        { name: 'Металлочерепица', unit: 'м2', quantity: parseFloat((area * 1.5).toFixed(2)), price: 750, total: Math.round(area * 1.5 * 750) },
        { name: 'Конек плоский(200х200)мм', unit: 'п.м', quantity: Math.max(l, w), price: 240, total: Math.round(Math.max(l, w) * 240) },
        { name: 'Ветровая планка', unit: 'п.м', quantity: 16, price: 240, total: 3840 },
        { name: 'Карнизная планка', unit: 'п.м', quantity: 15, price: 240, total: 3600 },
        { name: 'Кровельные саморезы(4,8*35)', unit: 'шт', quantity: 450, price: 5, total: 2250 },
        { name: 'Кровельные саморезы(4,8*50)', unit: 'шт', quantity: 150, price: 6, total: 900 },
        { name: 'Монтаж кровли', unit: 'м2', quantity: parseFloat((area * 1.5).toFixed(2)), price: 2500, total: Math.round(area * 1.5 * 2500) },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    const total = sections.reduce((sum, section) => sum + section.subtotal, 0);

    setEstimate(sections);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateEstimate();
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
              <div className="space-y-4">
                <Label className="text-base font-semibold">Размеры вашей бани</Label>
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
              </div>

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

          <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="text-xl text-center">
                  Детальная смета (расчет под крышу, без отделки)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-white border-2 border-black mb-6">
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
                        <td className="border-r border-black p-1.5 font-bold text-center" colSpan={4}>Заказчик</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}></td>
                        <td className="border-r border-black p-1.5 text-center">телефон</td>
                        <td className="p-1.5"></td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}></td>
                        <td className="border-r border-black p-1.5 text-center">почта</td>
                        <td className="p-1.5"></td>
                      </tr>
                      <tr className="border-b border-black bg-gray-50">
                        <td className="border-r border-black p-1.5 font-bold text-center" colSpan={4}>Данные объекта</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5 font-bold" colSpan={2}>Параметры</td>
                        <td className="border-r border-black p-1.5 font-bold text-center">Значения</td>
                        <td className="p-1.5 font-bold text-center">Дополнительные значения</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Фундамент</td>
                        <td className="border-r border-black p-1.5 text-center">
                          {foundation === 'ленточный' ? 'Ленточный' : foundation === 'сваи' ? 'Винтовые сваи' : foundation === 'есть' ? 'Без фундамента' : '—'}
                        </td>
                        <td className="border-r border-black p-1.5 text-center">Периметр фундамента, м</td>
                        <td className="p-1.5 text-right">
                          {length && width ? (
                            (parseFloat(length) + parseFloat(width)) * 2 + (partitionLength ? parseFloat(partitionLength) : 0)
                          ).toFixed(2) : '—'}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Что хотите построить</td>
                        <td className="border-r border-black p-1.5 text-center">Баня под крышу</td>
                        <td className="border-r border-black p-1.5 text-center">Высота 1 этажа в чистоте, м</td>
                        <td className="p-1.5 text-right">2,2</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Из чего хотите построить</td>
                        <td className="border-r border-black p-1.5 text-center">Брус обычный</td>
                        <td className="border-r border-black p-1.5 text-center">Высота сруба 1 этажа, м</td>
                        <td className="p-1.5 text-right">{(2.2 + 0.6).toFixed(1)}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Этажность</td>
                        <td className="border-r border-black p-1.5 text-center">1,5 этажа</td>
                        <td className="border-r border-black p-1.5 text-center">Высота мансарды, м</td>
                        <td className="p-1.5 text-right">
                          {width ? (1 + parseFloat(width) / 2.5).toFixed(1) : '—'}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Длина строения, м</td>
                        <td className="border-r border-black p-1.5 text-center">{length || '—'}</td>
                        <td className="border-r border-black p-1.5 text-center">Высота стен мансарды, м</td>
                        <td className="p-1.5 text-right">1</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Ширина строения, м</td>
                        <td className="border-r border-black p-1.5 text-center">{width || '—'}</td>
                        <td className="border-r border-black p-1.5 text-center">Высота стен всего сруба, м</td>
                        <td className="p-1.5 text-right">{((2.2 + 0.6) + 1).toFixed(1)}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Длина перегородок 1 этажа, м</td>
                        <td className="border-r border-black p-1.5 text-center">{partitionLength || '0'}</td>
                        <td className="border-r border-black p-1.5 text-center">Площадь, м2</td>
                        <td className="p-1.5 text-right">{length && width ? (parseFloat(length) * parseFloat(width)).toFixed(0) : '—'}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Расстояние до объекта в 1 сторону, км</td>
                        <td className="border-r border-black p-1.5 text-center">0</td>
                        <td className="border-r border-black p-1.5 text-center">Высота крыши, м</td>
                        <td className="p-1.5 text-right">
                          {width ? (parseFloat(width) / 2.5).toFixed(1) : '—'}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}></td>
                        <td className="border-r border-black p-1.5"></td>
                        <td className="border-r border-black p-1.5 text-center">Длина конька, м</td>
                        <td className="p-1.5 text-right">
                          {length ? (parseFloat(length) + 1).toFixed(0) : '—'}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}></td>
                        <td className="border-r border-black p-1.5"></td>
                        <td className="border-r border-black p-1.5 text-center">Длина стропила, м</td>
                        <td className="p-1.5 text-right">
                          {width ? (() => {
                            const w = parseFloat(width);
                            const roofHeight = w / 2.5;
                            return (Math.sqrt(roofHeight * roofHeight + (w / 2) * (w / 2)) + 1).toFixed(1);
                          })() : '—'}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}></td>
                        <td className="border-r border-black p-1.5"></td>
                        <td className="border-r border-black p-1.5 text-center">Площадь кровли, м</td>
                        <td className="p-1.5 text-right">
                          {length && width ? (() => {
                            const l = parseFloat(length);
                            const w = parseFloat(width);
                            const ridgeLength = l + 1;
                            const roofHeight = w / 2.5;
                            const rafterLength = Math.sqrt(roofHeight * roofHeight + (w / 2) * (w / 2)) + 1;
                            const roofArea = ridgeLength * rafterLength * 2.2;
                            return Math.ceil(roofArea / 10) * 10;
                          })() : '—'}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}></td>
                        <td className="border-r border-black p-1.5"></td>
                        <td className="border-r border-black p-1.5 text-center">Количество стропильных пар, шт</td>
                        <td className="p-1.5 text-right">
                          {length ? (() => {
                            const ridgeLength = parseFloat(length) + 1;
                            return Math.round(ridgeLength / 0.64 + 4);
                          })() : '—'}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}></td>
                        <td className="border-r border-black p-1.5"></td>
                        <td className="border-r border-black p-1.5"></td>
                        <td className="p-1.5"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {estimate.length > 0 && (
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
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;