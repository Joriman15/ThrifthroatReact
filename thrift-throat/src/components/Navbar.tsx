import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  link: string;
  type: string;
  name: string;
  price: number;
  size: string;
  measurement: string;
};

function Navbar() {
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const { cartItem, removeItem } = useCart();
  const cartCount = cartItem.length;

  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isOpen] = useState(true);

  const showNavbar = () => {
    navRef.current?.classList.toggle("responsive_nav");
  };

  const handleClick = () => {
    navigate("/checkout");
    setCartModalOpen(false);
  };

  // useEffect(() => {
  //   setIsOpen(window.location.pathname === "/products");
  // }, [window.location.pathname]);

  return (
    <>
      <header className="header-container">
        <div className="logo">
          <img src="../src/assets/images/logo2.png" width="50px" />
        </div>
        <nav ref={navRef}>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "activeNav" : "")}
                onClick={() => {
                  showNavbar();
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "activeNav" : "")}
                onClick={() => {
                  showNavbar();
                }}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) => (isActive ? "activeNav" : "")}
                onClick={() => {
                  showNavbar();
                }}
              >
                FAQs
              </NavLink>
            </li>
            {isOpen && (
              <div
                className="cartContainer"
                onClick={() => setCartModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8,3V7H21l-2,7H8v2H18a1,1,0,0,1,0,2H7a1,1,0,0,1-1-1V4H4A1,1,0,0,1,4,2H7A1,1,0,0,1,8,3ZM6,20.5A1.5,1.5,0,1,0,7.5,19,1.5,1.5,0,0,0,6,20.5Zm9,0A1.5,1.5,0,1,0,16.5,19,1.5,1.5,0,0,0,15,20.5Z" />
                </svg>
                <p className="amount">{cartCount}</p>
              </div>
            )}
          </ul>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars size={23} />
        </button>
      </header>

      {isCartModalOpen && (
        <div id="cartModal" className="modal">
          <span className="close" onClick={() => setCartModalOpen(false)}>
            &times;
          </span>
          <div className="modal-content-cart">
            {cartItem.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItem.map((product: Product) => (
                  <div
                    key={product.id}
                    className="cart-item"
                    style={{
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(product.id)}
                    >
                      &times;
                    </button>
                    <img
                      src={product.link}
                      alt={product.name}
                      className="cart-img"
                    />
                    <div className="cart-text">
                      <p>{product.name}</p>
                      <p>PHP {product.price}</p>
                      <p>Measurement: {product.measurement}</p>
                    </div>
                  </div>
                ))}
                <button
                  className="checkout-btn"
                  onClick={() => {
                    handleClick();
                    showNavbar();
                  }}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
