import { useState, useEffect } from "react";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import GallerySection from "@/components/home/GallerySection";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectGalleryDialog from "@/components/home/ProjectGalleryDialog";
import OrderFormSection from "@/components/OrderFormSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const openGallery = (projectIndex: number) => {
    setSelectedProject(projectIndex);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject !== null) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "gallery", "order", "services"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      <HeroSection scrollToSection={scrollToSection} />

      <AboutSection />

      <GallerySection onProjectClick={openGallery} />

      <OrderFormSection />

      <ServicesSection />

      <ProjectGalleryDialog
        selectedProject={selectedProject}
        currentImageIndex={currentImageIndex}
        onClose={closeGallery}
        onPrevImage={prevImage}
        onNextImage={nextImage}
        onSelectImage={setCurrentImageIndex}
      />
    </div>
  );
};

export default Index;
