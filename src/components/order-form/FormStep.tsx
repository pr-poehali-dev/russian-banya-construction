import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormStepProps {
  step: number;
  foundation: string;
  setFoundation: (value: string) => void;
  material: string;
  setMaterial: (value: string) => void;
  length: string;
  setLength: (value: string) => void;
  width: string;
  setWidth: (value: string) => void;
  partitionsLength: string;
  setPartitionsLength: (value: string) => void;
  floors: string;
  setFloors: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  messenger: string;
  setMessenger: (value: string) => void;
  isSubmitting: boolean;
  setStep: (step: number) => void;
  handleSubmit: () => void;
}

const FormStep = ({
  step,
  foundation,
  setFoundation,
  material,
  setMaterial,
  length,
  setLength,
  width,
  setWidth,
  partitionsLength,
  setPartitionsLength,
  floors,
  setFloors,
  location,
  setLocation,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  messenger,
  setMessenger,
  isSubmitting,
  setStep,
  handleSubmit
}: FormStepProps) => {
  const getStepTitle = () => {
    switch(step) {
      case 1: return 'Выберите тип фундамента';
      case 2: return 'Выберите материал стен';
      case 3: return 'Укажите размеры бани';
      case 4: return 'Где будет строиться баня?';
      case 5: return 'Ваши контактные данные';
      default: return '';
    }
  };

  return (
    <Card className="w-full max-w-full overflow-hidden">
      <CardHeader className="bg-yellow-400">
        <CardTitle className="text-lg md:text-2xl text-black text-center break-words px-2">
          {getStepTitle()}
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
                  <div className="text-sm opacity-80">Доступно, практично</div>
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
                  <div className="text-sm opacity-80">Плотное соединение, меньше щелей</div>
                </div>
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setMaterial('kleyonyj-brus');
                  setTimeout(() => setStep(3), 300);
                }}
                className={`h-auto py-6 text-left justify-start ${
                  material === 'kleyonyj-brus' 
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                <div>
                  <div className="font-bold text-lg">Клееный брус</div>
                  <div className="text-sm opacity-80">Премиум качество, минимальная усадка</div>
                </div>
              </Button>
            </div>
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Назад
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="length">Длина бани (метры) *</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Например: 6"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Ширина бани (метры) *</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Например: 4"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partitionsLength">Суммарная длина перегородок (метры)</Label>
              <Input
                id="partitionsLength"
                type="number"
                value={partitionsLength}
                onChange={(e) => setPartitionsLength(e.target.value)}
                placeholder="Например: 8"
              />
            </div>
            <div className="space-y-2">
              <Label>Этажность *</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  onClick={() => setFloors('1')}
                  className={`h-auto py-4 ${
                    floors === '1' 
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  1 этаж
                </Button>
                <Button
                  type="button"
                  onClick={() => setFloors('2')}
                  className={`h-auto py-4 ${
                    floors === '2' 
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  2 этажа
                </Button>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Назад
              </Button>
              <Button 
                type="button" 
                onClick={() => setStep(4)}
                disabled={!length || !width || !floors}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Далее
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Город или населенный пункт *</Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Например: Пермь"
                required
              />
            </div>
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                Назад
              </Button>
              <Button 
                type="button" 
                onClick={() => setStep(5)}
                disabled={!location}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Далее
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться?"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (необязательно)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Куда отправить расчет? *</Label>
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
                  На почту
                </Button>
                <Button
                  type="button"
                  onClick={() => setMessenger('maks')}
                  className={`h-auto py-4 text-left justify-start ${
                    messenger === 'maks' 
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  МАКС (мой.мир)
                </Button>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(4)}>
                Назад
              </Button>
              <Button 
                type="button" 
                onClick={handleSubmit}
                disabled={!name || !phone || !messenger || isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormStep;