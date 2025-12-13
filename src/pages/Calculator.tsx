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
                      onClick={() => setMaterial('bревно')}
                      className={`h-auto py-4 ${material === 'bревно' ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-200 hover:bg-gray-300'} text-black`}
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
            <Card>
              <CardHeader>
                <CardTitle>Визуализация бани</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-square bg-gradient-to-b from-sky-200 to-green-100 rounded-lg overflow-hidden">
                  {foundation && (
                    <img
                      src={bathParts.foundation[foundation as keyof typeof bathParts.foundation]}
                      alt="Фундамент"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1/4 object-contain"
                    />
                  )}
                  
                  {material && (
                    <img
                      src={bathParts.walls[material as keyof typeof bathParts.walls]}
                      alt="Стены"
                      className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-3/4 h-2/5 object-contain"
                    />
                  )}
                  
                  {roof && (
                    <img
                      src={bathParts.roof[roof as keyof typeof bathParts.roof]}
                      alt="Крыша"
                      className="absolute top-[10%] left-1/2 -translate-x-1/2 w-4/5 h-2/5 object-contain"
                    />
                  )}
                  
                  {!material && !foundation && !roof && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-center p-8">
                      Выберите параметры, чтобы увидеть визуализацию бани
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  {material && <p>✓ Материал: {material === 'bревно' ? 'Бревно' : 'Брус'}</p>}
                  {foundation && <p>✓ Фундамент: {foundation === 'lentochnyj' ? 'Ленточный' : foundation === 'stolbchatyj' ? 'Столбчатый' : 'Плитный'}</p>}
                  {roof && <p>✓ Кровля: {roof === 'metallocherepica' ? 'Металлочерепица' : roof === 'mjagkaja' ? 'Мягкая' : 'Профнастил'}</p>}
                  {length && width && <p>✓ Площадь: {(parseFloat(length) * parseFloat(width)).toFixed(1)} м²</p>}
                </div>
              </CardContent>
            </Card>
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