import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

type Product = {
  id: number;
  link: string;
  type: string;
  name: string;
  price: number;
  size: string;
};
function CheckoutPage() {
  const { cartItem } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Info:", formData, cartItem);
    alert("Checkout submitted! We'll contact you soon.");
    setFormData({ name: "", contact: "", email: "", address: "" });

    // Optionally send data to backend or email service here
  };

  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>
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

        <label>
          Products to Buy:
          <textarea
            readOnly
            value={cartItem
              .map(
                (item: Product) =>
                  `• ${item.name} (Size: ${item.size}) - PHP ${item.price}`
              )
              .join("\n")}
          />
        </label>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
