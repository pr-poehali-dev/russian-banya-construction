import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Calculator = () => {
  const [material, setMaterial] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [foundation, setFoundation] = useState('');
  const [roof, setRoof] = useState('');
  const [stove, setStove] = useState(false);
  const [insulation, setInsulation] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const materialImages = {
    'bревno': 'https://cdn.poehali.dev/projects/da5fbb35-3c86-46c2-a2f3-70acab9f4a94/bucket/bath-log.jpg',
    'brus': 'https://cdn.poehali.dev/projects/da5fbb35-3c86-46c2-a2f3-70acab9f4a94/bucket/bath-timber.jpg'
  };

  const foundationImages = {
    'lentochnyj': 'https://cdn.poehali.dev/projects/da5fbb35-3c86-46c2-a2f3-70acab9f4a94/bucket/foundation-strip.jpg',
    'stolbchatyj': 'https://cdn.poehali.dev/projects/da5fbb35-3c86-46c2-a2f3-70acab9f4a94/bucket/foundation-pillar.jpg',
    'plitnyj': 'https://cdn.poehali.dev/projects/da5fbb35-3c86-46c2-a2f3-70acab9f4a94/bucket/foundation-slab.jpg'
  };

  const calculatePrice = () => {
    if (!length || !width || !material) return 0;
    
    const area = parseFloat(length) * parseFloat(width);
    const pricePerM2 = material === 'bревno' ? 25000 : 22000;
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

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Основные параметры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Материал стен *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      onClick={() => setMaterial('bревno')}
                      className={`h-auto py-4 ${material === 'bревno' ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-200 hover:bg-gray-300'} text-black`}
                    >
                      Бревно
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setMaterial('brus')}
                      className={`h-auto py-4 ${material === 'brus' ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-200 hover:bg-gray-300'} text-black`}
                    >
                      Брус
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Длина (м) *</Label>
                    <Input
                      type="number"
                      step="0.5"
                      min="3"
                      max="15"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ширина (м) *</Label>
                    <Input
                      type="number"
                      step="0.5"
                      min="3"
                      max="15"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="6"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Тип фундамента</Label>
                  <Select value={foundation} onValueChange={setFoundation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lentochnyj">Ленточный</SelectItem>
                      <SelectItem value="stolbchatyj">Столбчатый</SelectItem>
                      <SelectItem value="plitnyj">Плитный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Тип кровли</Label>
                  <Select value={roof} onValueChange={setRoof}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metallocherepica">Металлочерепица</SelectItem>
                      <SelectItem value="mjagkaja">Мягкая кровля</SelectItem>
                      <SelectItem value="profnastil">Профнастил</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Дополнительные опции</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stove}
                    onChange={(e) => setStove(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium">Печь (+80 000 ₽)</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={insulation}
                    onChange={(e) => setInsulation(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium">Утепление</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={finishing}
                    onChange={(e) => setFinishing(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium">Внутренняя отделка</span>
                </label>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {material && (
              <Card>
                <CardHeader>
                  <CardTitle>Выбранный материал</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={materialImages[material as keyof typeof materialImages]}
                    alt={material === 'bревno' ? 'Бревно' : 'Брус'}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="mt-3 text-center font-medium">
                    {material === 'bревno' ? 'Баня из бревна' : 'Баня из бруса'}
                  </p>
                </CardContent>
              </Card>
            )}

            {foundation && (
              <Card>
                <CardHeader>
                  <CardTitle>Тип фундамента</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={foundationImages[foundation as keyof typeof foundationImages]}
                    alt="Фундамент"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="mt-3 text-center font-medium">
                    {foundation === 'lentochnyj' && 'Ленточный фундамент'}
                    {foundation === 'stolbchatyj' && 'Столбчатый фундамент'}
                    {foundation === 'plitnyj' && 'Плитный фундамент'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Получить точный расчёт</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Оставьте контакты, и мы отправим подробную смету с учётом всех особенностей вашего проекта
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6">
              Получить смету на Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;