import { useState } from "react";

function Home() {
  // Types for state
  interface ModalState {
    isOpen: boolean;
    currentIndex: number;
  }
  
  // Define image interface
  interface GalleryImage {
    id: number;
    src: string;
    alt: string;
  }
  
  // State for managing modal visibility and content
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    currentIndex: 0,
  });
  
  // State for mobile carousel
  const [mobileCarouselIndex, setMobileCarouselIndex] = useState<number>(0);

  // Function to open modal
  const openModal = (index: number): void => {
    setModalState({
      isOpen: true,
      currentIndex: index,
    });
  };

  // Function to close modal
  const closeModal = (): void => {
    setModalState({
      ...modalState,
      isOpen: false,
    });
  };
  
  // Modal navigation functions
  const nextImage = (): void => {
    setModalState((prev: ModalState) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % galleryImages.length,
    }));
  };
  
  const prevImage = (): void => {
    setModalState((prev: ModalState) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + galleryImages.length) % galleryImages.length,
    }));
  };
  
  // Mobile carousel navigation functions
  const nextMobileImage = (): void => {
    setMobileCarouselIndex((prev: number) => 
      (prev + 1) % galleryImages.length
    );
  };
  
  const prevMobileImage = (): void => {
    setMobileCarouselIndex((prev: number) => 
      (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  // Array of gallery images
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "/images/caps.jpg",
      alt: "A unique mix of vintage hats for every mood and moment.",
    },
    {
      id: 2,
      src: "/images/pants.jpg",
      alt: "Vintage pants in all styles, fits, and vibes — find your perfect pair.",
    },
    {
      id: 3,
      src: "/images/shirts.jpg",
      alt: "A mix of vintage tops with personality, pattern, and plenty of charm.",
    },
    {
      id: 4,
      src: "/images/shirts2.jpg",
      alt: "From bold prints to classic cuts — vintage shirts for every statement.",
    },
    {
      id: 5,
      src: "/images/poloshirt.jpg",
      alt: "Each shirt has a past. Ready to be part of yours.",
    },
  ];
  
  return (
    <>
      <div className="main-section">
        <div className="main-subsection">
          <h1 className="h1">Timeless Style, Secondhand Finds</h1>
          <h2 className="h2">
            Curated vintage treasures & unique pieces that tell a story —
            sustainably yours.
          </h2>

          <a href="#" className="btn">
            Shop
          </a>
        </div>
      </div>
      <section className="abt-section">
        <div className="abt-subsection">
          <h2 className="abt-title">About Thrifthroat</h2>
          <div className="logo">
            <img src="/images/logo.jpg" width="50px" />
          </div>
        </div>

        <div className="abt-comment">
          <p>
            We believe the past has style worth repeating. Our vintage thrift
            shop is all about giving pre-loved fashion and home goods a second
            life. Thoughtfully curated, sustainably sourced, and full of
            character — each piece is a find waiting to be found.
          </p>
        </div>
      </section>

      {/* Desktop Gallery View */}
      <div className="desktop-gallery">
        {galleryImages.map((image, index) => (
          <img
            id={`myImg${image.id}`}
            key={image.id}
            src={image.src}
            alt={image.alt}
            onClick={() => openModal(index)}
          />
        ))}
      </div>
      
      {/* Mobile Carousel View */}
      <div className="mobile-gallery">
        <div className="mobile-carousel">
          <button className="carousel-nav left" onClick={prevMobileImage}>
            &#10094;
          </button>
          
          <img
            src={galleryImages[mobileCarouselIndex].src}
            alt={galleryImages[mobileCarouselIndex].alt}
            onClick={() => openModal(mobileCarouselIndex)}
          />
          
          <button className="carousel-nav right" onClick={nextMobileImage}>
            &#10095;
          </button>
        </div>
        <div className="carousel-caption">
          {galleryImages[mobileCarouselIndex].alt}
        </div>
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <div id="myModal" className="modal">
          <span className="close" onClick={closeModal}>
            &times;
          </span>

          <button className="modal-nav left" onClick={prevImage}>
            &#10094;
          </button>

          <img
            className="modal-content-home"
            src={galleryImages[modalState.currentIndex].src}
            alt={galleryImages[modalState.currentIndex].alt}
          />
          
          <div id="caption">{galleryImages[modalState.currentIndex].alt}</div>
          
          <button className="modal-nav right" onClick={nextImage}>
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}

export default Home;