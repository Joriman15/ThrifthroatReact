import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header className="header-container">
        <div className="logo">
          <img src="../src/assets/images/logo.jpg" width="50px" />
        </div>
        <nav>
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
        </nav>
      </header>
    </>
  );
}

export default Navbar;
