import { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { calculateEstimate, EstimateItem, EstimateSection } from '@/utils/estimateCalculator';

const Calculator = () => {
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
  const [telegram, setTelegram] = useState<string>('');
  const [sendMethod, setSendMethod] = useState<string>('telegram');
  const [showValidation, setShowValidation] = useState<boolean>(false);
  const [estimate, setEstimate] = useState<EstimateSection[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const estimateRef = useRef<HTMLDivElement>(null);

  const handleSendEstimate = async () => {
    setShowValidation(true);
    
    if (!name || !phone || (sendMethod === 'email' && !email)) {
      return;
    }
    
    setIsSending(true);
    
    try {
      if (!estimateRef.current) {
        alert('Ошибка: смета не найдена');
        return;
      }
      
      const canvas = await html2canvas(estimateRef.current, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.85);
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
      
      const pdfBase64 = pdf.output('datauristring').split(',')[1];
      
      const response = await fetch('https://functions.poehali.dev/cba76a16-6247-4333-9605-62ab8c813235', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          telegram,
          messenger: sendMethod,
          material: wallMaterial,
          length,
          width,
          partitionsLength: partitionLength,
          floors,
          foundation,
          location: distance,
          pdfData: pdfBase64
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        let message = 'Заявка успешно отправлена!\n\n';
        
        if (result.email_sent && sendMethod === 'email') {
          message += '✅ Смета отправлена на вашу почту\n';
        }
        
        if (telegram && sendMethod === 'telegram') {
          if (email) {
            message += '\n📧 На вашу почту отправлена инструкция по получению сметы в Telegram\n';
          }
          message += '\n🤖 Чтобы получить смету в Telegram:\n';
          message += '1. Откройте бот @permpar_smeta_bot\n';
          message += '2. Нажмите СТАРТ\n';
          message += '3. PDF придёт автоматически!';
        } else if (!result.email_sent) {
          message += '\nМы свяжемся с вами в ближайшее время.';
        }
        
        alert(message);
        
        if (telegram && sendMethod === 'telegram') {
          if (confirm('Открыть Telegram бота сейчас?')) {
            window.open('https://t.me/permpar_smeta_bot?start=order', '_blank');
          }
        }
        
        setName('');
        setPhone('');
        setEmail('');
        setTelegram('');
        setShowValidation(false);
      } else {
        alert('Ошибка отправки: ' + (result.error || 'Неизвестная ошибка'));
      }
      
    } catch (error) {
      console.error('Ошибка отправки сметы:', error);
      alert('Ошибка отправки сметы. Попробуйте еще раз.');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (foundation && wallMaterial && length && width) {
      const result = calculateEstimate({
        length: parseFloat(length),
        width: parseFloat(width),
        partitionLength: parseFloat(partitionLength || '0'),
        floors: floors as '1' | '1.5',
        foundation: foundation as 'сваи' | 'ленточный',
        wallMaterial: wallMaterial as 'профилированный брус' | 'оцилиндрованное бревно' | 'каркас',
        distance: distance as '0-30' | '30-60' | '60-90'
      });
      setEstimate(result.sections);
      setTotalPrice(result.total);
    }
  }, [foundation, wallMaterial, floors, distance, length, width, partitionLength]);

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
                      <RadioGroupItem value="профилированный брус" id="material-profiled" />
                      <Label htmlFor="material-profiled" className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg text-emerald-900">Профилированный брус</div>
                        <div className="text-sm text-emerald-600">Натуральная древесина, легкость сборки</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                      <RadioGroupItem value="оцилиндрованное бревно" id="material-log" />
                      <Label htmlFor="material-log" className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg text-emerald-900">Оцилиндрованное бревно</div>
                        <div className="text-sm text-emerald-600">Традиционный русский стиль</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                      <RadioGroupItem value="каркас" id="material-frame" />
                      <Label htmlFor="material-frame" className="flex-1 cursor-pointer">
                        <div className="font-semibold text-lg text-emerald-900">Каркасная технология</div>
                        <div className="text-sm text-emerald-600">Быстрое строительство, энергоэффективность</div>
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

            {/* Шаг 4: Контакты и результат */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold text-emerald-900 mb-2">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-emerald-600">Предварительная стоимость</div>
                  </div>

                  <h2 className="text-2xl font-bold text-emerald-900 mb-6">Получить детальную смету</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-emerald-900 font-semibold mb-2 block">
                        Имя *
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите ваше имя"
                        className={`border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                          showValidation && !name ? 'border-red-500' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-emerald-900 font-semibold mb-2 block">
                        Телефон *
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className={`border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                          showValidation && !phone ? 'border-red-500' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <Label className="text-emerald-900 font-semibold mb-3 block">Способ получения сметы</Label>
                      <RadioGroup value={sendMethod} onValueChange={setSendMethod} className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="telegram" id="method-telegram" />
                          <Label htmlFor="method-telegram" className="cursor-pointer">Telegram</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="email" id="method-email" />
                          <Label htmlFor="method-email" className="cursor-pointer">Email</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {sendMethod === 'telegram' && (
                      <div>
                        <Label htmlFor="telegram" className="text-emerald-900 font-semibold mb-2 block">
                          Telegram username (необязательно)
                        </Label>
                        <Input
                          id="telegram"
                          value={telegram}
                          onChange={(e) => setTelegram(e.target.value)}
                          placeholder="@username"
                          className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="email" className="text-emerald-900 font-semibold mb-2 block">
                        Email {sendMethod === 'email' && '*'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.ru"
                        className={`border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                          showValidation && sendMethod === 'email' && !email ? 'border-red-500' : ''
                        }`}
                      />
                    </div>

                    <Button 
                      onClick={handleSendEstimate}
                      disabled={isSending}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg rounded-xl shadow-lg"
                    >
                      {isSending ? 'Отправка...' : 'Получить смету'}
                      <Icon name="Send" className="ml-2" />
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
          <h2 className="text-2xl font-bold mb-4">Смета на строительство бани</h2>
          <div className="mb-4">
            <p><strong>Материал:</strong> {wallMaterial}</p>
            <p><strong>Размер:</strong> {length}x{width} м</p>
            <p><strong>Фундамент:</strong> {foundation}</p>
            <p><strong>Этажность:</strong> {floors === '1' ? 'одноэтажная' : 'с мансардой'}</p>
          </div>
          {estimate.map((section, idx) => (
            section.subtotal > 0 && (
              <div key={idx} className="mb-6">
                <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                <table className="w-full border-collapse border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Наименование</th>
                      <th className="border p-2">Ед.</th>
                      <th className="border p-2">Кол-во</th>
                      <th className="border p-2">Цена</th>
                      <th className="border p-2">Сумма</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, itemIdx) => (
                      item.total > 0 && (
                        <tr key={itemIdx}>
                          <td className="border p-2">{item.name}</td>
                          <td className="border p-2 text-center">{item.unit}</td>
                          <td className="border p-2 text-center">{item.quantity}</td>
                          <td className="border p-2 text-right">{item.price.toLocaleString()}</td>
                          <td className="border p-2 text-right">{item.total.toLocaleString()}</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
                <div className="text-right font-bold mt-2">
                  Итого по разделу: {section.subtotal.toLocaleString()} ₽
                </div>
              </div>
            )
          ))}
          <div className="text-right text-2xl font-bold mt-4">
            ИТОГО: {totalPrice.toLocaleString()} ₽
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;