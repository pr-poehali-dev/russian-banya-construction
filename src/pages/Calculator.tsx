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
  const [material, setMaterial] = useState<string>('ocilindrovannoe-brevno');
  const [floors, setFloors] = useState<string>('1');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [partitionLength, setPartitionLength] = useState<string>('');
  const [location, setLocation] = useState<string>('perm');
  const [estimate, setEstimate] = useState<EstimateSection[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateEstimate = () => {
    if (!foundation || !length || !width) return;

    const l = parseFloat(length);
    const w = parseFloat(width);
    const pl = partitionLength ? parseFloat(partitionLength) : 0;
    const area = l * w;
    const perimeter = 2 * (l + w);

    const sections: EstimateSection[] = [];

    // 1. Фундамент винтовые сваи
    const pilesCount = 12;
    const isPilesSelected = foundation === 'stolbchatyj';
    sections.push({
      title: 'Фундамент из винтовых свай',
      items: [
        { name: 'Свая винтовая 89/6,5/300(2,5м)', unit: 'шт', quantity: 12, price: 3000, total: isPilesSelected ? 36000 : 0 },
        { name: 'Оголовки для свай съемные(150х150)мм', unit: 'шт', quantity: 12, price: 600, total: isPilesSelected ? 7200 : 0 },
        { name: 'Монтаж свай', unit: 'шт', quantity: 12, price: 4000, total: isPilesSelected ? 48000 : 0 },
        { name: 'Брус обвязочный(100х200)мм', unit: 'м3', quantity: 1, price: 19500, total: isPilesSelected ? 19500 : 0 },
        { name: 'Рубероид РПП 300', unit: 'м2', quantity: 6, price: 65, total: isPilesSelected ? 390 : 0 },
        { name: 'Антисептик зимний "Фенелакс"(-15С)', unit: 'л', quantity: 6, price: 130, total: isPilesSelected ? 780 : 0 },
        { name: 'Саморезы(4х90)мм', unit: 'шт', quantity: 150, price: 3, total: isPilesSelected ? 450 : 0 },
        { name: 'Гвозди(4х120)мм', unit: 'кг', quantity: 2, price: 200, total: isPilesSelected ? 400 : 0 },
        { name: 'Монтаж обвязки', unit: 'м3', quantity: 1, price: 1960, total: isPilesSelected ? 1960 : 0 },
      ],
      subtotal: isPilesSelected ? 114680 : 0
    });

    // 2. Обвязка и черновой пол (всегда)
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
        { name: 'Строгание чернового пола', unit: 'м2', quantity: 0, price: 0, total: 0 },
      ],
      subtotal: 364100
    });

    // 3. Фундамент ленточный с буронабивными сваями
    const concrete = 0.6;
    const isStripSelected = foundation === 'lentochnyj';
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
        { name: 'Монтаж фундамента, буронабивные сваи', unit: 'м3', quantity: 12, price: 10000, total: isStripSelected ? 120000 : 0 },
        { name: 'Работы ямобуром, под буронабивные сваи', unit: 'шт', quantity: 30, price: 1000, total: isStripSelected ? 30000 : 0 },
        { name: 'Работы экскаватором', unit: 'ч', quantity: 3, price: 2000, total: isStripSelected ? 6000 : 0 },
        { name: 'Обвязочный борт(100х200х6000)мм', unit: 'м3', quantity: 0.6, price: 19500, total: isStripSelected ? 11700 : 0 },
        { name: 'Рубероид РПП', unit: 'м2', quantity: 30, price: 65, total: isStripSelected ? 1950 : 0 },
        { name: 'Антисептик зимний "Фенелакс"(-15С)', unit: 'л', quantity: 1, price: 150, total: isStripSelected ? 150 : 0 },
        { name: 'Скобы строительные(8х250)', unit: 'шт', quantity: 6, price: 60, total: isStripSelected ? 360 : 0 },
        { name: 'Монтаж обвязки', unit: 'м3', quantity: 0.6, price: 10000, total: isStripSelected ? 6000 : 0 },
      ],
      subtotal: isStripSelected ? 353270 : 0
    });

    // 4. Сруб из бревна
    const logVolume = perimeter * 0.15 * 2.5;
    const partitionVolume = pl > 0 ? pl * 0.15 * 2.5 : 0;
    sections.push({
      title: 'Сруб из бревна',
      items: [
        { name: 'Брус для сруба', unit: 'м3', quantity: parseFloat(logVolume.toFixed(2)), price: 19500, total: Math.round(logVolume * 19500) },
        { name: 'Брус для перегородки', unit: 'м3', quantity: parseFloat(partitionVolume.toFixed(2)), price: 19500, total: Math.round(partitionVolume * 19500) },
        { name: 'Джут(150мм)', unit: 'п.м', quantity: 400, price: 25, total: 10000 },
        { name: 'Скобы для степлера', unit: 'шт', quantity: 1000, price: 0.2, total: 200 },
        { name: 'Шкант березовый(24х1200)мм', unit: 'шт', quantity: 500, price: 9, total: 4500 },
        { name: 'Анкер для бруса(20х750)мм', unit: 'шт', quantity: 25, price: 120, total: 3000 },
        { name: 'Монтаж сруба', unit: 'м3', quantity: parseFloat(logVolume.toFixed(2)), price: 10000, total: Math.round(logVolume * 10000) },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    // 5. Кровля
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

    // 6. Полы
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

    // 7. Отделка
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

    // 8. Дополнительно
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

    setEstimate(sections);
    const total = sections.reduce((sum, section) => sum + section.subtotal, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateEstimate();
  }, [foundation, material, floors, length, width, partitionLength, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = {
      material,
      length,
      width,
      partitionsLength: partitionLength,
      floors,
      foundation,
      location,
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      messenger: formData.get('messenger')
    };

    try {
      const response = await fetch('https://functions.poehali.dev/cba76a16-6247-4333-9605-62ab8c813235', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Заявка успешно отправлена!');
        form.reset();
      } else {
        alert('Ошибка отправки заявки');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка отправки заявки');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBB040] to-[#F58220] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-8 text-center">
          Калькулятор стоимости бани
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/95">
            <CardHeader>
              <CardTitle>Параметры бани</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Тип фундамента *</Label>
                <RadioGroup value={foundation} onValueChange={setFoundation}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lentochnyj" id="lentochnyj" />
                    <Label htmlFor="lentochnyj" className="cursor-pointer">Ленточный фундамент</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stolbchatyj" id="stolbchatyj" />
                    <Label htmlFor="stolbchatyj" className="cursor-pointer">Винтовые сваи</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="net" id="net" />
                    <Label htmlFor="net" className="cursor-pointer">Фундамент уже есть</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Материал стен</Label>
                <RadioGroup value={material} onValueChange={setMaterial}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ocilindrovannoe-brevno" id="ocilindrovannoe-brevno" />
                    <Label htmlFor="ocilindrovannoe-brevno" className="cursor-pointer">Оцилиндрованное бревно</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="obychnyj-brus" id="obychnyj-brus" />
                    <Label htmlFor="obychnyj-brus" className="cursor-pointer">Обычный брус</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kleenyj-brus" id="kleenyj-brus" />
                    <Label htmlFor="kleenyj-brus" className="cursor-pointer">Клееный брус</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="length">Длина (м) *</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="6"
                  />
                </div>
                <div>
                  <Label htmlFor="width">Ширина (м) *</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="4"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="partitionLength">Длина перегородок (м)</Label>
                <Input
                  id="partitionLength"
                  type="number"
                  step="0.1"
                  value={partitionLength}
                  onChange={(e) => setPartitionLength(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Этажность</Label>
                <RadioGroup value={floors} onValueChange={setFloors}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="floor-1" />
                    <Label htmlFor="floor-1" className="cursor-pointer">1 этаж</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1.5" id="floor-1.5" />
                    <Label htmlFor="floor-1.5" className="cursor-pointer">1.5 этажа</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="floor-2" />
                    <Label htmlFor="floor-2" className="cursor-pointer">2 этажа</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Место строительства</Label>
                <RadioGroup value={location} onValueChange={setLocation}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perm" id="perm" />
                    <Label htmlFor="perm" className="cursor-pointer">Пермь</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perm-30km" id="perm-30km" />
                    <Label htmlFor="perm-30km" className="cursor-pointer">До 30 км от Перми</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perm-50km" id="perm-50km" />
                    <Label htmlFor="perm-50km" className="cursor-pointer">30-50 км от Перми</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perm-100km" id="perm-100km" />
                    <Label htmlFor="perm-100km" className="cursor-pointer">50-100 км от Перми</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {estimate.length > 0 && (
              <Card className="bg-white/95">
                <CardHeader>
                  <CardTitle>Примерная смета</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {estimate.map((section, idx) => (
                    <div key={idx} className={section.subtotal === 0 ? 'opacity-40' : ''}>
                      <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                      <div className="space-y-1 text-sm">
                        {section.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex justify-between">
                            <span>{item.name} ({item.quantity} {item.unit})</span>
                            <span className="font-medium">{item.total.toLocaleString()} ₽</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t flex justify-between font-semibold">
                        <span>Итого:</span>
                        <span>{section.subtotal.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 pt-4 border-t-2 border-[#FBB040]">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Общая стоимость:</span>
                      <span className="text-[#F58220]">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle>Оставить заявку</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input id="name" name="name" required placeholder="Иван" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="ivan@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="messenger">Предпочтительный способ связи *</Label>
                    <Input id="messenger" name="messenger" required placeholder="WhatsApp, Telegram, звонок" />
                  </div>
                  <Button type="submit" className="w-full bg-[#F58220] hover:bg-[#E57010]">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
