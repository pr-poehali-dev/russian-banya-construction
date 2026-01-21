import { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
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

const EstimateAdmin = () => {
  const [step, setStep] = useState<number>(1);
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
  const [estimate, setEstimate] = useState<EstimateSection[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const estimateRef = useRef<HTMLDivElement>(null);

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
    const totalWallHeight = (2.2 + 0.6) + mansardWallHeight;
    const brusVolume = perimeter * totalWallHeight * 0.15;
    const jute = Math.ceil((brusVolume / 0.135 * 6.5) / 100) * 100;
    const shkanty = Math.ceil((jute / 8) / 10) * 10;
    const skobki = Math.ceil((jute * 5) / 1000) * 1000;
    const skobyStroit = Math.ceil(brusVolume * 5);
    
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
    if (foundation && wallMaterial && length && width) {
      calculateEstimate();
    }
  }, [foundation, wallMaterial, floors, distance, length, width, partitionLength]);

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
        unit: 'px',
        format: 'a4',
        hotfixes: ['px_scaling']
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = pdfWidth / imgWidth;
      const scaledHeight = imgHeight * ratio;
      
      let heightLeft = scaledHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, scaledHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - scaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }
      
      const fileName = `Смета_${name || 'Баня'}_${new Date().toLocaleDateString('ru-RU')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Ошибка генерации PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const goToNextStep = () => {
    if (step === 1 && !foundation) {
      alert('Пожалуйста, выберите тип фундамента');
      return;
    }
    if (step === 2 && !wallMaterial) {
      alert('Пожалуйста, выберите материал стен');
      return;
    }
    if (step === 3 && (!length || !width)) {
      alert('Пожалуйста, укажите размеры');
      return;
    }
    setStep(step + 1);
  };

  const goToPrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          
          {/* Левая часть - фото */}
          <div className="hidden lg:block sticky top-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/bucket/fdb28716-700f-4ea1-9d17-a7a065d640a7.jpg"
                alt="Строительство бани"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Правая часть - форма */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-emerald-900 mb-2">
                Рассчитайте стоимость вашей бани
              </h1>
              <p className="text-emerald-700">
                Шаг {step} из 4
              </p>
            </div>

            {/* Прогресс бар */}
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            {/* Шаг 1: Фундамент */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold text-emerald-900 mb-6">Выберите тип фундамента</h2>
                  
                  <RadioGroup value={foundation} onValueChange={setFoundation} className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                      <RadioGroupItem value="сваи" id="foundation-piles" />
                      <Label htmlFor="foundation-piles" className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg text-emerald-900">Винтовые сваи</div>
                        <div className="text-sm text-emerald-600">Надежный и экономичный вариант</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                      <RadioGroupItem value="ленточный" id="foundation-strip" />
                      <Label htmlFor="foundation-strip" className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg text-emerald-900">Ленточный фундамент</div>
                        <div className="text-sm text-emerald-600">Классическое решение повышенной прочности</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                      <RadioGroupItem value="есть" id="foundation-existing" />
                      <Label htmlFor="foundation-existing" className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg text-emerald-900">Фундамент уже есть</div>
                        <div className="text-sm text-emerald-600">Строим на готовом основании</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={goToNextStep}
                    disabled={!foundation}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                  >
                    Далее
                    <Icon name="ChevronRight" className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Шаг 2: Материал стен */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold text-emerald-900 mb-6">Материал стен</h2>
                  
                  <RadioGroup value={wallMaterial} onValueChange={setWallMaterial} className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                      <RadioGroupItem value="брус" id="material-profiled" />
                      <Label htmlFor="material-profiled" className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg text-emerald-900">Профилированный брус</div>
                        <div className="text-sm text-emerald-600">Натуральная древесина, легкость сборки</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                      <RadioGroupItem value="клееный" id="material-glued" />
                      <Label htmlFor="material-glued" className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg text-emerald-900">Клееный брус</div>
                        <div className="text-sm text-emerald-600">Премиум класс, не дает усадку</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                      <RadioGroupItem value="бревно" id="material-log" />
                      <Label htmlFor="material-log" className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg text-emerald-900">Оцилиндрованное бревно</div>
                        <div className="text-sm text-emerald-600">Традиционная русская баня</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button 
                    onClick={goToPrevStep}
                    variant="outline"
                    className="border-emerald-300 text-emerald-900 hover:bg-emerald-50 px-8 py-6 text-lg rounded-xl"
                  >
                    <Icon name="ChevronLeft" className="mr-2" />
                    Назад
                  </Button>
                  <Button 
                    onClick={goToNextStep}
                    disabled={!wallMaterial}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                  >
                    Далее
                    <Icon name="ChevronRight" className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Шаг 3: Размеры */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl space-y-6">
                  <h2 className="text-2xl font-bold text-emerald-900 mb-6">Размеры и параметры</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="length" className="text-emerald-900 font-semibold mb-2 block">Длина (м)</Label>
                      <Input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="width" className="text-emerald-900 font-semibold mb-2 block">Ширина (м)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="partitionLength" className="text-emerald-900 font-semibold mb-2 block">Длина перегородок (м)</Label>
                    <Input
                      id="partitionLength"
                      type="number"
                      value={partitionLength}
                      onChange={(e) => setPartitionLength(e.target.value)}
                      className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <Label className="text-emerald-900 font-semibold mb-3 block">Этажность</Label>
                    <RadioGroup value={floors} onValueChange={setFloors} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="1" id="floors-1" />
                        <Label htmlFor="floors-1" className="cursor-pointer">Одноэтажная</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="1.5" id="floors-1.5" />
                        <Label htmlFor="floors-1.5" className="cursor-pointer">С мансардой</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-emerald-900 font-semibold mb-3 block">Расстояние от города (км)</Label>
                    <RadioGroup value={distance} onValueChange={setDistance} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="0-30" id="distance-30" />
                        <Label htmlFor="distance-30" className="cursor-pointer">0-30 км</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="30-60" id="distance-60" />
                        <Label htmlFor="distance-60" className="cursor-pointer">30-60 км</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="60-90" id="distance-90" />
                        <Label htmlFor="distance-90" className="cursor-pointer">60-90 км</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="90+" id="distance-90plus" />
                        <Label htmlFor="distance-90plus" className="cursor-pointer">более 90 км</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    onClick={goToPrevStep}
                    variant="outline"
                    className="border-emerald-300 text-emerald-900 hover:bg-emerald-50 px-8 py-6 text-lg rounded-xl"
                  >
                    <Icon name="ChevronLeft" className="mr-2" />
                    Назад
                  </Button>
                  <Button 
                    onClick={goToNextStep}
                    disabled={!length || !width}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                  >
                    Далее
                    <Icon name="ChevronRight" className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Шаг 4: Контакты и смета */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold text-emerald-900 mb-2">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-emerald-600">Предварительная стоимость</div>
                  </div>

                  <h2 className="text-2xl font-bold text-emerald-900 mb-6">Скачать детальную смету (PDF)</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-emerald-900 font-semibold mb-2 block">
                        Имя
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите ваше имя"
                        className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-emerald-900 font-semibold mb-2 block">
                        Телефон
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-emerald-900 font-semibold mb-2 block">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.ru"
                        className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>

                    <Button 
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPDF}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg rounded-xl shadow-lg"
                    >
                      {isGeneratingPDF ? 'Генерация PDF...' : 'Скачать смету (PDF)'}
                      <Icon name="Download" className="ml-2" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={goToPrevStep}
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-900 hover:bg-emerald-50 py-6 text-lg rounded-xl"
                >
                  <Icon name="ChevronLeft" className="mr-2" />
                  Назад
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Скрытая смета для PDF */}
      <div className="hidden">
        <div ref={estimateRef} className="bg-white p-8">
          <div className="bg-white border-2 border-black">
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
                  <td className="border-r border-black p-1.5">Периметр фундамента, м</td>
                  <td className="p-1.5 text-right">
                    {length && width ? (
                      (parseFloat(length) + parseFloat(width)) * 2 + (partitionLength ? parseFloat(partitionLength) : 0)
                    ).toFixed(2) : '—'}
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-1.5" colSpan={2}>Что хотите построить</td>
                  <td className="border-r border-black p-1.5 text-center">Баня под крышу</td>
                  <td className="border-r border-black p-1.5">Высота 1 этажа в чистоте, м</td>
                  <td className="p-1.5 text-right">2,2</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-1.5" colSpan={2}>Из чего хотите построить</td>
                  <td className="border-r border-black p-1.5 text-center">
                    {wallMaterial === 'бревно' ? 'Оцилиндрованное бревно' : wallMaterial === 'брус' ? 'Брус естественной влажности' : wallMaterial === 'клееный' ? 'Клееный брус' : '—'}
                  </td>
                  <td className="border-r border-black p-1.5">Высота сруба 1 этажа, м</td>
                  <td className="p-1.5 text-right">{(2.2 + 0.6).toFixed(1)}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-1.5" colSpan={2}>Этажность</td>
                  <td className="border-r border-black p-1.5 text-center">{floors === '1' ? '1 этаж' : '1,5 этажа'}</td>
                  <td className="border-r border-black p-1.5">Высота мансарды, м</td>
                  <td className="p-1.5 text-right">
                    {floors === '1' ? '0' : (width ? (1 + parseFloat(width) / 2.5).toFixed(1) : '—')}
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-1.5" colSpan={2}>Длина строения, м</td>
                  <td className="border-r border-black p-1.5 text-center">{length || '—'}</td>
                  <td className="border-r border-black p-1.5">Высота стен мансарды, м</td>
                  <td className="p-1.5 text-right">{floors === '1' ? '0' : '1'}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-1.5" colSpan={2}>Ширина строения, м</td>
                  <td className="border-r border-black p-1.5 text-center">{width || '—'}</td>
                  <td className="border-r border-black p-1.5">Высота стен всего сруба, м</td>
                  <td className="p-1.5 text-right">{((2.2 + 0.6) + (floors === '1' ? 0 : 1)).toFixed(1)}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-1.5" colSpan={2}>Длина перегородок 1 этажа, м</td>
                  <td className="border-r border-black p-1.5 text-center">{partitionLength || '0'}</td>
                  <td className="border-r border-black p-1.5">Площадь, м2</td>
                  <td className="p-1.5 text-right">{length && width ? (parseFloat(length) * parseFloat(width)).toFixed(0) : '—'}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-1.5" colSpan={2}>Расстояние до объекта в 1 сторону, км</td>
                  <td className="border-r border-black p-1.5 text-center">
                    {distance === '0-30' ? '0-30' : distance === '30-60' ? '30-60' : distance === '60-90' ? '60-90' : 'более 90'}
                  </td>
                  <td className="border-r border-black p-1.5">Высота крыши, м</td>
                  <td className="p-1.5 text-right">
                    {width ? (parseFloat(width) / 2.5).toFixed(1) : '—'}
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-1.5" colSpan={2}></td>
                  <td className="border-r border-black p-1.5"></td>
                  <td className="border-r border-black p-1.5">Длина конька, м</td>
                  <td className="p-1.5 text-right">
                    {length ? (parseFloat(length) + 1).toFixed(0) : '—'}
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-1.5" colSpan={2}></td>
                  <td className="border-r border-black p-1.5"></td>
                  <td className="border-r border-black p-1.5">Длина стропила, м</td>
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
                  <td className="border-r border-black p-1.5">Площадь кровли, м</td>
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
                  <td className="border-r border-black p-1.5">Количество стропильных пар, шт</td>
                  <td className="p-1.5 text-right">
                    {length ? (() => {
                      const ridgeLength = parseFloat(length) + 1;
                      return Math.round(ridgeLength / 0.64 + 4);
                    })() : '—'}
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="border-y-2 border-black p-1.5 bg-gray-50">
              <h3 className="font-bold text-sm text-center">Расчеты</h3>
            </div>

            {estimate.length > 0 && (
              <div className="w-full">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-black bg-gray-50">
                      <th className="border-r border-black text-left py-1 px-1.5 font-bold">Наименование</th>
                      <th className="border-r border-black text-center py-1 px-1.5 font-bold" style={{width: '50px'}}>Ед.из</th>
                      <th className="border-r border-black text-center py-1 px-1.5 font-bold" style={{width: '60px'}}>Кол-во</th>
                      <th className="border-r border-black text-right py-1 px-1.5 font-bold" style={{width: '80px'}}>Цена, ₽</th>
                      <th className="text-right py-1 px-1.5 font-bold" style={{width: '90px'}}>Стоимость, ₽</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimate.filter(section => section.subtotal > 0).map((section, idx) => (
                      <>
                        <tr key={`header-${idx}`} className="border-b border-black">
                          <td colSpan={5} className="bg-white py-1 px-1.5">
                            <h3 className="font-bold text-xs">{section.title}</h3>
                          </td>
                        </tr>
                        {section.items.map((item, itemIdx) => (
                          <tr key={`${idx}-${itemIdx}`} className={`border-b border-black ${item.total === 0 ? 'opacity-40' : ''}`}>
                            <td className="border-r border-black py-0.5 px-1.5">{item.name}</td>
                            <td className="border-r border-black text-center py-0.5 px-1.5" style={{width: '50px'}}>{item.unit}</td>
                            <td className="border-r border-black text-center py-0.5 px-1.5" style={{width: '60px'}}>{item.quantity > 0 ? item.quantity.toFixed(2) : '—'}</td>
                            <td className="border-r border-black text-right py-0.5 px-1.5" style={{width: '80px'}}>{item.price.toLocaleString('ru-RU')}</td>
                            <td className="text-right py-0.5 px-1.5 font-semibold" style={{width: '90px'}}>{item.total.toLocaleString('ru-RU')}</td>
                          </tr>
                        ))}
                        <tr key={`subtotal-${idx}`} className="bg-gray-50 border-b-2 border-black">
                          <td colSpan={4} className="border-r border-black py-1 px-1.5 text-right font-bold">Поэтапно:</td>
                          <td className="py-1 px-1.5 text-right font-bold" style={{width: '90px'}}>{section.subtotal.toLocaleString('ru-RU')} ₽</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                
                <div className="bg-gray-50 p-3 border-t-2 border-black">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold">ИТОГО:</span>
                    <span className="text-lg font-bold">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateAdmin;
