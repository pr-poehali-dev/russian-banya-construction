import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EstimateDocument from '@/components/EstimateDocument';
import EstimateLive from '@/components/EstimateLive';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const Calculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    foundation: '',
    material: '',
    length: '',
    width: '',
    location: '',
    name: '',
    phone: '',
    email: '',
  });

  const documentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
  });

  const steps = [
    { number: 1, title: 'Фундамент', description: 'Выберите тип фундамента' },
    { number: 2, title: 'Материал', description: 'Выберите материал стен' },
    { number: 3, title: 'Размеры', description: 'Укажите размеры бани' },
    { number: 4, title: 'Локация', description: 'Укажите место строительства' },
    { number: 5, title: 'Контакты', description: 'Ваши контактные данные' },
  ];

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.foundation !== '';
      case 2:
        return formData.material !== '';
      case 3:
        return formData.length !== '' && formData.width !== '';
      case 4:
        return formData.location !== '';
      case 5:
        return formData.name !== '' && formData.phone !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Калькулятор стоимости бани</h1>
          <p className="text-gray-600">Получите детальную смету за 5 простых шагов</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0">
              <div
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Step Circles */}
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step.number < currentStep
                      ? 'bg-green-600 text-white'
                      : step.number === currentStep
                      ? 'bg-green-600 text-white ring-4 ring-green-200'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${step.number === currentStep ? 'text-green-600' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 hidden md:block">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Foundation */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <RadioGroup value={formData.foundation} onValueChange={(value) => updateFormData('foundation', value)}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="lentochnyj" id="lentochnyj" />
                      <Label htmlFor="lentochnyj" className="cursor-pointer flex-1">
                        <div className="font-semibold">Винтовые сваи</div>
                        <div className="text-sm text-gray-500">Оптимальный вариант для большинства грунтов</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="stolbchatyj" id="stolbchatyj" />
                      <Label htmlFor="stolbchatyj" className="cursor-pointer flex-1">
                        <div className="font-semibold">Столбчатый фундамент</div>
                        <div className="text-sm text-gray-500">Экономичное решение для легких конструкций</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="plitnyj" id="plitnyj" />
                      <Label htmlFor="plitnyj" className="cursor-pointer flex-1">
                        <div className="font-semibold">Монолитная плита</div>
                        <div className="text-sm text-gray-500">Надежное основание для сложных грунтов</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="net" id="net" />
                      <Label htmlFor="net" className="cursor-pointer flex-1">
                        <div className="font-semibold">Без фундамента</div>
                        <div className="text-sm text-gray-500">Фундамент уже готов</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 2: Material */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <RadioGroup value={formData.material} onValueChange={(value) => updateFormData('material', value)}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="bревно" id="brevno" />
                      <Label htmlFor="brevno" className="cursor-pointer flex-1">
                        <div className="font-semibold">Оцилиндрованное бревно</div>
                        <div className="text-sm text-gray-500">Традиционная русская баня, от 27 000 ₽/м³</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="брус" id="brus" />
                      <Label htmlFor="brus" className="cursor-pointer flex-1">
                        <div className="font-semibold">Профилированный брус</div>
                        <div className="text-sm text-gray-500">Современный материал, от 22 000 ₽/м³</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 3: Size */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="length" className="text-base font-semibold mb-2 block">
                      Длина бани (метры)
                    </Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="Например: 6"
                      value={formData.length}
                      onChange={(e) => updateFormData('length', e.target.value)}
                      className="text-lg"
                      min="1"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width" className="text-base font-semibold mb-2 block">
                      Ширина бани (метры)
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="Например: 4"
                      value={formData.width}
                      onChange={(e) => updateFormData('width', e.target.value)}
                      className="text-lg"
                      min="1"
                      step="0.1"
                    />
                  </div>
                  {formData.length && formData.width && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-gray-600">Площадь бани:</p>
                      <p className="text-2xl font-bold text-green-600">
                        {(parseFloat(formData.length) * parseFloat(formData.width)).toFixed(2)} м²
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Location */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <RadioGroup value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="perm" id="perm" />
                      <Label htmlFor="perm" className="cursor-pointer flex-1">
                        <div className="font-semibold">Пермь</div>
                        <div className="text-sm text-gray-500">Бесплатная доставка</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="perm-30km" id="perm-30km" />
                      <Label htmlFor="perm-30km" className="cursor-pointer flex-1">
                        <div className="font-semibold">До 30 км от Перми</div>
                        <div className="text-sm text-gray-500">+5 000 ₽ к стоимости</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="perm-50km" id="perm-50km" />
                      <Label htmlFor="perm-50km" className="cursor-pointer flex-1">
                        <div className="font-semibold">30-50 км от Перми</div>
                        <div className="text-sm text-gray-500">+10 000 ₽ к стоимости</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="perm-100km" id="perm-100km" />
                      <Label htmlFor="perm-100km" className="cursor-pointer flex-1">
                        <div className="font-semibold">50-100 км от Перми</div>
                        <div className="text-sm text-gray-500">+20 000 ₽ к стоимости</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 5: Contact Info */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                      Ваше имя *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                      Телефон *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                      Email (необязательно)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.ru"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      После заполнения формы вы получите детальную смету, которую можно распечатать или сохранить.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t">
                {currentStep > 1 && (
                  <Button onClick={prevStep} variant="outline" className="flex-1">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>
                )}
                {currentStep < 5 ? (
                  <Button onClick={nextStep} disabled={!canProceed()} className="flex-1 bg-green-600 hover:bg-green-700">
                    Далее
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handlePrint}
                    disabled={!canProceed()}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Получить смету
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Live Preview Section */}
          <Card className="lg:sticky lg:top-8 h-fit">
            <CardHeader>
              <CardTitle>Предварительный расчет</CardTitle>
              <CardDescription>Смета обновляется автоматически</CardDescription>
            </CardHeader>
            <CardContent>
              <EstimateLive
                material={formData.material}
                length={formData.length}
                width={formData.width}
                foundation={formData.foundation}
                location={formData.location}
              />
            </CardContent>
          </Card>
        </div>

        {/* Hidden Document for Printing */}
        <div style={{ display: 'none' }}>
          <div ref={documentRef}>
            <EstimateDocument
              material={formData.material}
              length={formData.length}
              width={formData.width}
              foundation={formData.foundation}
              location={formData.location}
              name={formData.name}
              phone={formData.phone}
              email={formData.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
