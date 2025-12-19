import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const OrderFormSection = () => {
  const { toast } = useToast();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !messenger) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/cba76a16-6247-4333-9605-62ab8c813235', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          material,
          length,
          width,
          partitionsLength,
          floors,
          foundation,
          location,
          name,
          phone,
          email,
          messenger
        })
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(105711132, 'reachGoal', 'form_submit');
        }
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время.",
        });
        setStep(1);
        setMaterial('');
        setLength('');
        setWidth('');
        setPartitionsLength('');
        setFloors('');
        setFoundation('');
        setLocation('');
        setName('');
        setPhone('');
        setEmail('');
        setMessenger('');
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или позвоните +7 (982) 490-09-00",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-20 px-4 sm:px-6 w-full overflow-x-hidden bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 px-2">
          Калькулятор стоимости бани
        </h2>

        <div className="mb-8 overflow-x-hidden w-full">
          <div className="flex justify-center items-center space-x-1 md:space-x-4 px-4 max-w-full">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center flex-shrink-0">
                <div className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-base flex-shrink-0 ${
                  s === step ? 'bg-yellow-400 text-black' : s < step ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 5 && <div className={`w-6 md:w-16 h-1 flex-shrink-0 ${s < step ? 'bg-green-500' : 'bg-gray-300'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-xs md:text-sm text-gray-600">
            {step === 1 && 'Шаг 1: Выбор фундамента'}
            {step === 2 && 'Шаг 2: Материал стен'}
            {step === 3 && 'Шаг 3: Размеры бани'}
            {step === 4 && 'Шаг 4: Место строительства'}
            {step === 5 && 'Шаг 5: Контактные данные'}
          </div>
        </div>

        <Card className="w-full max-w-full overflow-hidden">
          <CardHeader className="bg-yellow-400">
            <CardTitle className="text-lg md:text-2xl text-black text-center break-words px-2">
              {step === 1 && 'Выберите тип фундамента'}
              {step === 2 && 'Выберите материал стен'}
              {step === 3 && 'Укажите размеры бани'}
              {step === 4 && 'Где будет строиться баня?'}
              {step === 5 && 'Ваши контактные данные'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6 w-full max-w-full overflow-x-hidden">
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
                      <div className="text-sm opacity-80">Экологично, классический вид</div>
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
                      <div className="text-sm opacity-80">Доступная цена</div>
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
                      <div className="text-sm opacity-80">Не дает усадку</div>
                    </div>
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 overflow-x-hidden">
                <div className="space-y-2 overflow-x-hidden">
                  <Label className="text-sm md:text-base">Длина бани (м) *</Label>
                  <Input
                    type="number"
                    step="0.5"
                    min="3"
                    max="15"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Например: 6"
                    className="text-lg py-6 w-full max-w-full"
                  />
                </div>

                <div className="space-y-2 overflow-x-hidden">
                  <Label className="text-sm md:text-base">Ширина бани (м) *</Label>
                  <Input
                    type="number"
                    step="0.5"
                    min="3"
                    max="15"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Например: 4"
                    className="text-lg py-6 w-full max-w-full"
                  />
                </div>

                <div className="space-y-2 overflow-x-hidden">
                  <Label className="text-sm md:text-base">Длина всех перегородок (м)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    min="0"
                    max="50"
                    value={partitionsLength}
                    onChange={(e) => setPartitionsLength(e.target.value)}
                    placeholder="Например: 8"
                    className="text-lg py-6 w-full max-w-full"
                  />
                  <p className="text-sm text-gray-500 break-words">Суммарная длина всех внутренних перегородок</p>
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
                      className={`h-auto py-6 ${
                        floors === '1' 
                          ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-lg">1 этаж</div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setFloors('1.5');
                        if (length && width) setTimeout(() => setStep(4), 300);
                      }}
                      className={`h-auto py-6 ${
                        floors === '1.5' 
                          ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-lg">1,5 этажа</div>
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
                    </div>
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4 overflow-x-hidden">
                <div className="space-y-2 overflow-x-hidden">
                  <Label className="text-sm md:text-base">Ваше имя *</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                    className="text-lg py-6 w-full max-w-full"
                  />
                </div>

                <div className="space-y-2 overflow-x-hidden">
                  <Label className="text-sm md:text-base">Телефон *</Label>
                  <Input
                    type="tel"
                    value={phone}
                    onFocus={(e) => {
                      if (!phone) {
                        setPhone('+7 ');
                      }
                    }}
                    onChange={(e) => {
                      const input = e.target.value;
                      
                      if (!input.startsWith('+7')) {
                        setPhone('+7 ');
                        return;
                      }
                      
                      if (input.length < 3) {
                        setPhone('+7 ');
                        return;
                      }
                      
                      let value = input.slice(2).replace(/\D/g, '');
                      if (value.length > 10) value = value.slice(0, 10);
                      
                      let formatted = '+7';
                      if (value.length > 0) {
                        formatted += ' (' + value.slice(0, 3);
                      }
                      if (value.length >= 4) {
                        formatted += ') ' + value.slice(3, 6);
                      }
                      if (value.length >= 7) {
                        formatted += '-' + value.slice(6, 8);
                      }
                      if (value.length >= 9) {
                        formatted += '-' + value.slice(8, 10);
                      }
                      
                      setPhone(formatted);
                    }}
                    placeholder="+7 (999) 123-45-67"
                    className="text-lg py-6 w-full max-w-full"
                  />
                </div>

                <div className="space-y-2 overflow-x-hidden">
                  <Label className="text-sm md:text-base">Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ivan@example.com"
                    className="text-lg py-6 w-full max-w-full"
                  />
                </div>

                <div className="space-y-2 overflow-x-hidden">
                  <Label className="text-sm md:text-base">Куда отправить расчёт? *</Label>
                  <div className="grid gap-3 w-full">
                    <Button
                      type="button"
                      onClick={() => setMessenger('whatsapp')}
                      className={`h-auto py-4 ${
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
                      className={`h-auto py-4 ${
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
                      className={`h-auto py-4 ${
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

            <div className="flex justify-between pt-4 overflow-x-hidden w-full">
              {step > 1 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  className="flex-shrink-0"
                >
                  Назад
                </Button>
              )}
              {step < 5 && (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="ml-auto bg-green-600 hover:bg-green-700 flex-shrink-0"
                  disabled={
                    (step === 1 && !foundation) ||
                    (step === 2 && !material) ||
                    (step === 3 && (!length || !width || !floors)) ||
                    (step === 4 && !location)
                  }
                >
                  Далее
                </Button>
              )}
              {step === 5 && (
                <Button
                  onClick={handleSubmit}
                  className="ml-auto bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                  disabled={!name || !phone || !messenger || isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OrderFormSection;