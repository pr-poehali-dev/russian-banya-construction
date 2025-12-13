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
  const [foundation, setFoundation] = useState('');
  const [roof, setRoof] = useState('');
  const [stove, setStove] = useState(false);
  const [insulation, setInsulation] = useState(false);
  const [finishing, setFinishing] = useState(false);
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

    if (roof === 'metallocherepica') basePrice += area * 1500;
    if (roof === 'mjagkaja') basePrice += area * 2000;
    if (roof === 'profnastil') basePrice += area * 1200;

    if (stove) basePrice += 80000;
    if (insulation) basePrice += area * 1500;
    if (finishing) basePrice += area * 3000;

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
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s === step ? 'bg-yellow-400 text-black' : s < step ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 4 && <div className={`w-16 h-1 ${s < step ? 'bg-green-500' : 'bg-gray-300'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-sm text-gray-600">
            {step === 1 && 'Шаг 1: Выбор фундамента'}
            {step === 2 && 'Шаг 2: Материал стен'}
            {step === 3 && 'Шаг 3: Кровля'}
            {step === 4 && 'Шаг 4: Дополнительные опции'}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && 'Выберите тип фундамента'}
                  {step === 2 && 'Выберите материал стен'}
                  {step === 3 && 'Выберите тип кровли'}
                  {step === 4 && 'Дополнительные опции'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <Label>Тип фундамента *</Label>
                    <div className="grid gap-3">
                      <Button
                        type="button"
                        onClick={() => setFoundation('lentochnyj')}
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
                        onClick={() => setFoundation('stolbchatyj')}
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
                        onClick={() => setFoundation('net')}
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
                        onClick={() => setMaterial('ocilindrovannoe-brevno')}
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
                        onClick={() => setMaterial('rublenoe-brevno')}
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
                        onClick={() => setMaterial('obychnyj-brus')}
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
                        onClick={() => setMaterial('kleenyj-brus')}
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
                        onClick={() => setMaterial('profilirovannyj-brus')}
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
                  <div className="space-y-4">
                    <Label>Тип кровли *</Label>
                    <div className="grid gap-3">
                      <Button
                        type="button"
                        onClick={() => setRoof('metallocherepica')}
                        className={`h-auto py-6 text-left justify-start ${
                          roof === 'metallocherepica' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Металлочерепица</div>
                          <div className="text-sm opacity-80">Долговечная и надёжная</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setRoof('mjagkaja')}
                        className={`h-auto py-6 text-left justify-start ${
                          roof === 'mjagkaja' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Мягкая кровля</div>
                          <div className="text-sm opacity-80">Тихая и красивая</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setRoof('profnastil')}
                        className={`h-auto py-6 text-left justify-start ${
                          roof === 'profnastil' 
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">Профнастил</div>
                          <div className="text-sm opacity-80">Бюджетный вариант</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <Label>Дополнительные опции</Label>
                    <label className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={stove}
                        onChange={(e) => setStove(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">Печь (+80 000 ₽)</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={insulation}
                        onChange={(e) => setInsulation(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">Утепление</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={finishing}
                        onChange={(e) => setFinishing(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">Внутренняя отделка</span>
                    </label>
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
                  {step < 4 && (
                    <Button
                      onClick={() => setStep(step + 1)}
                      className="ml-auto bg-green-600 hover:bg-green-700"
                      disabled={
                        (step === 1 && !foundation) ||
                        (step === 2 && !material)
                      }
                    >
                      Далее
                    </Button>
                  )}
                  {step === 4 && (
                    <Button
                      onClick={() => setShowEstimate(true)}
                      className="ml-auto bg-blue-600 hover:bg-blue-700"
                    >
                      Показать смету
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
                  roof={roof}
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
              roof={roof}
              stove={stove}
              insulation={insulation}
              finishing={finishing}
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