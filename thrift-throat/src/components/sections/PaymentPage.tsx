import Gcash from "../Gcash";
import { useEffect, useState } from "react";

function PaymentPage() {
  const [totalPrice, setTotalPrice] = useState("");
  useEffect(() => {
    setTotalPrice(localStorage.getItem(totalPrice) || "");
  }, []);

  return (
    <>
      <div className="paymentContainer">
        <p className="confirmTitle">Thank you! Your order is confirmed!</p>
        <p className="paymentEmail">
          <strong> *Important* </strong>
          E-mail us a photo/screenshot at <strong>
            sales@thrifthroat.com
          </strong>{" "}
          within 24 HOURS for us to proceed with the shipment of your order.
          {totalPrice}
        </p>
        <div className="paymentDetails">
          <p className="paymentLabel">PAYMENT DETAILS:</p>
          <Gcash />
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
