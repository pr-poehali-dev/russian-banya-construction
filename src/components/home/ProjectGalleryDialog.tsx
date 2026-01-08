import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { projectGalleries } from "./projectData";

interface ProjectGalleryDialogProps {
  selectedProject: number | null;
  currentImageIndex: number;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
}

const ProjectGalleryDialog = ({
  selectedProject,
  currentImageIndex,
  onClose,
  onPrevImage,
  onNextImage,
  onSelectImage
}: ProjectGalleryDialogProps) => {
  if (selectedProject === null) return null;

  return (
    <Dialog open={selectedProject !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-5xl max-h-[90vh] overflow-auto" hideClose>
        <div className="relative w-full max-w-full overflow-hidden">
          <img 
            src={projectGalleries[selectedProject][currentImageIndex]} 
            alt={`Фото ${currentImageIndex + 1}`}
            className="w-full max-w-full h-auto max-h-[50vh] object-contain rounded-lg"
          />
          <div className="flex items-center justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={onPrevImage} 
              disabled={currentImageIndex === 0}
              size="icon"
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentImageIndex + 1} / {projectGalleries[selectedProject].length}
            </span>
            <Button 
              variant="outline" 
              onClick={onNextImage} 
              disabled={currentImageIndex === projectGalleries[selectedProject].length - 1}
              size="icon"
            >
              <Icon name="ChevronRight" size={24} />
            </Button>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-7 gap-1 md:gap-1.5 mt-3 w-full max-w-full overflow-x-hidden">
            {projectGalleries[selectedProject].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Миниатюра ${idx + 1}`}
                className={`w-full h-12 object-cover rounded cursor-pointer border-2 transition-all ${
                  idx === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-primary/50'
                }`}
                onClick={() => onSelectImage(idx)}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectGalleryDialog;
