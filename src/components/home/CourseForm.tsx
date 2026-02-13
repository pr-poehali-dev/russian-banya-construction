import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import InputMask from "react-input-mask";
import Icon from "@/components/ui/icon";

interface CourseFormProps {
  open: boolean;
  onClose: () => void;
}

const ORDER_URL = "https://functions.poehali.dev/cba76a16-6247-4333-9605-62ab8c813235";

const CourseForm = ({ open, onClose }: CourseFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "course"
        })
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && (window as unknown as {ym?: (...args: unknown[]) => void}).ym) {
          (window as unknown as {ym: (...args: unknown[]) => void}).ym(105711132, 'reachGoal', 'course_form_submit');
        }

        setFormData({ name: "", phone: "", email: "" });
        onClose();
        setShowSuccess(true);
      } else {
        throw new Error("Server error");
      }
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center leading-tight">
              Получить подробности курса для заказчиков "Строительство правильной русской бани"
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Введите ваше имя"
              />
            </div>

            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <InputMask
                mask="+7 (999) 999-99-99"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <Input
                    {...inputProps}
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                )}
              </InputMask>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Введите ваш email"
              />
            </div>

            <p className="text-xs text-muted-foreground text-center">
              На указанный email будет отправлена программа семинара в формате PDF
            </p>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Генерируем PDF и отправляем..." : "Получить программу на email"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="Check" size={32} className="text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold mb-4">Программа отправлена!</DialogTitle>
            <p className="text-muted-foreground mb-6">
              PDF с программой семинара «Строительство правильной Русской бани» отправлен на ваш email. Проверьте почту!
            </p>
            <Button onClick={() => setShowSuccess(false)} className="bg-orange-500 hover:bg-orange-600">
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseForm;