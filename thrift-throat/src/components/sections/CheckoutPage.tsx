import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

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
// type Province = {
//   province: string;
// };

function CheckoutPage() {
  const navigate = useNavigate();
  const luzon = 54;
  const visayas = 69; //to change
  const mindanao = 74; //to change
  const [shippingFee, setShippingFee] = useState("");
  const { cartItem } = useCart();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    contact: "",
    email: "",
    address: "",
    pCode: "",
    city: "",
    province: "",
  });
  const phProvinces = [
    { province: "Abra", group: "luzon" },
    { province: "Agusan del Norte", group: "mindanao" },
    { province: "Agusan del Sur", group: "mindanao" },
    { province: "Aklan", group: "visayas" },
    { province: "Albay", group: "luzon" },
    { province: "Antique", group: "visayas" },
    { province: "Apayao", group: "luzon" },
    { province: "Aurora", group: "luzon" },
    { province: "Basilan", group: "mindanao" },
    { province: "Bataan", group: "luzon" },
    { province: "Batanes", group: "luzon" },
    { province: "Batangas", group: "luzon" },
    { province: "Benguet", group: "luzon" },
    { province: "Biliran", group: "visayas" },
    { province: "Bohol", group: "visayas" },
    { province: "Bukidnon", group: "mindanao" },
    { province: "Bulacan", group: "luzon" },
    { province: "Cagayan", group: "luzon" },
    { province: "Camarines Norte", group: "luzon" },
    { province: "Camarines Sur", group: "luzon" },
    { province: "Camiguin", group: "mindanao" },
    { province: "Capiz", group: "visayas" },
    { province: "Catanduanes", group: "luzon" },
    { province: "Cavite", group: "luzon" },
    { province: "Cebu", group: "visayas" },
    { province: "Cotabato", group: "mindanao" },
    { province: "Davao de Oro", group: "mindanao" },
    { province: "Davao del Norte", group: "mindanao" },
    { province: "Davao del Sur", group: "mindanao" },
    { province: "Davao Occidental", group: "mindanao" },
    { province: "Davao Oriental", group: "mindanao" },
    { province: "Dinagat Islands", group: "mindanao" },
    { province: "Eastern Samar", group: "visayas" },
    { province: "Guimaras", group: "visayas" },
    { province: "Ifugao", group: "luzon" },
    { province: "Ilocos Norte", group: "luzon" },
    { province: "Ilocos Sur", group: "luzon" },
    { province: "Iloilo", group: "visayas" },
    { province: "Isabela", group: "luzon" },
    { province: "Kalinga", group: "luzon" },
    { province: "La Union", group: "luzon" },
    { province: "Laguna", group: "luzon" },
    { province: "Lanao del Norte", group: "mindanao" },
    { province: "Lanao del Sur", group: "mindanao" },
    { province: "Leyte", group: "visayas" },
    { province: "Maguindanao del Norte", group: "mindanao" },
    { province: "Maguindanao del Sur", group: "mindanao" },
    { province: "Marinduque", group: "luzon" },
    { province: "Masbate", group: "luzon" },
    { province: "Metro Manila", group: "luzon" },
    { province: "Misamis Occidental", group: "mindanao" },
    { province: "Misamis Oriental", group: "mindanao" },
    { province: "Mountain Province", group: "luzon" },
    { province: "Negros Occidental", group: "visayas" },
    { province: "Negros Oriental", group: "visayas" },
    { province: "Northern Samar", group: "visayas" },
    { province: "Nueva Ecija", group: "luzon" },
    { province: "Nueva Vizcaya", group: "luzon" },
    { province: "Occidental Mindoro", group: "luzon" },
    { province: "Oriental Mindoro", group: "luzon" },
    { province: "Palawan", group: "luzon" },
    { province: "Pampanga", group: "luzon" },
    { province: "Pangasinan", group: "luzon" },
    { province: "Quezon", group: "luzon" },
    { province: "Quirino", group: "luzon" },
    { province: "Rizal", group: "luzon" },
    { province: "Romblon", group: "luzon" },
    { province: "Samar", group: "visayas" },
    { province: "Sarangani", group: "mindanao" },
    { province: "Siquijor", group: "visayas" },
    { province: "Sorsogon", group: "luzon" },
    { province: "South Cotabato", group: "mindanao" },
    { province: "Southern Leyte", group: "visayas" },
    { province: "Sultan Kudarat", group: "mindanao" },
    { province: "Sulu", group: "mindanao" },
    { province: "Surigao del Norte", group: "mindanao" },
    { province: "Surigao del Sur", group: "mindanao" },
    { province: "Tarlac", group: "luzon" },
    { province: "Tawi-Tawi", group: "mindanao" },
    { province: "Zambales", group: "luzon" },
    { province: "Zamboanga del Norte", group: "mindanao" },
    { province: "Zamboanga del Sur", group: "mindanao" },
    { province: "Zamboanga Sibugay", group: "mindanao" },
  ];
  const getGroup = (province: string): string => {
    let found = "";
    phProvinces.map((item) => {
      if (item.province == province) {
        found = item.group;
      }
    });
    console.log(found);
    return found;
  };
  const calculateFee = (province: string) => {
    if (cartItem.length >= 1 && cartItem.length <= 2) {
      //small
      if (getGroup(province) === "luzon")
        setShippingFee(luzon.toFixed(2).toString());
      else if (getGroup(province) === "visayas")
        setShippingFee(visayas.toFixed(2).toString());
      else if (getGroup(province) === "mindanao")
        setShippingFee(mindanao.toFixed(2).toString());
      else setShippingFee(""); // fallback if province not found
    } else if (cartItem.length >= 3 && cartItem.length <= 5) {
      //medium
      if (getGroup(province) === "luzon")
        setShippingFee((luzon + 21).toFixed(2).toString());
      else if (getGroup(province) === "visayas")
        setShippingFee((visayas + 21).toFixed(2).toString());
      else if (getGroup(province) === "mindanao")
        setShippingFee((mindanao + 21).toFixed(2).toString());
      else setShippingFee("");
    } else if (cartItem.length >= 6) {
      //large
      if (getGroup(province) === "luzon")
        setShippingFee((luzon + 50).toFixed(2).toString());
      else if (getGroup(province) === "visayas")
        setShippingFee((visayas + 50).toFixed(2).toString());
      else if (getGroup(province) === "mindanao")
        setShippingFee((mindanao + 50).toFixed(2).toString());
      else setShippingFee("");
    } else {
      setShippingFee("");
    }
  };

  const sanitizeInput = (str: string) => str.replace(/<[^>]*>?/gm, "").trim();
  const templateParams = {
    ...formData,
    cartItems: cartItem.map((item) => ({
      name: sanitizeInput(item.name),
      image_url: sanitizeInput(item.link),
      price: parseFloat(item.price.toFixed(2)),
      measurement: sanitizeInput(item.measurement),
    })),
    cost: {
      subTotal: cartItem.reduce((acc, item) => acc + item.price, 0).toFixed(2),
      shipping: shippingFee,
      total: (
        cartItem.reduce((acc, item) => acc + item.price, 0) +
          parseInt(shippingFee) ||
        cartItem.reduce((acc, item) => acc + item.price, 0)
      ).toFixed(2),
    },
    order_id: `#${Date.now()}`,
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      Swal.fire({
        icon: "error",
        title: "Please verify you're not a robot.",
        confirmButtonText: "Okay",
      });
      return;
    }

    console.log("Submitted Info:", templateParams);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank you! We'll email you shortly.",
      showConfirmButton: false,
      timer: 3000,
    });

    // send data to backend or email service here
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env
          .VITE_EMAILJS_TEMPLATE_ID1 /*for customer template_pn7fe5u*/,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => console.log("Order confirmed. Email sent to customer!"),
        () => console.log("Payment successful, but email failed.")
      );
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env
          .VITE_EMAILJS_TEMPLATE_ID2 /*for thrifthroat template_er69omt*/,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => console.log("Order confirmed. Email sent to Thrifthroat!"),
        () => console.log("Payment successful, but email failed.")
      );
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
    localStorage.setItem("totalPrice", templateParams.cost.total);
    localStorage.setItem("cartItems", "");
    navigate("/payment");
  };
  const handleProvinceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    calculateFee(e.target.value);
    console.log(shippingFee);
  };
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

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
            pattern="^(09|\+639)\d{9}$"
            title="Enter a valid PH number (09XXXXXXXXX or +639XXXXXXXXX)"
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
          Full Address:
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
              pattern="^\d{4}$"
              title="4-digit postal code"
              required
              value={formData.pCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <label>
          Province:
          <select name="province" onChange={handleProvinceChange} required>
            <option value="">Select Province</option>
            {phProvinces.map((p, idx) => (
              <option key={idx} value={p.province}>
                {p.province}
              </option>
            ))}
          </select>
        </label>
        <ReCAPTCHA
          sitekey={siteKey}
          onChange={(token) => setCaptchaToken(token)}
          theme="light"
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <div className="previewContainer">
        <ul>
          {cartItem.map((item: Product, index: number) => (
            <li className="productItem" key={index}>
              <img className="productPreview" src={item.link} alt={item.name} />
              <span>
                <strong>{item.name}</strong> (Size: {item.size}) – PHP{" "}
                {item.price}
              </span>
            </li>
          ))}
        </ul>
        <div className="costSummary">
          <div className="subTotalContainer">
            <h3 className="subTotalLabel">Subtotal</h3>
            <p className="subTotal">{templateParams.cost.subTotal}</p>
          </div>
          <div className="shippingcontainer">
            <h3 className="shippingLabel">Shipping</h3>
            <p className="shippingFee">{shippingFee}</p>
          </div>
          <div className="totalContainer">
            <h3 className="totalLabel">Total</h3>
            <p className="totalFee">{templateParams.cost.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
