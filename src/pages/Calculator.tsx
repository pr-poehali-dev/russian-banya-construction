import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [wallMaterial, setWallMaterial] = useState<string>('');
  const [floors, setFloors] = useState<string>('1.5');
  const [distance, setDistance] = useState<string>('0-30');
  const [length, setLength] = useState<string>('6');
  const [width, setWidth] = useState<string>('6');
  const [partitionLength, setPartitionLength] = useState<string>('6');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [sendMethod, setSendMethod] = useState<string>('telegram');
  const [showValidation, setShowValidation] = useState<boolean>(false);
  const [estimate, setEstimate] = useState<EstimateSection[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const estimateRef = useRef<HTMLDivElement>(null);

  const handleSendEstimate = () => {
    setShowValidation(true);
    
    if (!name || !phone || (sendMethod === 'email' && !email)) {
      return;
    }
    
    console.log('Отправка сметы:', { name, phone, email, sendMethod });
  };

  const handleDownloadPDF = async () => {
    if (!estimateRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const canvas = await html2canvas(estimateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const fileName = `Смета_${name || 'Баня'}_${new Date().toLocaleDateString('ru-RU')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Ошибка генерации PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const calculateEstimate = () => {
    const l = length ? parseFloat(length) : 6;
    const w = width ? parseFloat(width) : 4;
    const pl = partitionLength ? parseFloat(partitionLength) : 0;
    const area = l * w;
    const perimeter = 2 * (l + w) + pl;
    const isOneFloor = floors === '1';
    const mansardWallHeight = isOneFloor ? 0 : 1;
    const roofHeight = w / 2.5;
    const mansardHeight = isOneFloor ? 0 : mansardWallHeight + roofHeight;

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
    const concrete = Math.ceil(perimeter * 0.4 * 100) / 100;
    const drainagePillow = Math.ceil(perimeter * 0.15);
    const reinforcement = Math.ceil(perimeter * 15 / 100) * 100;
    const bindingWire = Math.ceil(perimeter * 0.06);
    const formworkBoard = Math.ceil(perimeter * 0.126);
    const nails = Math.ceil(perimeter * 0.25);
    const screws = Math.ceil(perimeter * 20 / 10) * 10;
    const film = Math.ceil(perimeter * 1.6 / 10) * 10;
    const staples = Math.ceil(perimeter * 35 / 1000) * 1000;
    const fixators = Math.ceil(perimeter * 10 / 100) * 100;
    const isStripSelected = foundation === 'ленточный';
    sections.push({
      title: 'Фундамент ленточный, с буронабивными сваями',
      items: [
        { name: 'Бетон B20 M250(на щебне)', unit: 'м3', quantity: concrete, price: 8100, total: isStripSelected ? Math.ceil(concrete * 8100) : 0 },
        { name: 'Дренажная подушка(ПГС)', unit: 'т', quantity: drainagePillow, price: 1000, total: isStripSelected ? drainagePillow * 1000 : 0 },
        { name: 'Арматура металлическая(12мм)', unit: 'п.м', quantity: reinforcement, price: 100, total: isStripSelected ? reinforcement * 100 : 0 },
        { name: 'Проволока вязальная(0,4мм)', unit: 'кг', quantity: bindingWire, price: 500, total: isStripSelected ? bindingWire * 500 : 0 },
        { name: 'Доска для опалубки 1-й сорт(50х200х6000)мм', unit: 'м3', quantity: formworkBoard, price: 19500, total: isStripSelected ? formworkBoard * 19500 : 0 },
        { name: 'Гвозди(4х100)мм', unit: 'кг', quantity: nails, price: 200, total: isStripSelected ? nails * 200 : 0 },
        { name: 'Саморезы черные(4,2х90)мм', unit: 'шт', quantity: screws, price: 3, total: isStripSelected ? screws * 3 : 0 },
        { name: 'Пленка полиэтиленовая(200мк)', unit: 'м2', quantity: film, price: 70, total: isStripSelected ? film * 70 : 0 },
        { name: 'Скобы для степпера(№10)', unit: 'шт', quantity: staples, price: 0.2, total: isStripSelected ? staples * 0.2 : 0 },
        { name: 'Фиксаторы арматуры(35мм)', unit: 'шт', quantity: fixators, price: 10, total: isStripSelected ? fixators * 10 : 0 },
        { name: 'Монтаж фундамента(с буронабивными сваями)', unit: 'м3', quantity: concrete, price: 10000, total: isStripSelected ? Math.ceil(concrete * 10000) : 0 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = isStripSelected ? sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0) : 0;

    const bindingBrusVolume = Math.ceil(perimeter / 6) * 0.12;
    const roofingFelt = Math.ceil(perimeter / 10) * 10;
    const antiseptic = Math.ceil(perimeter * 0.166 / 10) * 10;
    const clamps = Math.ceil(perimeter * 0.2);
    sections.push({
      title: 'Обвязка фундамента',
      items: [
        { name: 'Обвязочный брус(100х200х6000)мм', unit: 'м3', quantity: bindingBrusVolume, price: 19500, total: Math.ceil(bindingBrusVolume * 19500) },
        { name: 'Рубероид РПП 300', unit: 'м2', quantity: roofingFelt, price: 65, total: roofingFelt * 65 },
        { name: 'Антисептик', unit: 'л', quantity: antiseptic, price: 130, total: antiseptic * 130 },
        { name: 'Скобы строительные(8х250)', unit: 'шт', quantity: clamps, price: 60, total: clamps * 60 },
        { name: 'Монтаж обвязки', unit: 'м3', quantity: bindingBrusVolume, price: 10000, total: Math.ceil(bindingBrusVolume * 10000) },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    const isBrusSelected = wallMaterial === 'брус' || wallMaterial === 'клееный';
    const isBrevnoSelected = wallMaterial === 'бревно';
    const brusPrice = wallMaterial === 'клееный' ? 70000 : wallMaterial === 'брус' ? 19500 : 0;
    const totalWallHeight = (2.2 + 0.6) + mansardWallHeight; // Высота стен всего сруба (1 этаж + мансарда)
    const brusVolume = perimeter * totalWallHeight * 0.15;
    const jute = Math.ceil((brusVolume / 0.135 * 6.5) / 100) * 100; // Округление вверх до сотен
    const shkanty = Math.ceil((jute / 8) / 10) * 10; // Округление вверх до десяток
    const skobki = Math.ceil((jute * 5) / 1000) * 1000; // Округление вверх до тысяч
    const skobyStroit = Math.ceil(brusVolume * 5); // Округление вверх до целого
    
    sections.push({
      title: 'Сруб из бруса',
      items: [
        { name: 'Брус для сруба', unit: 'м3', quantity: parseFloat(brusVolume.toFixed(2)), price: brusPrice, total: isBrusSelected ? Math.ceil(brusVolume * brusPrice) : 0 },
        { name: 'Джут(150мм)', unit: 'п.м', quantity: jute, price: 25, total: isBrusSelected ? jute * 25 : 0 },
        { name: 'Шкант березовый(24х1200)мм', unit: 'шт', quantity: shkanty, price: 40, total: isBrusSelected ? shkanty * 40 : 0 },
        { name: 'Скобки для степпера(№10)', unit: 'шт', quantity: skobki, price: 0.2, total: isBrusSelected ? skobki * 0.2 : 0 },
        { name: 'Скобы строительные(8х250)', unit: 'шт', quantity: skobyStroit, price: 60, total: isBrusSelected ? skobyStroit * 60 : 0 },
        { name: 'Монтаж бруса', unit: 'м3', quantity: parseFloat(brusVolume.toFixed(2)), price: 10000, total: isBrusSelected ? Math.ceil(brusVolume * 10000) : 0 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = isBrusSelected ? sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0) : 0;

    const brevnoVolume = totalWallHeight / 0.17 * perimeter / 6 * 0.1885;
    const juteBrevno = Math.ceil((totalWallHeight / 0.17 * perimeter * 1.2) / 100) * 100;
    const shkantyBrevno = Math.ceil((juteBrevno / 8) / 10) * 10;
    const skobbkiBrevno = Math.ceil((juteBrevno * 5) / 1000) * 1000;

    sections.push({
      title: 'Сруб из бревна',
      items: [
        { name: 'Бревно сруба', unit: 'м3', quantity: parseFloat(brevnoVolume.toFixed(2)), price: 22000, total: isBrevnoSelected ? Math.ceil(brevnoVolume * 22000) : 0 },
        { name: 'Джут(150мм)', unit: 'п.м', quantity: juteBrevno, price: 25, total: isBrevnoSelected ? juteBrevno * 25 : 0 },
        { name: 'Шкант березовый(24х1200)мм', unit: 'шт', quantity: shkantyBrevno, price: 40, total: isBrevnoSelected ? shkantyBrevno * 40 : 0 },
        { name: 'Скобки для степпера(№10)', unit: 'шт', quantity: skobbkiBrevno, price: 0.2, total: isBrevnoSelected ? skobbkiBrevno * 0.2 : 0 },
        { name: 'Монтаж сруба', unit: 'м3', quantity: parseFloat(brevnoVolume.toFixed(2)), price: 10000, total: isBrevnoSelected ? Math.ceil(brevnoVolume * 10000) : 0 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = isBrevnoSelected ? sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0) : 0;

    const brusLagi = Math.ceil(area * 0.25) * 0.18;
    const montageLagi = Math.ceil(area * 0.25) * 2;

    sections.push({
      title: 'Лаги пола, балки перекрытия',
      items: [
        { name: 'Брус для лаг, балок(100х150)мм', unit: 'м3', quantity: parseFloat(brusLagi.toFixed(2)), price: 19500, total: Math.ceil(brusLagi * 19500) },
        { name: 'Монтаж лаг', unit: 'шт', quantity: montageLagi, price: 1000, total: montageLagi * 1000 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    const ridgeLength = l + 1;
    const stropilPairs = Math.round(ridgeLength / 0.64 + 4);
    const doskaSropil = Math.ceil(stropilPairs * 0.1125 * 10) / 10;
    const rafterLength = Math.sqrt(roofHeight * roofHeight + (w / 2) * (w / 2)) + 1;
    const roofAreaRaw = ridgeLength * rafterLength * 2.2;
    const roofArea = Math.ceil(roofAreaRaw / 10) * 10;
    const doskaObreshetka = parseFloat((roofArea * 0.02).toFixed(2));
    const brusokVent = Math.ceil((rafterLength * stropilPairs * 2) / 10) * 10;
    const plenka = Math.ceil((roofArea * 1.2) / 10) * 10;
    const shpilka = Math.ceil(stropilPairs / 2);
    const gayka = Math.ceil(stropilPairs * 6);
    const ugolok = stropilPairs * 2;
    const shurup = ugolok * 2;
    const skobkiRoof = Math.ceil((roofArea * 30) / 1000) * 1000;
    const gvozdi = Math.ceil(roofArea * 0.2);
    const vetrovaya = Math.ceil(rafterLength * 4);
    const karniznaya = Math.ceil(ridgeLength * 2);
    const samorez35 = Math.ceil((roofArea * 10) / 10) * 10;
    const samorez50 = Math.ceil((roofArea * 3) / 10) * 10;

    sections.push({
      title: 'Крыша',
      items: [
        { name: 'Доска для стропил и ригелей 1-й сорт(50х150х6000)мм', unit: 'м3', quantity: doskaSropil, price: 19500, total: Math.ceil(doskaSropil * 19500) },
        { name: 'Доска для обрешетки 1-й сорт(40х100х6000)мм', unit: 'м3', quantity: doskaObreshetka, price: 19500, total: Math.ceil(doskaObreshetka * 19500) },
        { name: 'Брусок для вент.загора(50х50х6000)мм', unit: 'п.м', quantity: brusokVent, price: 65, total: brusokVent * 65 },
        { name: 'Пленка гидроизоляционная', unit: 'м2', quantity: plenka, price: 150, total: plenka * 150 },
        { name: 'Шпилька резьбовая оцинкованная(10х1000)мм', unit: 'м', quantity: shpilka, price: 100, total: shpilka * 100 },
        { name: 'Гайка оцинкованная(М10)', unit: 'шт', quantity: gayka, price: 6, total: gayka * 6 },
        { name: 'Шайба увеличенная оцинкованная(М10)', unit: 'шт', quantity: gayka, price: 6, total: gayka * 6 },
        { name: 'Уголок крепежный оцинкованный(70х70)', unit: 'шт', quantity: ugolok, price: 30, total: ugolok * 30 },
        { name: 'Шуруп "глухарь"(8х40)мм', unit: 'шт', quantity: shurup, price: 4, total: shurup * 4 },
        { name: 'Скобки для степпера(№10)', unit: 'шт', quantity: skobkiRoof, price: 0.2, total: skobkiRoof * 0.2 },
        { name: 'Гвозди(4х120)мм', unit: 'кг', quantity: gvozdi, price: 200, total: gvozdi * 200 },
        { name: 'Металлочерепица', unit: 'м2', quantity: roofArea, price: 750, total: roofArea * 750 },
        { name: 'Конек плоский(200х200)мм', unit: 'п.м', quantity: ridgeLength, price: 240, total: ridgeLength * 240 },
        { name: 'Ветровая планка', unit: 'п.м', quantity: vetrovaya, price: 240, total: vetrovaya * 240 },
        { name: 'Карнизная планка', unit: 'п.м', quantity: karniznaya, price: 240, total: karniznaya * 240 },
        { name: 'Кровельные саморезы(4,8*35)', unit: 'шт', quantity: samorez35, price: 5, total: samorez35 * 5 },
        { name: 'Кровельные саморезы(4,8*50)', unit: 'шт', quantity: samorez50, price: 6, total: samorez50 * 6 },
        { name: 'Монтаж крыши', unit: 'м2', quantity: roofArea, price: 3000, total: roofArea * 3000 },
      ],
      subtotal: 0
    });
    sections[sections.length - 1].subtotal = sections[sections.length - 1].items.reduce((sum, item) => sum + item.total, 0);

    const sumAllSections = sections.reduce((sum, section) => sum + section.subtotal, 0);
    const prochieRashody = Math.ceil((sumAllSections / 30) / 10) * 10;

    sections.push({
      title: 'Прочие расходы',
      items: [
        { name: 'Доставка материалов, транспортные расходы, леса и тд', unit: 'шт', quantity: 1, price: prochieRashody, total: prochieRashody },
      ],
      subtotal: prochieRashody
    });

    const total = sections.reduce((sum, section) => sum + section.subtotal, 0);

    setEstimate(sections);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateEstimate();
  }, [foundation, wallMaterial, floors, distance, length, width, partitionLength]);

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
                <div className="space-y-3">
                  <Label className="text-sm">Этажность:</Label>
                  <RadioGroup value={floors} onValueChange={setFloors}>
                    <div className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="1" id="floor1" />
                      <Label htmlFor="floor1" className="cursor-pointer flex-1 text-sm">
                        1 этаж
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="1.5" id="floor1.5" />
                      <Label htmlFor="floor1.5" className="cursor-pointer flex-1 text-sm">
                        1,5 этажа (мансарда)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
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

              <div className="space-y-3">
                <Label className="text-base font-semibold">Материал стен бани:</Label>
                <RadioGroup value={wallMaterial} onValueChange={setWallMaterial}>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="бревно" id="brevno" />
                    <Label htmlFor="brevno" className="cursor-pointer flex-1">
                      Оцилиндрованное бревно
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="брус" id="brus" />
                    <Label htmlFor="brus" className="cursor-pointer flex-1">
                      Брус естественной влажности
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="клееный" id="kleeniy" />
                    <Label htmlFor="kleeniy" className="cursor-pointer flex-1">
                      Клееный брус
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Расстояние от Перми до объекта в одну сторону, км:</Label>
                <RadioGroup value={distance} onValueChange={setDistance}>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="0-30" id="dist0-30" />
                    <Label htmlFor="dist0-30" className="cursor-pointer flex-1">
                      0-30 км
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="30-60" id="dist30-60" />
                    <Label htmlFor="dist30-60" className="cursor-pointer flex-1">
                      30-60 км
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="60-90" id="dist60-90" />
                    <Label htmlFor="dist60-90" className="cursor-pointer flex-1">
                      60-90 км
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="90+" id="dist90+" />
                    <Label htmlFor="dist90+" className="cursor-pointer flex-1">
                      более 90 км
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <Label className="text-base font-semibold">Контактные данные</Label>
                
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">
                    Имя <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={showValidation && !name ? 'border-red-500 border-2' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">
                    Телефон <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={showValidation && !phone ? 'border-red-500 border-2' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    Email {sendMethod === 'email' && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={sendMethod === 'email'}
                    className={showValidation && sendMethod === 'email' && !email ? 'border-red-500 border-2' : ''}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm">Куда отправить смету:</Label>
                  <RadioGroup value={sendMethod} onValueChange={setSendMethod}>
                    <div className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="email" id="sendEmail" />
                      <Label htmlFor="sendEmail" className="cursor-pointer flex-1 text-sm">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="telegram" id="sendTelegram" />
                      <Label htmlFor="sendTelegram" className="cursor-pointer flex-1 text-sm">
                        Телеграм
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="max" id="sendMax" />
                      <Label htmlFor="sendMax" className="cursor-pointer flex-1 text-sm">
                        Макс
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  onClick={handleSendEstimate}
                >
                  Отправить смету
                </Button>
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
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Детальная смета</CardTitle>
                  <Button 
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF || estimate.length === 0}
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    {isGeneratingPDF ? 'Генерация...' : 'Скачать PDF'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div ref={estimateRef}>
                <div className="bg-white border-2 border-black mb-6">
                  <div className="border-b-2 border-black p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h2 className="font-bold text-base">Предварительная примерная смета компании "Пермский Пар"</h2>
                      </div>
                      <div className="text-right text-xs">
                        <div>тел. +7 (342) 298-40-30</div>
                        <div>тел. +7(982) 490 09 00</div>
                        <div>perm-par@mail.ru</div>
                        <div>www.пермский-пар.рф</div>
                      </div>
                    </div>
                  </div>

                  <table className="w-full text-[10px] border-collapse">
                    <tbody>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5 font-bold" colSpan={2}>Заказчик</td>
                        <td className="border-r border-black p-1.5" colSpan={3}>{name || '—'}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5 font-bold" colSpan={2}>Телефон</td>
                        <td className="border-r border-black p-1.5" colSpan={3}>{phone || '—'}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5 font-bold" colSpan={2}>Email</td>
                        <td className="p-1.5" colSpan={3}>{email || '—'}</td>
                      </tr>
                      <tr className="border-b border-black bg-gray-50">
                        <td className="border-r border-black p-1.5 font-bold text-center" colSpan={5}>Данные объекта</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5 font-bold" colSpan={2}>Параметры</td>
                        <td className="border-r border-black p-1.5 font-bold text-center">Значения</td>
                        <td className="border-r border-black p-1.5 font-bold text-center" colSpan={2}>Дополнительные значения</td>
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
                        <td className="border-r border-black p-1.5 text-center">
                          {wallMaterial === 'бревно' ? 'Оцилиндрованное бревно' : wallMaterial === 'брус' ? 'Брус естественной влажности' : wallMaterial === 'клееный' ? 'Клееный брус' : '—'}
                        </td>
                        <td className="border-r border-black p-1.5 text-center">Высота сруба 1 этажа, м</td>
                        <td className="p-1.5 text-right">{(2.2 + 0.6).toFixed(1)}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Этажность</td>
                        <td className="border-r border-black p-1.5 text-center">{floors === '1' ? '1 этаж' : '1,5 этажа'}</td>
                        <td className="border-r border-black p-1.5 text-center">Высота мансарды, м</td>
                        <td className="p-1.5 text-right">
                          {floors === '1' ? '0' : (width ? (1 + parseFloat(width) / 2.5).toFixed(1) : '—')}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Длина строения, м</td>
                        <td className="border-r border-black p-1.5 text-center">{length || '—'}</td>
                        <td className="border-r border-black p-1.5 text-center">Высота стен мансарды, м</td>
                        <td className="p-1.5 text-right">{floors === '1' ? '0' : '1'}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Ширина строения, м</td>
                        <td className="border-r border-black p-1.5 text-center">{width || '—'}</td>
                        <td className="border-r border-black p-1.5 text-center">Высота стен всего сруба, м</td>
                        <td className="p-1.5 text-right">{((2.2 + 0.6) + (floors === '1' ? 0 : 1)).toFixed(1)}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Длина перегородок 1 этажа, м</td>
                        <td className="border-r border-black p-1.5 text-center">{partitionLength || '0'}</td>
                        <td className="border-r border-black p-1.5 text-center">Площадь, м2</td>
                        <td className="p-1.5 text-right">{length && width ? (parseFloat(length) * parseFloat(width)).toFixed(0) : '—'}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1.5" colSpan={2}>Расстояние до объекта в 1 сторону, км</td>
                        <td className="border-r border-black p-1.5 text-center">
                          {distance === '0-30' ? '0-30' : distance === '30-60' ? '30-60' : distance === '60-90' ? '60-90' : 'более 90'}
                        </td>
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
                    </tbody>
                  </table>
                </div>

                {estimate.length > 0 && (
                <div className="space-y-6">
                  {estimate.filter(section => section.subtotal > 0).map((section, idx) => (
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
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;