// THIS IS FOR THE LANDING PAGE OR HOME PAGE
import caps from '../../assets/images/caps.jpg';
import pants from '../../assets/images/pants.jpg';
import shirts from '../../assets/images/shirts.jpg';
import shirts2 from '../../assets/images/shirts2.jpg';
import poloshirt from '../../assets/images/poloshirt.jpg';
import logo from '../../assets/images/logo.jpg';

import { useState } from "react";

function Home() {
  // State for managing modal visibility and content
  const [modalState, setModalState] = useState({
    isOpen: false,
    currentImage: "",
    currentCaption: "",
  });

  // Function to open modal
  const openModal = (src: any, alt: any) => {
    setModalState({
      isOpen: true,
      currentImage: src,
      currentCaption: alt,
    });
  };

  // Function to close modal
  const closeModal = () => {
    setModalState({
      ...modalState,
      isOpen: false,
    });
  };

  // Array of gallery images
  const galleryImages = [
    {
      id: 1,
      src: caps,
      alt: "A unique mix of vintage hats for every mood and moment.",
    },
    {
      id: 2,
      src: pants,
      alt: "Vintage pants in all styles, fits, and vibes — find your perfect pair.",
    },
    {
      id: 3,
      src: shirts,
      alt: "A mix of vintage tops with personality, pattern, and plenty of charm.",
    },
    {
      id: 4,
      src: shirts2,
      alt: "From bold prints to classic cuts — vintage shirts for every statement.",
    },
    {
      id: 5,
      src: poloshirt,
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
            <img src={logo} width="50px" />
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

      <div className="gallery">
        {galleryImages.map((image) => (
          <img
            id={`myImg${image.id}`}
            key={image.id}
            src={image.src}
            alt={image.alt}
            onClick={() => openModal(image.src, image.alt)}
          />
        ))}

        {/* Modal */}
        {modalState.isOpen && (
          <div id="myModal" className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              className="modal-content"
              src={modalState.currentImage}
              alt="gallery item"
            />
            <div id="caption">{modalState.currentCaption}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
