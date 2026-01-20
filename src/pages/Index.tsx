import { useState, useEffect } from "react";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import GallerySection from "@/components/home/GallerySection";
import TimelapseSection from "@/components/home/TimelapseSection";
import ProjectGalleryDialog from "@/components/home/ProjectGalleryDialog";
import OrderFormSection from "@/components/OrderFormSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = id === 'services' ? 120 : 80;
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
      const sections = ["hero", "about", "services", "gallery", "order", "contacts"];
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

      <AboutSection scrollToSection={scrollToSection} />

      <GallerySection onProjectClick={openGallery} />

      <TimelapseSection />

      <OrderFormSection />

      <ProjectGalleryDialog
        selectedProject={selectedProject}
        currentImageIndex={currentImageIndex}
        onClose={closeGallery}
        onPrevImage={prevImage}
        onNextImage={nextImage}
        onSelectImage={setCurrentImageIndex}
      />

      <Footer />
    </div>
  );
};

export default Index;