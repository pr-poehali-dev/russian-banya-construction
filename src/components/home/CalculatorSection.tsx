import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CalculatorSection = () => {
  const [bathType, setBathType] = useState<string>("log");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const pricePerSqm = {
    log: 45000,
    timber: 35000,
    frame: 25000
  };

  const calculatePrice = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    
    if (l > 0 && w > 0) {
      const area = l * w;
      const price = area * pricePerSqm[bathType as keyof typeof pricePerSqm];
      setResult(price);
    }
  };

  return (
    <section id="calculator" className="py-20 px-4 sm:px-6 w-full bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Калькулятор стоимости бани</h2>
        <p className="text-center text-muted-foreground mb-12">Рассчитайте примерную стоимость строительства вашей бани</p>
        
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-3 block">Тип строительства</Label>
              <RadioGroup value={bathType} onValueChange={setBathType}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="log" id="log" />
                  <Label htmlFor="log" className="cursor-pointer flex-1">Из бревна (~45 000 ₽/м²)</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="timber" id="timber" />
                  <Label htmlFor="timber" className="cursor-pointer flex-1">Из бруса (~35 000 ₽/м²)</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="frame" id="frame" />
                  <Label htmlFor="frame" className="cursor-pointer flex-1">Каркасная (~25 000 ₽/м²)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="length" className="text-base font-semibold mb-2 block">Длина (метры)</Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="Например: 6"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="width" className="text-base font-semibold mb-2 block">Ширина (метры)</Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="Например: 4"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="text-lg"
                />
              </div>
            </div>

            <Button 
              onClick={calculatePrice}
              className="w-full text-lg py-6 bg-green-600 hover:bg-green-700"
              disabled={!length || !width}
            >
              Рассчитать стоимость
            </Button>

            {result !== null && (
              <div className="mt-6 p-6 bg-green-50 border-2 border-green-600 rounded-lg text-center animate-fade-in">
                <p className="text-lg text-muted-foreground mb-2">Примерная стоимость строительства:</p>
                <p className="text-4xl font-black text-green-600">
                  {result.toLocaleString('ru-RU')} ₽
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  * Расчет является ориентировочным. Точная стоимость зависит от материалов, сложности проекта и дополнительных работ.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
