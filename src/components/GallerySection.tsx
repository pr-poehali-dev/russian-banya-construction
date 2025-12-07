import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect } from "react";

interface GallerySectionProps {
  projectGalleries: string[][];
  selectedProject: number | null;
  currentImageIndex: number;
  openGallery: (projectIndex: number) => void;
  closeGallery: () => void;
  nextImage: () => void;
  prevImage: () => void;
}

export const GallerySection = ({ 
  projectGalleries, 
  selectedProject, 
  currentImageIndex, 
  openGallery, 
  closeGallery, 
  nextImage, 
  prevImage 
}: GallerySectionProps) => {
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (selectedProject !== null) {
        e.preventDefault();
        if (e.deltaY > 0) {
          nextImage();
        } else if (e.deltaY < 0) {
          prevImage();
        }
      }
    };

    if (selectedProject !== null) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [selectedProject, currentImageIndex, nextImage, prevImage]);

  const projects = [
    {
      title: "Баня по-чёрному в п. Усть-Качка",
      image: "https://cdn.poehali.dev/files/9db95649-86f2-4493-be39-4d7acb47ba14.JPG",
      description: "Традиционная русская баня по-чёрному с использованием натурального камня"
    },
    {
      title: "Баня в загородном доме г. Пермь",
      image: "https://cdn.poehali.dev/files/e145e902-0d5a-4598-9062-6395356985f0.jpg",
      description: "Современная баня в загородном доме с панорамными окнами"
    },
    {
      title: "Парная в СНТ Дары Природы",
      image: "https://cdn.poehali.dev/files/1d9d6ed2-45ec-4f8f-a51f-bc5915cdd76a.jpg",
      description: "Уютная парная для дачи с эффективной печью"
    },
    {
      title: "Баня-бочка в п. Бершеть",
      image: "https://cdn.poehali.dev/files/0c49f489-1f6b-4479-8142-3603d899660a.png",
      description: "Компактная баня-бочка для небольшого участка"
    },
    {
      title: "Баня из кедра в г. Пермь",
      image: "https://cdn.poehali.dev/files/cdfc8af5-e7bc-49ee-96c8-0b9b3dced3af.JPG",
      description: "Элитная баня из кедра с ароматерапией"
    },
    {
      title: "Баня в 2 этажа с террасой",
      image: "https://cdn.poehali.dev/files/475d1fc5-71db-4437-8990-d067b0a25d0c.jpg",
      description: "Двухэтажная баня с комнатой отдыха и террасой"
    }
  ];

  return (
    <>
      <section id="gallery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Наши проекты</h2>
          <p className="text-center text-muted-foreground mb-12">Реализованные бани под ключ</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openGallery(idx)}>
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={selectedProject !== null} onOpenChange={closeGallery}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{selectedProject !== null ? projects[selectedProject].title : ""}</DialogTitle>
          </DialogHeader>
          <div className="relative flex-1 flex items-center justify-center p-6">
            {selectedProject !== null && (
              <>
                <img 
                  src={projectGalleries[selectedProject][currentImageIndex]} 
                  alt={`Фото ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    disabled={currentImageIndex === 0}
                    className="bg-white/90 hover:bg-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </button>
                  <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full">
                    {currentImageIndex + 1} / {projectGalleries[selectedProject].length}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    disabled={currentImageIndex === projectGalleries[selectedProject].length - 1}
                    className="bg-white/90 hover:bg-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Icon name="ChevronRight" size={24} />
                  </button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
