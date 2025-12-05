import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    banjaType: "",
    size: "",
    location: "",
    budget: "",
    timeline: "",
    additionalInfo: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp' | 'telegram'>('email');
  const [alternativePhone, setAlternativePhone] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [customLength, setCustomLength] = useState("");
  const [customWidth, setCustomWidth] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const contactPhone = alternativePhone || formData.phone;
      const dataToSend = {
        ...formData,
        phone: `+7${formData.phone}`,
        contactMethod,
        contactPhone: contactMethod !== 'email' ? `+7${contactPhone}` : undefined
      };
      
      const response = await fetch('https://functions.poehali.dev/7d6acc0a-c6ca-4197-a5e2-4ed6321a1af5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Специалисты компании \"Пермский Пар\" свяжутся с вами в ближайшее время.",
        });
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast({
          title: "Ошибка отправки",
          description: "Пожалуйста, попробуйте позже или позвоните нам по телефону +7 982 490-09-00.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже или позвоните нам по телефону +7 982 490-09-00.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      const phoneDigits = digits.startsWith('7') ? digits.slice(1) : digits;
      const formatted = phoneDigits.slice(0, 10);
      
      setFormData({
        ...formData,
        phone: formatted
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          ← Назад на главную
        </Button>

        <Card>
          <CardHeader className="bg-yellow-400">
            <CardTitle className="text-3xl text-black text-center">
              Анкета заказчика
            </CardTitle>
            <p className="text-center text-black/80 mt-2">
              Заполните форму, и мы рассчитаем стоимость вашей бани бесплатно
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Введите ваше имя"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm bg-muted border border-r-0 border-input rounded-l-md">
                    +7
                  </span>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="9001234567"
                    maxLength={10}
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Куда отправить расчет? *</Label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`flex-1 hover:bg-lime-400 text-black ${contactMethod === 'email' ? 'bg-yellow-400' : 'bg-gray-200'}`}
                  >
                    Email
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setContactMethod('whatsapp')}
                    className={`flex-1 hover:bg-lime-400 text-black ${contactMethod === 'whatsapp' ? 'bg-yellow-400' : 'bg-gray-200'}`}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setContactMethod('telegram')}
                    className={`flex-1 hover:bg-lime-400 text-black ${contactMethod === 'telegram' ? 'bg-yellow-400' : 'bg-gray-200'}`}
                  >
                    Telegram
                  </Button>
                </div>

                {contactMethod === 'email' && (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.ru"
                    required
                  />
                )}

                {(contactMethod === 'whatsapp' || contactMethod === 'telegram') && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Использовать основной телефон ({formData.phone ? `+7${formData.phone}` : 'не указан'}) или указать другой?
                    </Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm bg-muted border border-r-0 border-input rounded-l-md">
                        +7
                      </span>
                      <Input
                        type="tel"
                        value={alternativePhone}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, '');
                          const phoneDigits = digits.startsWith('7') ? digits.slice(1) : digits;
                          setAlternativePhone(phoneDigits.slice(0, 10));
                        }}
                        placeholder="Оставьте пустым, если совпадает с основным"
                        maxLength={10}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label>Материал стен бани *</Label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setFormData({...formData, banjaType: 'Бревно'})}
                    className={`flex-1 hover:bg-lime-400 text-black ${formData.banjaType === 'Бревно' ? 'bg-yellow-400' : 'bg-gray-200'}`}
                  >
                    Бревно
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setFormData({...formData, banjaType: 'Брус'})}
                    className={`flex-1 hover:bg-lime-400 text-black ${formData.banjaType === 'Брус' ? 'bg-yellow-400' : 'bg-gray-200'}`}
                  >
                    Брус
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Размер бани (м) *</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length" className="text-sm">Длина (м)</Label>
                    <Select 
                      value={length} 
                      onValueChange={(value) => {
                        setLength(value);
                        if (value !== 'custom') {
                          setCustomLength('');
                          const widthValue = width !== 'custom' ? width : customWidth;
                          setFormData({...formData, size: `${value}x${widthValue || ''}`});
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 м</SelectItem>
                        <SelectItem value="4">4 м</SelectItem>
                        <SelectItem value="5">5 м</SelectItem>
                        <SelectItem value="6">6 м</SelectItem>
                        <SelectItem value="7">7 м</SelectItem>
                        <SelectItem value="8">8 м</SelectItem>
                        <SelectItem value="9">9 м</SelectItem>
                        <SelectItem value="10">10 м</SelectItem>
                        <SelectItem value="custom">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                    {length === 'custom' && (
                      <Input
                        type="number"
                        step="0.1"
                        value={customLength}
                        onChange={(e) => {
                          setCustomLength(e.target.value);
                          const widthValue = width !== 'custom' ? width : customWidth;
                          setFormData({...formData, size: `${e.target.value}x${widthValue || ''}`});
                        }}
                        placeholder="Введите длину"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-sm">Ширина (м)</Label>
                    <Select 
                      value={width} 
                      onValueChange={(value) => {
                        setWidth(value);
                        if (value !== 'custom') {
                          setCustomWidth('');
                          const lengthValue = length !== 'custom' ? length : customLength;
                          setFormData({...formData, size: `${lengthValue || ''}x${value}`});
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 м</SelectItem>
                        <SelectItem value="4">4 м</SelectItem>
                        <SelectItem value="5">5 м</SelectItem>
                        <SelectItem value="6">6 м</SelectItem>
                        <SelectItem value="7">7 м</SelectItem>
                        <SelectItem value="8">8 м</SelectItem>
                        <SelectItem value="9">9 м</SelectItem>
                        <SelectItem value="10">10 м</SelectItem>
                        <SelectItem value="custom">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                    {width === 'custom' && (
                      <Input
                        type="number"
                        step="0.1"
                        value={customWidth}
                        onChange={(e) => {
                          setCustomWidth(e.target.value);
                          const lengthValue = length !== 'custom' ? length : customLength;
                          setFormData({...formData, size: `${lengthValue || ''}x${e.target.value}`});
                        }}
                        placeholder="Введите ширину"
                      />
                    )}
                  </div>
                </div>
                {formData.size && (
                  <p className="text-sm text-muted-foreground">
                    Размер бани: {formData.size} м
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Местоположение объекта</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Город, район"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Дополнительная информация</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Опишите ваши пожелания и требования"
                  rows={5}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-yellow-400 hover:bg-lime-400 text-black font-bold text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderForm;