import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/7d6acc0a-c6ca-4197-a5e2-4ed6321a1af5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
        navigate("/");
      } else {
        alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.");
      }
    } catch (error) {
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.ru"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="banjaType">Тип бани </Label>
                <Input
                  id="banjaType"
                  name="banjaType"
                  value={formData.banjaType}
                  onChange={handleChange}
                  required
                  placeholder="Из бревна / из бруса"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Примерный размер (м²)</Label>
                <Input
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Например: 6x4"
                />
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
                <Label htmlFor="budget">Бюджет</Label>
                <Input
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Примерный бюджет"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Сроки реализации</Label>
                <Input
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="Когда планируете начать строительство?"
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