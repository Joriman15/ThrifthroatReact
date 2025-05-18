import React, { useState } from "react";

interface ModalProps {
  images: string[];
  price: string;
  brandModel: string;
  measurement: string;
  size: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  images,
  price,
  brandModel,
  measurement,
  size,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <div className="modal-body">
          <div className="modal-image-section">
            <button className="modal-arrow left" onClick={goLeft}>
              {"<"}
            </button>

            <div className="modal-image-wrapper">
              <img
                src={images[currentIndex]}
                alt="Product view"
                className="modal-image"
              />
            </div>

            <button className="modal-arrow right" onClick={goRight}>
              {">"}
            </button>
          </div>
          <div className="modal-description">
            <h3>Price:</h3> <p>{price || "No price available"}</p>
            <h3>Brand/Model:</h3>{" "}
            <p>{brandModel || "No brand/model available"}</p>
            <h3>Measurement:</h3>{" "}
            <p>{measurement || "No measurement available"}</p>
            <h3>Size:</h3>
            <p>{size || "No size available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
