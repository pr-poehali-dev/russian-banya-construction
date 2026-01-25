import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import InputMask from "react-input-mask";
import Icon from "@/components/ui/icon";

interface RepairBookingFormProps {
  open: boolean;
  onClose: () => void;
}

const RepairBookingForm = ({ open, onClose }: RepairBookingFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    contact: "",
    address: "",
    date: "",
    time: "",
    comments: ""
  });

  // Функция сжатия изображений
  const compressImage = async (file: File, maxSizeMB: number = 2): Promise<File> => {
    // Если файл не изображение, проверяем его размер
    if (!file.type.startsWith('image/')) {
      // PDF и другие файлы не должны превышать 3 МБ
      if (file.size > 3 * 1024 * 1024) {
        const fileSizeMB = (file.size / 1024 / 1024).toFixed(1);
        throw new Error(
          `Файл "${file.name}" слишком большой (${fileSizeMB} МБ).\n\n` +
          `📄 Для PDF-файлов максимум 3 МБ.\n\n` +
          `💡 Что сделать:\n` +
          `• Сожмите PDF онлайн (например, ilovepdf.com)\n` +
          `• Или конвертируйте PDF в JPEG изображения\n` +
          `• Или отправьте меньше страниц за раз`
        );
      }
      return file;
    }
    
    // Если изображение уже достаточно маленькое, возвращаем как есть
    if (file.size <= maxSizeMB * 1024 * 1024) {
      return file;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Уменьшаем размер, если изображение слишком большое
          const maxDimension = 2048;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height * maxDimension) / width;
              width = maxDimension;
            } else {
              width = (width * maxDimension) / height;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);

            // Пробуем разные уровни качества, пока не достигнем нужного размера
            let quality = 0.85;
            const tryCompress = () => {
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    if (blob.size <= maxSizeMB * 1024 * 1024 || quality <= 0.3) {
                      // Достигли нужного размера или минимального качества
                      const compressedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                      });
                      resolve(compressedFile);
                    } else {
                      // Нужно сжать сильнее
                      quality -= 0.1;
                      tryCompress();
                    }
                  } else {
                    resolve(file);
                  }
                },
                'image/jpeg',
                quality
              );
            };

            tryCompress();
          } else {
            resolve(file);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Сжимаем изображения и конвертируем файлы в base64
      const filesBase64 = await Promise.all(
        attachedFiles.map(async (file) => {
          // Сжимаем изображение если нужно (макс 1.5 МБ на файл для надёжности)
          const processedFile = await compressImage(file, 1.5);
          
          // Проверка размера после сжатия
          if (processedFile.size > 3 * 1024 * 1024) {
            throw new Error(`Файл "${file.name}" слишком большой (${(processedFile.size / 1024 / 1024).toFixed(1)} МБ). Максимум 3 МБ на файл после сжатия.`);
          }
          
          return new Promise<{name: string, data: string, type: string}>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = (reader.result as string).split(',')[1];
              resolve({
                name: processedFile.name,
                data: base64,
                type: processedFile.type
              });
            };
            reader.readAsDataURL(processedFile);
          });
        })
      );
      
      // Проверка общего размера перед отправкой
      const totalSize = filesBase64.reduce((sum, f) => sum + (f.data.length * 0.75 / 1024 / 1024), 0);
      if (totalSize > 8) {
        toast({
          title: "Файлы слишком большие",
          description: `Общий размер ${totalSize.toFixed(1)} МБ. Максимум 8 МБ. Удалите некоторые файлы.`,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("https://functions.poehali.dev/524c52bf-6818-4c61-bc6f-3845447c12d5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          attachments: filesBase64
        })
      });

      if (response.ok) {
        // Отправляем цель в Яндекс Метрику
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(105711132, 'reachGoal', 'form_submit');
        }

        setFormData({
          name: "",
          phone: "",
          contact: "",
          address: "",
          date: "",
          time: "",
          comments: ""
        });
        setAttachedFiles([]);
        onClose();
        setShowSuccess(true);
      } else {
        throw new Error("Ошибка отправки");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      toast({
        title: "Ошибка",
        description: errorMessage.includes('слишком большой') 
          ? errorMessage 
          : "Не удалось отправить заявку. Попробуйте позже.",
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
            <DialogTitle className="text-2xl font-bold">Забронировать выезд для осмотра бани</DialogTitle>
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
              <Label htmlFor="contact">Почта (или Телеграмм)</Label>
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

            <div>
              <Label htmlFor="files">Прикрепить файлы (фото, чертежи)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-500 transition-colors">
                <input
                  id="files"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.dwg"
                  onChange={(e) => {
                    if (e.target.files) {
                      const newFiles = Array.from(e.target.files);
                      const existingSize = attachedFiles.reduce((sum, f) => sum + f.size, 0);
                      const newSize = newFiles.reduce((sum, f) => sum + f.size, 0);
                      const totalSize = existingSize + newSize;
                      
                      if (totalSize > 20 * 1024 * 1024) {
                        toast({
                          title: "Файлы слишком большие",
                          description: `Общий размер не должен превышать 20 МБ.\nТекущий: ${(existingSize / 1024 / 1024).toFixed(2)} МБ\nДобавляете: ${(newSize / 1024 / 1024).toFixed(2)} МБ`,
                          variant: "destructive"
                        });
                        e.target.value = '';
                        return;
                      }
                      setAttachedFiles([...attachedFiles, ...newFiles]);
                      e.target.value = '';
                    }
                  }}
                  className="hidden"
                />
                <label htmlFor="files" className="flex flex-col items-center gap-2 cursor-pointer">
                  <Icon name="Upload" size={32} className="text-green-600" />
                  <span className="text-sm text-gray-600">Нажмите или перетащите файлы</span>
                  <span className="text-xs text-gray-400">Макс. 20 МБ (JPG, PNG, PDF, DOC, DWG)</span>
                </label>
              </div>
              {attachedFiles.length > 0 && (
                <div className="space-y-2 mt-2">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-green-50 p-2 rounded-lg">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Icon name="FileText" size={16} className="text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">({(file.size / 1024).toFixed(0)} КБ)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAttachedFiles(attachedFiles.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

      <Dialog open={showSuccess} onOpenChange={() => setShowSuccess(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-emerald-900 text-xl">✅ Заявка отправлена!</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Спасибо за заявку! Мы свяжемся с вами в ближайшее время для подтверждения визита.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setShowSuccess(false)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
            >
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RepairBookingForm;