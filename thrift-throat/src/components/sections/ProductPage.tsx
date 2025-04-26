import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../Filter";
import { useEffect, useState } from "react";
import LoadingPage from "../loadingPage";
function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const productsPerPage = 8; // Number of products per page
  const [currentFrom, setCurrentFrom] = useState("0");
  const [currentTo, setCurrentTo] = useState("5000");
  const [currentOrder, setCurrentOrder] = useState("ascending");
  const [currentCategory, setCurrentCategory] = useState(["Cap"]);
  const [filteredProducts, setFilteredProducts] = useState([
    {
      id: 1,
      link: "",
      type: "",
      name: "",
      price: 0,
      size: "",
    },
  ]);
  const products = [
    {
      id: 1,
      link: "../src/assets/images/cap1.jpg",
      type: "cap",
      name: "Ralph Lauren",
      price: 600,
      size: "MEDIUM",
    },
    {
      id: 2,
      link: "../src/assets/images/cap2.jpg",
      type: "cap",
      name: "Vintage Disney",
      price: 400,
      size: "MEDIUM",
    },
    {
      id: 3,
      link: "../src/assets/images/cap3.jpg",
      type: "cap",
      name: "Vintage Vans",
      price: 500,
      size: "MEDIUM",
    },
    {
      id: 4,
      link: "../src/assets/images/cap4.jpg",
      type: "cap",
      name: "Thrasher Dad Hat",
      price: 650,
      size: "MEDIUM",
    },
    {
      id: 5,
      link: "../src/assets/images/cap5.jpg",
      type: "cap",
      name: "New Era C.",
      price: 500,
      size: "MEDIUM",
    },
    {
      id: 6,
      link: "../src/assets/images/jacket3.jpg",
      type: "jacket",
      name: "Nike 22x27.5",
      price: 600,
      size: "MEDIUM",
    },
    {
      id: 7,
      link: "../src/assets/images/jacket2.jpg",
      type: "jacket",
      name: "Adidas 21.5x27.5",
      price: 550,
      size: "MEDIUM",
    },
    {
      id: 8,
      link: "../src/assets/images/jack2.jpg",
      type: "jacket",
      name: "Marlboro 26x30",
      price: 800,
      size: "MEDIUM",
    },
    {
      id: 9,
      link: "../src/assets/images/jacket4.jpg",
      type: "jacket",
      name: "Champion 20x25.5",
      price: 600,
      size: "MEDIUM",
    },
    {
      id: 10,
      link: "../src/assets/images/jack1.jpg",
      type: "jacket",
      name: "Nike 26x29",
      price: 1000,
      size: "MEDIUM",
    },
    {
      id: 11,
      link: "../src/assets/images/jack3.jpg",
      type: "jacket",
      name: "Bapesta 25x30",
      price: 600,
      size: "MEDIUM",
    },
    {
      id: 12,
      link: "../src/assets/images/ll1.jpg",
      type: "shirt",
      name: "The Mountain 25x34",
      price: 600,
      size: "MEDIUM",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
      console.log("params=", params);
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
                    />
                  </div>
                  <div className="productInfo">
                    <p className="productContent">{product.name}</p>
                    <p className="price">PHP {product.price}</p>
                  </div>
                </div>
                <div className="card-back">
                  <div className="productInfo">
                    <p className="productContent">
                      {product.type.toUpperCase()}
                    </p>
                    <p className="productContent">{product.size}</p>
                  </div>
                </div>
              </div>

              {/* <button>Add to Cart</button> */}
            </div>
          ))}
        </div>
      </section>
      {renderPagination()}
    </>
  );
}

export default ProductPage;
