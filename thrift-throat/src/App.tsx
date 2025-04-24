import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/sections/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductPage from "./components/sections/ProductPage";
import FaqsPage from "./components/sections/FaqsPage";
function App() {
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
    </BrowserRouter>
  );
}

export default App;
