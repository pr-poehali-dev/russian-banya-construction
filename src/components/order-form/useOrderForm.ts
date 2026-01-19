import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface OrderFormData {
  material: string;
  length: string;
  width: string;
  partitionsLength: string;
  floors: string;
  foundation: string;
  location: string;
  name: string;
  phone: string;
  email: string;
  messenger: string;
}

export const useOrderForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
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

    if (messenger === 'email' && !email) {
      toast({
        title: "Ошибка",
        description: "Укажите адрес электронной почты",
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
        setShowSuccess(true);
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

  return {
    step,
    setStep,
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
    foundation,
    setFoundation,
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
    showSuccess,
    setShowSuccess,
    handleSubmit
  };
};