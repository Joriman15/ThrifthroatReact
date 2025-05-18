import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/sections/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductPage from "./components/sections/ProductPage";
import FaqsPage from "./components/sections/FaqsPage";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import LoadingPage from "./components/LoadingPage";
import CheckoutPage from "./components/sections/CheckoutPage";
import PaymentPage from "./components/sections/PaymentPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2100);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (!loading) body.classList.add("app-ready");
    else body.classList.remove("app-ready");
  }, [loading]);

  return (
    <BrowserRouter>
      <div className="main">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/faq" element={<FaqsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
        <Footer />
      </div>
      <LoadingPage />
    </BrowserRouter>
  );
}

export default App;
