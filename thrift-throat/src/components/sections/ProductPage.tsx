import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const productsPerPage = 6; // Number of products per page

  const products = [
    {
      id: 1,
      link: "../src/assets/images/cap1.jpg",
      productType: "cap",
      name: "Ralph Lauren",
      price: 600,
    },
    {
      id: 2,
      link: "../src/assets/images/cap2.jpg",
      productType: "cap",
      name: "Vintage Disney",
      price: 400,
    },
    {
      id: 3,
      link: "../src/assets/images/cap3.jpg",
      productType: "cap",
      name: "Vintage Vans",
      price: 500,
    },
    {
      id: 4,
      link: "../src/assets/images/cap4.jpg",
      productType: "cap",
      name: "Thrasher Dad Hat",
      price: 650,
    },
    {
      id: 5,
      link: "../src/assets/images/cap5.jpg",
      productType: "cap",
      name: "New Era C.",
      price: 500,
    },
    {
      id: 6,
      link: "../src/assets/images/jacket3.jpg",
      productType: "cap",
      name: "Nike 22x27.5",
      price: 600,
    },
    {
      id: 7,
      link: "../src/assets/images/jacket2.jpg",
      productType: "cap",
      name: "Adidas 21.5x27.5",
      price: 550,
    },
    {
      id: 8,
      link: "../src/assets/images/jack2.jpg",
      productType: "cap",
      name: "Marlboro 26x30",
      price: 800,
    },
    {
      id: 9,
      link: "../src/assets/images/jacket4.jpg",
      productType: "cap",
      name: "Champion 20x25.5",
      price: 600,
    },
    {
      id: 10,
      link: "../src/assets/images/jack1.jpg",
      productType: "cap",
      name: "Nike 26x29",
      price: 1000,
    },
    {
      id: 11,
      link: "../src/assets/images/jack3.jpg",
      productType: "cap",
      name: "Bapesta 25x30",
      price: 600,
    },
    {
      id: 12,
      link: "../src/assets/images/ll1.jpg",
      productType: "cap",
      name: "The Mountain 25x34",
      price: 600,
    },
  ];

  // Get current page from URL query parameter or default to 1
  const getCurrentPage = () => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page") || "1", 10);
    return page;
  };

  const currentPage = getCurrentPage();
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get current products based on pagination
  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const currentProducts = getCurrentProducts();

  // Handle pagination click
  const handlePageChange = (newPage: number): void => {
    // Update URL with new page number without changing component
    if (currentPage != newPage) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      navigate(`/products?page=${newPage}`);
    }
  };

  // Generate pagination buttons
  const renderPagination = () => {
    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
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
      <div className="paginationContainer">
        <h1>Page {currentPage}</h1>
      </div>

      <section className="mainContentProductPage">
        <div className="productRow">
          {/* <!-- Each product row contains info of 4 elements --> */}
          {currentProducts.map((product) => (
            <div key={product.id} className="productInfoContainer">
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

              {/* <button>Add to Cart</button> */}
            </div>
          ))}
        </div>
      </section>
      {renderPagination()}
    </>
  );

  //         <div className="productRow">
  //           {/* <!-- Each product row contains info of 4 elements --> */}
  //           <article className="productInfoContainer">
  //             {/* <!-- Each individual product description --> */}
  //             <div className="productImageContainer">
  //               <img
  //                 className="productImage"
  //                 alt="sample"
  //                 src="../src/assets/images/jacket4.jpg"
  //               />
  //             </div>
  //             <div className="productInfo">
  //               <p className="price">PHP 600</p>
  //               <p className="productContent">Champion 20x25.5</p>
  //             </div>
  //           </article>
  //           <article className="productInfoContainer">
  //             {/* <!-- Each individual product description --> */}
  //             <div className="productImageContainer">
  //               <img
  //                 className="productImage"
  //                 alt="sample"
  //                 src="../src/assets/images/jack1.jpg"
  //               />
  //             </div>
  //             <div className="productInfo">
  //               <p className="price">PHP 1000</p>
  //               <p className="productContent">Nike 26x29</p>
  //             </div>
  //           </article>
  //           <article className="productInfoContainer">
  //             {/* <!-- Each individual product description --> */}
  //             <div className="productImageContainer">
  //               <img
  //                 className="productImage"
  //                 alt="sample"
  //                 src="../src/assets/images/jack3.jpg"
  //               />
  //             </div>
  //             <div className="productInfo">
  //               <p className="price">PHP 600</p>
  //               <p className="productContent">Bapesta 25x30</p>
  //             </div>
  //           </article>
  //           <article className="productInfoContainer">
  //             {/* <!-- Each individual product description --> */}
  //             <div className="productImageContainer">
  //               <img
  //                 className="productImage"
  //                 alt="sample"
  //                 src="../src/assets/images/ll1.jpg"
  //               />
  //             </div>
  //             <div className="productInfo">
  //               <p className="price">PHP600</p>
  //               <p className="productContent">The Mountain 25x34</p>
  //             </div>
  //           </article>
  //         </div>
  //       </section>
  //     </>
  //   );
}

export default ProductPage;
