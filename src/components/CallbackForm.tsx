import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import SuccessModal from "@/components/SuccessModal";

interface CallbackFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CallbackForm = ({ open, onOpenChange }: CallbackFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [callTime, setCallTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    
    if (!digits.startsWith("7")) {
      return "+7";
    }

    let formatted = "+7";
    if (digits.length > 1) {
      formatted += " (" + digits.substring(1, 4);
    }
    if (digits.length >= 5) {
      formatted += ") " + digits.substring(4, 7);
    }
    if (digits.length >= 8) {
      formatted += "-" + digits.substring(7, 9);
    }
    if (digits.length >= 10) {
      formatted += "-" + digits.substring(9, 11);
    }

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 2) {
      setPhone("+7");
      return;
    }
    setPhone(formatPhone(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || phone.replace(/\D/g, "").length < 11) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните имя и телефон полностью",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://functions.poehali.dev/f7371813-d96f-4d3b-99f3-d2da55522e4c", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          callTime: callTime || "Не указано",
        }),
      });

      if (response.ok) {
        setName("");
        setPhone("+7");
        setCallTime("");
        onOpenChange(false);
        setShowSuccess(true);
      } else {
        throw new Error("Ошибка отправки");
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Обратный звонок</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя *</Label>
            <Input
              id="name"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="callTime">Удобное время для звонка</Label>
            <Input
              id="callTime"
              placeholder="Например: 14:00-16:00"
              value={callTime}
              onChange={(e) => setCallTime(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
};

export default CallbackForm;