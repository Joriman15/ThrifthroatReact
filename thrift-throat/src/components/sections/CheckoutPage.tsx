import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";



type Product = {
  id: number;
  link: string;
  type: string;
  name: string;
  price: number;
  size: string;
  extraImages: string[];
  measurement: string;
  brandModel: string;
};
type Province = {
  province: string;
};
function CheckoutPage() {
  const { cartItem } = useCart();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    contact: "",
    email: "",
    address: "",
    pCode: "",
    city: "",
    province: "Abra",
  });

  const phProvinces = [
    { province: "Abra" },
    { province: "Agusan del Norte" },
    { province: "Agusan del Sur" },
    { province: "Aklan" },
    { province: "Albay" },
    { province: "Antique" },
    { province: "Apayao" },
    { province: "Aurora" },
    { province: "Basilan" },
    { province: "Bataan" },
    { province: "Batanes" },
    { province: "Batangas" },
    { province: "Benguet" },
    { province: "Biliran" },
    { province: "Bohol" },
    { province: "Bukidnon" },
    { province: "Bulacan" },
    { province: "Cagayan" },
    { province: "Camarines Norte" },
    { province: "Camarines Sur" },
    { province: "Camiguin" },
    { province: "Capiz" },
    { province: "Catanduanes" },
    { province: "Cavite" },
    { province: "Cebu" },
    { province: "Cotabato" },
    { province: "Davao de Oro" },
    { province: "Davao del Norte" },
    { province: "Davao del Sur" },
    { province: "Davao Occidental" },
    { province: "Davao Oriental" },
    { province: "Dinagat Islands" },
    { province: "Eastern Samar" },
    { province: "Guimaras" },
    { province: "Ifugao" },
    { province: "Ilocos Norte" },
    { province: "Ilocos Sur" },
    { province: "Iloilo" },
    { province: "Isabela" },
    { province: "Kalinga" },
    { province: "La Union" },
    { province: "Laguna" },
    { province: "Lanao del Norte" },
    { province: "Lanao del Sur" },
    { province: "Leyte" },
    { province: "Maguindanao del Norte" },
    { province: "Maguindanao del Sur" },
    { province: "Marinduque" },
    { province: "Masbate" },
    { province: "Misamis Occidental" },
    { province: "Misamis Oriental" },
    { province: "Mountain Province" },
    { province: "Negros Occidental" },
    { province: "Negros Oriental" },
    { province: "Northern Samar" },
    { province: "Nueva Ecija" },
    { province: "Nueva Vizcaya" },
    { province: "Occidental Mindoro" },
    { province: "Oriental Mindoro" },
    { province: "Palawan" },
    { province: "Pampanga" },
    { province: "Pangasinan" },
    { province: "Quezon" },
    { province: "Quirino" },
    { province: "Rizal" },
    { province: "Romblon" },
    { province: "Samar" },
    { province: "Sarangani" },
    { province: "Siquijor" },
    { province: "Sorsogon" },
    { province: "South Cotabato" },
    { province: "Southern Leyte" },
    { province: "Sultan Kudarat" },
    { province: "Sulu" },
    { province: "Surigao del Norte" },
    { province: "Surigao del Sur" },
    { province: "Tarlac" },
    { province: "Tawi-Tawi" },
    { province: "Zambales" },
    { province: "Zamboanga del Norte" },
    { province: "Zamboanga del Sur" },
    { province: "Zamboanga Sibugay" },
  ];
  const templateParams = {
    ...formData,
    cartItems: cartItem.map((item) => ({
      name: item.name,
      image_url: item.link,
      price: item.price.toFixed(2),
      measurement: item.measurement,
    })),
    cost: {
      shipping: "0.00", // Change if you calculate it
      tax: "0.00", // Change if needed
      total: cartItem.reduce((acc, item) => acc + item.price, 0).toFixed(2),
    },
    order_id: `#${Date.now()}`,
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Info:", templateParams);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank you! We'll email you shortly.",
      showConfirmButton: false,
      timer:3000
    })
    setFormData({
      fName: "",
      lName: "",
      contact: "",
      email: "",
      address: "",
      pCode: "",
      city: "",
      province: "",
    });

    // Optionally send data to backend or email service here
    emailjs
      .send(
        "service_rcdsnpj",
        "template_pn7fe5u",
        templateParams,
        "6GD3-i3vkdJarmApx"
      )
      .then(
        () => alert("Order confirmed. Email sent!"),
        () => alert("Payment successful, but email failed.")
      );
    emailjs
      .send(
        "service_rcdsnpj",
        "template_er69omt",
        templateParams,
        "6GD3-i3vkdJarmApx"
      )
      .then(
        () => alert("Order confirmed. Email sent!"),
        () => alert("Payment successful, but email failed.")
      );
  };

  return (
    <div className="checkout-container">
      
      <form onSubmit={handleSubmit} className="checkout-form">
       
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fName">First Name:</label>
            <input
              type="text"
              id="fName"
              name="fName"
              required
              value={formData.fName}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lName">Last Name:</label>
            <input
              type="text"
              id="lName"
              name="lName"
              required
              value={formData.lName}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <label>
          Contact Number:
          <input
            type="tel"
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
          />
        </label>
        <label>
          Email Address:
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Home Address:
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="pCode">Postal Code:</label>
            <input
              type="text"
              id="pCode"
              name="pCode"
              required
              value={formData.pCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <label>
          Province:
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
          >
            {phProvinces.map((selection: Province, idx) => (
              <option key={idx} value={selection.province}>
                {selection.province}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
       
        <div className="previewContainer">
          <ul>
            {cartItem.map((item: Product, index: number) => (
              <li className="productItem" key={index}>
                <img
                  className="productPreview"
                  src={item.link}
                  alt={item.name}
                />
                <span>
                  <strong>{item.name}</strong> (Size: {item.size}) – PHP{" "}
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
          </div>
          
        
    </div>
      
      
   
  );
}

export default CheckoutPage;
