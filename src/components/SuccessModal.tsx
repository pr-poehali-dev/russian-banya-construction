import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <Icon name="X" size={24} />
          <span className="sr-only">Закрыть</span>
        </button>

        <div className="flex flex-col items-center text-center py-6 space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <Icon name="Check" size={48} className="text-green-600" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">
              Спасибо за обращение!
            </h2>
            <p className="text-gray-600 text-lg">
              Мы получили вашу заявку и свяжемся с вами в ближайшее время.
            </p>
          </div>

          <Button 
            onClick={handleClose}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Вернуться на главную
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
