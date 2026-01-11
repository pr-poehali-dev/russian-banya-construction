import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { projects, projectGalleries } from "./projectData";

interface GallerySectionProps {
  onProjectClick: (index: number) => void;
}

const GallerySection = ({ onProjectClick }: GallerySectionProps) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, projects.length));
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <section id="gallery" className="py-20 bg-muted/30 px-4 sm:px-6 w-full overflow-x-hidden">
      <div className="container mx-auto w-full max-w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 px-2 break-words">Несколько примеров построенных и модернизированных бань и парных</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-full">
          {visibleProjects.map((project, idx) => (
            <Card 
              key={idx} 
              className="overflow-hidden cursor-pointer transition-transform hover:scale-105 w-full max-w-full group"
              onClick={() => onProjectClick(idx)}
            >
              <div className="relative overflow-hidden w-full max-w-full">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className={`w-full h-64 object-cover hover:scale-110 transition-transform duration-500 ${idx === 0 ? 'object-[70%_center]' : ''}`}
                />
                {projectGalleries[idx].length > 0 && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center">
                      <Icon name="Images" size={40} className="mx-auto mb-2" />
                      <p className="text-lg font-semibold">{projectGalleries[idx].length} фото</p>
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="pt-6 w-full max-w-full overflow-x-hidden">
                <h3 className="text-lg md:text-xl font-bold mb-3 break-words">{project.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground break-words">
                  <div className="flex items-center gap-2">
                    <Icon name="Ruler" size={16} className="text-primary" />
                    <span>Размер: {project.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="TreePine" size={16} className="text-primary" />
                    <span>{project.material}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center mt-12">
            <Button 
              onClick={showMore}
              size="lg"
              className="px-8"
            >
              Смотреть еще
              <Icon name="ChevronDown" size={20} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;