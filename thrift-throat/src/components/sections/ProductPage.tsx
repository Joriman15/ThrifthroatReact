import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../Filter";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import Modal from "../Modal";

interface Product {
  id: number;
  link: string;
  type: string;
  name: string;
  price: number;
  size: string;
  extraImages: string[];
  measurement: string;
  brandModel: string;
}

function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveItem } = useCart();
  const productsPerPage = 8; // Number of products per page
  const [currentFrom, setCurrentFrom] = useState("0");
  const [currentTo, setCurrentTo] = useState("5000");
  const [currentOrder, setCurrentOrder] = useState("ascending");
  const [currentCategory, setCurrentCategory] = useState<string[]>([]);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMeasurement, setModalMeasurement] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [modalBrandModel, setModalBrandModel] = useState("");
  const [modalSizes, setModalSizes] = useState("");

  const openModal = (
    images: string[],
    price: string,
    brandModel: string,
    measurement: string,
    sizes: string
  ) => {
    const imagesToShow = images.length > 0 && images[0] !== "" ? images : [];
    setModalImages(imagesToShow);
    setModalMeasurement(measurement);
    setModalBrandModel(brandModel);
    setModalPrice(price);
    setModalSizes(sizes);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
  };

  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);

  const products: Product[] = [
    {
      id: 1,
      link: "/images/cap1.jpg",
      type: "cap",
      name: "Ralph Lauren",
      price: 600,
      size: "MEDIUM",
      extraImages: ["/images/cap1.jpg", "/images/cap2.jpg"],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 2,
      link: "/images/cap2.jpg",
      type: "cap",
      name: "Vintage Disney",
      price: 400,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 3,
      link: "/images/cap3.jpg",
      type: "cap",
      name: "Vintage Vans",
      price: 500,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 4,
      link: "/images/cap4.jpg",
      type: "cap",
      name: "Thrasher Dad Hat",
      price: 650,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 5,
      link: "/images/cap5.jpg",
      type: "cap",
      name: "New Era C.",
      price: 500,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 6,
      link: "/images/jacket3.jpg",
      type: "jacket",
      name: "Nike 22x27.5",
      price: 600,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 7,
      link: "/images/jacket2.jpg",
      type: "jacket",
      name: "Adidas 21.5x27.5",
      price: 550,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 8,
      link: "/images/jack2.jpg",
      type: "jacket",
      name: "Marlboro 26x30",
      price: 800,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 9,
      link: "/images/jacket4.jpg",
      type: "jacket",
      name: "Champion 20x25.5",
      price: 600,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 10,
      link: "/images/jack1.jpg",
      type: "jacket",
      name: "Nike 26x29",
      price: 1000,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 11,
      link: "/images/jack3.jpg",
      type: "jacket",
      name: "Bapesta 25x30",
      price: 600,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
    {
      id: 12,
      link: "/images/ll1.jpg",
      type: "shirt",
      name: "The Mountain 25x34",
      price: 600,
      size: "MEDIUM",
      extraImages: [""],
      measurement: "malaki",
      brandModel: "lacost",
    },
  ];

  useEffect(() => {
    filterProducts(getCurrentPage());
  }, [location.search]);

  const filterProducts = (page: number) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page.toString());
    const from = parseInt(queryParams.get("from") || currentFrom);
    const to = parseInt(queryParams.get("to") || currentTo);
    const order = queryParams.get("sort") || currentOrder;
    // Get all category params (e.g., ?category=cap&category=jacket)
    const categoryParams = queryParams.getAll("category") || currentCategory;
    let tempProducts = products.filter((product) => {
      const inPriceRange = product.price >= from && product.price <= to;
      const inCategory =
        categoryParams.length === 0 || categoryParams.includes(product.type);

      return inPriceRange && inCategory;
    });
    if (order == "ascending") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(tempProducts);
    setCurrentFrom(from.toString());
    setCurrentTo(to.toString());
    setCurrentOrder(order);
    setCurrentCategory(categoryParams);
    handlePageChange(queryParams);
  };

  // Get current page from URL query parameter or default to 1
  const getCurrentPage = () => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page") || "1", 10);
    return page;
  };

  const currentPage = getCurrentPage();
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get current products based on pagination
  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const currentProducts = getCurrentProducts();

  // Handle pagination click
  const handlePageChange = (params: URLSearchParams): void => {
    // Update URL with new page number without changing component
    if (currentPage != parseInt(params.get("page") || "1", 10)) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      navigate(`/products?${params}`);
    }
  };

  // Generate pagination buttons
  const renderPagination = () => {
    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => filterProducts(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  const saveCartItems = (item: Product) => {
    saveItem([item]);
  };

  return (
    <>
      <section className="mainContentProductPage">
        <Filter></Filter>
        <div className="productRow">
          {/* Each product row contains info of 4 elements (on pc)*/}
          {currentProducts.map((product) => (
            <div key={product.id} className="productInfoContainer">
              <div className="card-inner">
                <div className="card-front">
                  <div className="productImageContainer">
                    <img
                      className="productImage"
                      alt="product"
                      src={product.link}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(
                          product.extraImages && product.extraImages.length > 0
                            ? product.extraImages
                            : [product.link],
                          product.price.toString() || "",
                          product.brandModel || "",
                          product.measurement || "",
                          product.size || ""
                        );
                      }}
                    />
                  </div>
                  <div className="productInfo">
                    <p className="productContent">{product.name}</p>
                    <p className="price">PHP {product.price}</p>
                  </div>
                </div>
              </div>
              <div className="buttonContainer">
                <button
                  className="addCart"
                  onClick={() => saveCartItems(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {renderPagination()}
      {isModalOpen && (
        <Modal
          images={modalImages}
          price={modalPrice}
          brandModel={modalBrandModel}
          measurement={modalMeasurement}
          size={modalSizes}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default ProductPage;
