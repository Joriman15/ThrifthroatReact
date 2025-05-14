import Gcash from "../Gcash";

function PaymentPage() {
  return (
    <>
      <div className="paymentContainer">
        <p>Your order is confirmed</p>
        <br></br>
        <div className="paymentDetails">
          <p className="paymentLabel">PAYMENT DETAILS:</p>
          <br></br>
          <Gcash />
        </div>
      </div>
      <br></br>
      <p>
        *Kindly e-mail us a photo/screenshot at sales@thrifthroat.com within 24
        HOURS for us to proceed with the shipment of your order.
      </p>
    </>
  );
}

export default PaymentPage;
