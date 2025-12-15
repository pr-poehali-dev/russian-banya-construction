import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EstimateDocument from '@/components/EstimateDocument';
import EstimateLive from '@/components/EstimateLive';

const Calculator = () => {
  const [step, setStep] = useState(1);
  const [material, setMaterial] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [partitionsLength, setPartitionsLength] = useState('');
  const [floors, setFloors] = useState('');
  const [foundation, setFoundation] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [messenger, setMessenger] = useState('');
  const [showEstimate, setShowEstimate] = useState(false);

  const bathParts = {
    walls: {
      'bревno': 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/65ab4513-a8b8-422d-99fd-2ed5589fa26f.jpg',
      'brus': 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/0f343f45-7e46-4fa6-8f9f-b84065036b03.jpg'
    },
    foundation: {
      'lentochnyj': 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/3f84adff-6b68-4831-b84c-6550d10f06ae.jpg',
      'stolbchatyj': 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/df649a5f-4078-425d-ab78-e3363c9d84f8.jpg',
      'plitnyj': 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/a28893d6-2862-429c-8ab4-aa301777287e.jpg'
    },
    roof: {
      'metallocherepica': 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/8a896153-c118-4aa9-87d7-a37e355935bb.jpg',
      'mjagkaja': 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/e29467f8-121a-4873-9aa7-cfa56371ebc7.jpg',
      'profnastil': 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/8a896153-c118-4aa9-87d7-a37e355935bb.jpg'
    }
  };

  const calculatePrice = () => {
    if (!length || !width || !material) return 0;
    
    const area = parseFloat(length) * parseFloat(width);
    const pricePerM2 = material === 'bревно' ? 25000 : 22000;
    let basePrice = area * pricePerM2;

    if (foundation === 'lentochnyj') basePrice += area * 3000;
    if (foundation === 'stolbchatyj') basePrice += area * 2000;
    if (foundation === 'plitnyj') basePrice += area * 4000;

    if (location === 'perm-30km') basePrice += 5000;
    if (location === 'perm-50km') basePrice += 10000;
    if (location === 'perm-100km') basePrice += 20000;

    return Math.round(basePrice);
  };

  const totalPrice = calculatePrice();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Калькулятор стоимости бани
        </h1>

        {/* Индикатор шагов */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s === step ? 'bg-yellow-400 text-black' : s < step ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 5 && <div className={`w-16 h-1 ${s < step ? 'bg-green-500' : 'bg-gray-300'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-sm text-gray-600">
            {step === 1 && 'Шаг 1: Выбор фундамента'}
            {step === 2 && 'Шаг 2: Материал стен'}
            {step === 3 && 'Шаг 3: Размеры бани'}
            {step === 4 && 'Шаг 4: Место строительства'}
            {step === 5 && 'Шаг 5: Контактные данные'}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && 'Выберите тип фундамента'}
                  {step === 2 && 'Выберите материал стен'}
                  {step === 3 && 'Укажите размеры бани'}
                  {step === 4 && 'Где будет строиться баня?'}
                  {step === 5 && 'Ваши контактные данные'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <Label>Тип фундамента *</Label>
                    <div className="grid gap-3">
                      <Button
                        type="button"
                        onClick={() => {
                          setFoundation('lentochnyj');
                          setTimeout(() => setStep(2), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          foundation === 'lentochnyj' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Ленточный фундамент</div>
                          <div className="text-sm opacity-80">Бетонная лента по периметру</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setFoundation('stolbchatyj');
                          setTimeout(() => setStep(2), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          foundation === 'stolbchatyj' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Винтовые сваи</div>
                          <div className="text-sm opacity-80">Быстрый монтаж, подходит для любых грунтов</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setFoundation('net');
                          setTimeout(() => setStep(2), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          foundation === 'net' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Фундамент уже есть</div>
                          <div className="text-sm opacity-80">Использую существующий фундамент</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <Label>Материал стен *</Label>
                    <div className="grid gap-3">
                      <Button
                        type="button"
                        onClick={() => {
                          setMaterial('ocilindrovannoe-brevno');
                          setTimeout(() => setStep(3), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          material === 'ocilindrovannoe-brevno' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Оцилиндрованное бревно</div>
                          <div className="text-sm opacity-80">Экологично, классический вид, естественная текстура</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setMaterial('rublenoe-brevno');
                          setTimeout(() => setStep(3), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          material === 'rublenoe-brevno' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Рубленое бревно</div>
                          <div className="text-sm opacity-80">Ручная рубка, уникальность каждого элемента</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setMaterial('obychnyj-brus');
                          setTimeout(() => setStep(3), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          material === 'obychnyj-brus' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Обычный брус</div>
                          <div className="text-sm opacity-80">Доступная цена, проверенная технология</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setMaterial('kleenyj-brus');
                          setTimeout(() => setStep(3), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          material === 'kleenyj-brus' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Клееный брус</div>
                          <div className="text-sm opacity-80">Не дает усадку, минимальные деформации</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setMaterial('profilirovannyj-brus');
                          setTimeout(() => setStep(3), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          material === 'profilirovannyj-brus' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Профилированный брус</div>
                          <div className="text-sm opacity-80">Плотное соединение, отличная теплоизоляция</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Длина бани (м) *</Label>
                      <Input
                        type="number"
                        step="0.5"
                        min="3"
                        max="15"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Например: 6"
                        className="text-lg py-6"
                      />
                      <p className="text-sm text-gray-500">Укажите длину основной постройки</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Ширина бани (м) *</Label>
                      <Input
                        type="number"
                        step="0.5"
                        min="3"
                        max="15"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="Например: 4"
                        className="text-lg py-6"
                      />
                      <p className="text-sm text-gray-500">Укажите ширину основной постройки</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Длина всех перегородок (м)</Label>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        max="50"
                        value={partitionsLength}
                        onChange={(e) => setPartitionsLength(e.target.value)}
                        placeholder="Например: 8"
                        className="text-lg py-6"
                      />
                      <p className="text-sm text-gray-500">Суммарная длина всех внутренних перегородок</p>
                    </div>

                    <div className="space-y-3">
                      <Label>Этажность *</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          onClick={() => {
                            setFloors('1');
                            if (length && width) setTimeout(() => setStep(4), 300);
                          }}
                          className={`h-auto py-6 text-left justify-start ${
                            floors === '1' 
                              ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-lg">1 этаж</div>
                            <div className="text-sm opacity-80">Одноэтажная баня</div>
                          </div>
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setFloors('1.5');
                            if (length && width) setTimeout(() => setStep(4), 300);
                          }}
                          className={`h-auto py-6 text-left justify-start ${
                            floors === '1.5' 
                              ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-lg">1,5 этажа</div>
                            <div className="text-sm opacity-80">С мансардным этажом</div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <Label>Место строительства *</Label>
                    <div className="grid gap-3">
                      <Button
                        type="button"
                        onClick={() => {
                          setLocation('perm');
                          setTimeout(() => setStep(5), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          location === 'perm' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Пермь</div>
                          <div className="text-sm opacity-80">В черте города</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setLocation('perm-30km');
                          setTimeout(() => setStep(5), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          location === 'perm-30km' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">До 30 км от Перми</div>
                          <div className="text-sm opacity-80">Пригород и близлежащие населённые пункты</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setLocation('perm-50km');
                          setTimeout(() => setStep(5), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          location === 'perm-50km' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">30-50 км от Перми</div>
                          <div className="text-sm opacity-80">Удалённые районы</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setLocation('perm-100km');
                          setTimeout(() => setStep(5), 300);
                        }}
                        className={`h-auto py-6 text-left justify-start ${
                          location === 'perm-100km' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">50-100 км от Перми</div>
                          <div className="text-sm opacity-80">Пермский край</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Ваше имя *</Label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Иван Иванов"
                        className="text-lg py-6"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Телефон *</Label>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (!value.startsWith('7') && value.length > 0) {
                            value = '7' + value;
                          }
                          if (value.length > 11) value = value.slice(0, 11);
                          
                          let formatted = '+7';
                          if (value.length > 1) {
                            formatted += ' (' + value.slice(1, 4);
                          }
                          if (value.length >= 5) {
                            formatted += ') ' + value.slice(4, 7);
                          }
                          if (value.length >= 8) {
                            formatted += '-' + value.slice(7, 9);
                          }
                          if (value.length >= 10) {
                            formatted += '-' + value.slice(9, 11);
                          }
                          
                          setPhone(formatted);
                        }}
                        placeholder="+7 (999) 123-45-67"
                        className="text-lg py-6"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ivan@example.com"
                        className="text-lg py-6"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Куда отправить смету? *</Label>
                      <div className="grid gap-3">
                        <Button
                          type="button"
                          onClick={() => setMessenger('whatsapp')}
                          className={`h-auto py-4 text-left justify-start ${
                            messenger === 'whatsapp' 
                              ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          WhatsApp
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setMessenger('telegram')}
                          className={`h-auto py-4 text-left justify-start ${
                            messenger === 'telegram' 
                              ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          Telegram
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setMessenger('email')}
                          className={`h-auto py-4 text-left justify-start ${
                            messenger === 'email' 
                              ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Навигация */}
                <div className="flex justify-between pt-4">
                  {step > 1 && (
                    <Button
                      onClick={() => setStep(step - 1)}
                      variant="outline"
                    >
                      Назад
                    </Button>
                  )}
                  {step < 5 && (
                    <Button
                      onClick={() => setStep(step + 1)}
                      className="ml-auto bg-green-600 hover:bg-green-700"
                      disabled={
                        (step === 1 && !foundation) ||
                        (step === 2 && !material) ||
                        (step === 3 && (!length || !width || !floors))
                      }
                    >
                      Далее
                    </Button>
                  )}
                  {step === 5 && (
                    <Button
                      onClick={() => setShowEstimate(true)}
                      className="ml-auto bg-blue-600 hover:bg-blue-700"
                      disabled={!name || !phone || !messenger}
                    >
                      Получить смету
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Детальная смета</CardTitle>
              </CardHeader>
              <CardContent>
                <EstimateLive 
                  material={material}
                  length={length}
                  width={width}
                  foundation={foundation}
                  location={location}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {!showEstimate && totalPrice > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Получить подробную смету</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Посмотрите детальный расчёт стоимости с разбивкой по материалам и работам
              </p>
              <Button 
                onClick={() => setShowEstimate(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6"
              >
                Показать подробную смету
              </Button>
            </CardContent>
          </Card>
        )}

        {showEstimate && (
          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Подробная смета</h2>
              <Button 
                onClick={() => setShowEstimate(false)}
                variant="outline"
              >
                Вернуться к калькулятору
              </Button>
            </div>
            <EstimateDocument 
              material={material}
              length={length}
              width={width}
              foundation={foundation}
              location={location}
              name={name}
              phone={phone}
              email={email}
            />
            <div className="text-center py-6">
              <Button 
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4"
              >
                Распечатать смету
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;