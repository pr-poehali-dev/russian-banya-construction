import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import InputMask from "react-input-mask";
import SuccessModal from "@/components/SuccessModal";

interface RepairBookingFormProps {
  open: boolean;
  onClose: () => void;
}

const RepairBookingForm = ({ open, onClose }: RepairBookingFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    contact: "",
    address: "",
    date: "",
    time: "",
    comments: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://functions.poehali.dev/524c52bf-6818-4c61-bc6f-3845447c12d5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({
          name: "",
          phone: "",
          contact: "",
          address: "",
          date: "",
          time: "",
          comments: ""
        });
        onClose();
        setShowSuccess(true);
      } else {
        throw new Error("Ошибка отправки");
      }
    } catch (error) {
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Забронировать выезд для ремонта бани</DialogTitle>
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
              {(inputProps: any) => (
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
            <Label htmlFor="contact">Почта (Телеграм или WhatsApp)</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="email@example.com или @telegram"
            />
          </div>

          <div>
            <Label htmlFor="address">Адрес объекта *</Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Город, улица, дом"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Дата выезда *</Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="time">Время выезда *</Label>
              <Input
                id="time"
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="comments">Комментарии</Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              placeholder="Опишите проблему или работы, которые нужно выполнить"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-green-600 hover:bg-green-700">
              {isSubmitting ? "Отправка..." : "Забронировать выезд"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
};

export default RepairBookingForm;