import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/sections/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductPage from "./components/sections/ProductPage";
import FaqsPage from "./components/sections/FaqsPage";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate an API call or data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <>
        <div className="loading-container">
          <span className="loading"></span>
          <p>Loading NG INA MO...</p>
        </div>
      </>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/page?:pageNumber" element={<ProductPage />} />
          <Route path="/faq" element={<FaqsPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
