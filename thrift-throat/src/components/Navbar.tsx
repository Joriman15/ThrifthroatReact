import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  const showNavbar = () => {
    navRef.current?.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header className="header-container">
        <div className="logo">
          <img src="/images/logo.jpg" width="50px" />
        </div>
        <nav ref={navRef}>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "activeNav" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "activeNav" : "")}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) => (isActive ? "activeNav" : "")}
              >
                FAQs
              </NavLink>
            </li>
          </ul>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </>
  );
}

export default Navbar;
