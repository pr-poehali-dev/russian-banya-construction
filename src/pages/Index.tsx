import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ContentSections } from "@/components/ContentSections";
import { GallerySection } from "@/components/GallerySection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isButtonSticky, setIsButtonSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const projectGalleries = [
    [
      "https://cdn.poehali.dev/files/21891db6-8b5a-49ef-85a8-c1986de51d44.JPG",
      "https://cdn.poehali.dev/files/fd3c3beb-58e6-4d41-8f1c-16c4e6f576ac.JPG",
      "https://cdn.poehali.dev/files/9db95649-86f2-4493-be39-4d7acb47ba14.JPG",
      "https://cdn.poehali.dev/files/55a193e7-ac59-4782-9e54-0776e338f0af.JPG",
      "https://cdn.poehali.dev/files/242e8fc2-f9ba-46fc-9bc3-657aa6915553.JPG",
      "https://cdn.poehali.dev/files/f92cf9b3-fcf2-45e8-942d-4af9154f1760.JPG",
      "https://cdn.poehali.dev/files/c3f01861-ddfa-4365-8096-45ee644563d6.JPG",
      "https://cdn.poehali.dev/files/e612108f-9639-4eb8-92eb-7cf986c34f31.JPG",
      "https://cdn.poehali.dev/files/4e6b64a3-b7b3-4fba-af24-07ed8c17bd82.JPG",
      "https://cdn.poehali.dev/files/506ae37e-28ae-471e-8156-6c28ca4ba9db.JPG",
      "https://cdn.poehali.dev/files/1bb8c944-bfa2-42a5-b390-65e6df6dd5d6.JPG",
      "https://cdn.poehali.dev/files/89e29cc4-9f5e-4937-b56c-4be50d10f14d.JPG",
      "https://cdn.poehali.dev/files/f820bbd0-2db4-4948-978c-a3840219ebfa.JPG",
      "https://cdn.poehali.dev/files/dce63058-7770-4a36-b3a0-be7ccc1b6da8.JPG",
      "https://cdn.poehali.dev/files/6a05e040-7656-499e-bd66-509b5cea6a23.JPG",
      "https://cdn.poehali.dev/files/2d422aac-2e42-4cbf-a15d-1652c949d423.JPG",
      "https://cdn.poehali.dev/files/9b750020-b2e4-4e44-b917-a6f6a3c32043.JPG",
      "https://cdn.poehali.dev/files/bac906e9-8def-470a-9125-96dd78fc1a64.JPG",
      "https://cdn.poehali.dev/files/a485a14f-4056-4ba8-ba35-9aa846b2a045.JPG"
    ],
    [
      "https://cdn.poehali.dev/files/e145e902-0d5a-4598-9062-6395356985f0.jpg",
      "https://cdn.poehali.dev/files/44a34322-94c4-4927-b372-e632bd76e8c3.png",
      "https://cdn.poehali.dev/files/7c45af13-f389-40c5-a0ec-e0bed1884fef.jpg",
      "https://cdn.poehali.dev/files/cfa7f22e-7434-41a8-83cb-57c58472a187.jpg",
      "https://cdn.poehali.dev/files/0d1e0e9b-67ef-4b9f-8a21-913de4d4c829.jpg",
      "https://cdn.poehali.dev/files/4b438963-c14c-4a31-a4f6-dddd9a791e0c.jpg",
      "https://cdn.poehali.dev/files/6c712b7d-0a01-41fe-89c1-29ec45bad1dd.jpg"
    ],
    [
      "https://cdn.poehali.dev/files/1d9d6ed2-45ec-4f8f-a51f-bc5915cdd76a.jpg",
      "https://cdn.poehali.dev/files/2451e998-d599-4eeb-8bf3-8585ffab4342.jpg",
      "https://cdn.poehali.dev/files/48198ca6-3425-4781-aba7-849426247fc4.jpg",
      "https://cdn.poehali.dev/files/1f94dc5e-69ba-4805-8f4b-ca5bbf6a404c.jpg",
      "https://cdn.poehali.dev/files/e9474b80-69ae-4a00-8574-c27200bb57ba.jpg"
    ],
    [
      "https://cdn.poehali.dev/files/0c49f489-1f6b-4479-8142-3603d899660a.png",
      "https://cdn.poehali.dev/files/9a264058-2d14-4695-bd33-455d0d97aad9.png",
      "https://cdn.poehali.dev/files/5b94e280-3e52-4724-9d15-ffe56a2b6bad.png",
      "https://cdn.poehali.dev/files/84798a93-dd08-41eb-b20d-1a3611acf1be.png",
      "https://cdn.poehali.dev/files/cca216a7-9b9e-425b-b0e4-d352cea5b6a4.png",
      "https://cdn.poehali.dev/files/7062d1f4-7309-472d-bc60-6819f57dbd2f.png",
      "https://cdn.poehali.dev/files/aec4a2ca-0cc4-45f5-8a1f-76001cdb8530.png",
      "https://cdn.poehali.dev/files/61280d11-4eee-40f4-9105-3a20b63619e0.jpg",
      "https://cdn.poehali.dev/files/0b03e8cf-ef69-475b-a180-72929c4813b6.jpg",
      "https://cdn.poehali.dev/files/35c2929b-6726-4db3-aa64-52835d7f9c45.jpg"
    ],
    [
      "https://cdn.poehali.dev/files/cdfc8af5-e7bc-49ee-96c8-0b9b3dced3af.JPG",
      "https://cdn.poehali.dev/files/f919fd01-44da-4352-a059-ce1887970b68.JPG",
      "https://cdn.poehali.dev/files/0d341b86-5a44-457e-8b25-aed527fa0319.JPG",
      "https://cdn.poehali.dev/files/6985144b-f603-4f7c-8c6a-4f5621ba2438.JPG",
      "https://cdn.poehali.dev/files/ff9e85d0-683d-48ed-b9d8-ada1dc2b48c5.JPG",
      "https://cdn.poehali.dev/files/e8b09492-d10f-4b61-85b2-578f1cad9d2d.JPG",
      "https://cdn.poehali.dev/files/7351792a-30f0-45d4-ba22-5323e33fac9b.JPG",
      "https://cdn.poehali.dev/files/149818f6-0f8d-406f-802c-236ae430f5a2.JPG",
      "https://cdn.poehali.dev/files/91e41b87-6743-4d3e-b213-8775f982bc1d.JPG",
      "https://cdn.poehali.dev/files/7f87c675-ab58-4042-8cec-6640cc6ab8fe.JPG"
    ],
    [
      "https://cdn.poehali.dev/files/475d1fc5-71db-4437-8990-d067b0a25d0c.jpg",
      "https://cdn.poehali.dev/files/7928a4f1-9c7c-43fd-ab17-6babb6e37be7.JPG",
      "https://cdn.poehali.dev/files/a468393d-98fc-4692-934b-115e4be196ad.JPG",
      "https://cdn.poehali.dev/files/ce713e72-983e-416c-bc45-d51e637013a5.JPG",
      "https://cdn.poehali.dev/files/5dc59788-ab7e-495e-97d4-952d49b7306f.JPG",
      "https://cdn.poehali.dev/files/22192856-ed5b-412f-9622-18c712999ffa.JPG",
      "https://cdn.poehali.dev/files/ef3fe192-94c4-4d6a-871c-2420502aaa8f.JPG"
    ]
  ];

  const openGallery = (projectIndex: number) => {
    if (projectGalleries[projectIndex].length > 0) {
      setSelectedProject(projectIndex);
      setCurrentImageIndex(0);
    }
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject !== null) {
      setCurrentImageIndex((prev) => 
        prev < projectGalleries[selectedProject].length - 1 ? prev + 1 : prev
      );
    }
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsButtonSticky(heroBottom <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isButtonSticky={isButtonSticky}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        scrollToSection={scrollToSection}
      />
      
      <Hero />
      
      <ContentSections />
      
      <GallerySection 
        projectGalleries={projectGalleries}
        selectedProject={selectedProject}
        currentImageIndex={currentImageIndex}
        openGallery={openGallery}
        closeGallery={closeGallery}
        nextImage={nextImage}
        prevImage={prevImage}
      />
    </div>
  );
};

export default Index;
