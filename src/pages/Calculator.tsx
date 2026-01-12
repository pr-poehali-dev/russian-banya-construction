import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Calculator = () => {
  const [foundation, setFoundation] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const foundationPrices: Record<string, number> = {
    'ленточный': 150000,
    'сваи': 80000,
    'есть': 0,
  };

  const calculatePrice = () => {
    if (!foundation || !length || !width) return;

    const area = parseFloat(length) * parseFloat(width);
    const pricePerSquareMeter = 35000;
    const foundationCost = foundationPrices[foundation] || 0;
    const total = area * pricePerSquareMeter + foundationCost;

    setTotalPrice(total);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <CardTitle className="text-3xl text-center">Калькулятор стоимости бани</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
            {/* Тип фундамента */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Выберите тип фундамента:</Label>
              <RadioGroup value={foundation} onValueChange={setFoundation}>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="ленточный" id="lenточный" />
                  <Label htmlFor="lenточный" className="cursor-pointer flex-1">
                    Ленточный фундамент
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="сваи" id="svai" />
                  <Label htmlFor="svai" className="cursor-pointer flex-1">
                    Винтовые сваи
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="есть" id="est" />
                  <Label htmlFor="est" className="cursor-pointer flex-1">
                    Фундамент уже есть
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Размеры */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="length" className="text-lg font-semibold">
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
                <Label htmlFor="width" className="text-lg font-semibold">
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

            {/* Кнопка расчета */}
            <Button
              onClick={calculatePrice}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-lg py-6"
              disabled={!foundation || !length || !width}
            >
              Рассчитать стоимость
            </Button>

            {/* Результат */}
            {totalPrice !== null && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <p className="text-gray-600 text-lg">Ориентировочная стоимость:</p>
                    <p className="text-4xl font-bold text-green-700">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      * Итоговая стоимость может измениться после выезда специалиста на объект
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
