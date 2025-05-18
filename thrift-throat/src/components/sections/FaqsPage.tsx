import { useState, ReactNode } from "react";

type FAQ = {
  q: string;
  a: string | ReactNode;
};

function FaqsPage() {
  // index of the open panel, or null if none
  const [open, setOpen] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      q: "WHERE IS YOUR SHOP LOCATED? WHERE ARE YOU MAINLY LOCATED?",
      a: "‑ We currently do not have a shop. We are mainly located in Laguna.",
    },
    {
      q: "WHEN IS MY ORDER GETTING SHIPPED?",
      a: "‑ We process and give out the orders within 2‑4 days.",
    },
    {
      q: "HOW TO ORDER?",
      a: (
        <>
          Step&nbsp;1. Add items on your cart.
          <br />
          Step&nbsp;2. Fill‑up the order form on checkout.
          <br />
          Step&nbsp;3. Be ready to send a screenshot of your payment on{" "}
          <strong>sales@thrifthroat.com</strong>. Once confirmed, we will send
          the item(s) as soon as we can!
        </>
      ),
    },
    {
      q: "HOW ABOUT REFUNDS?",
      a: "‑ We do not accept returns. All images are given, if necessary, we can give you additional images about your chosen product.",
    },
    {
      q: "MINE? BIDDING? EARLY DIBS?",
      a: "‑ All products here are items that are beyond the bidding time and early dibs. Bidding and early dibs are concurrent on our Instagram.",
    },
  ];

  const toggle = (idx: number) => setOpen(open === idx ? null : idx);

  return (
    <div className="mainContentFAQ">
      <div className="lContent">
        <h1 className="FAQtitle">Thrifthroat FAQs</h1>

        {faqs.map(({ q, a }, idx) => (
          <div className="perFAQ" key={idx}>
            <button
              className={`QUESTION ${open === idx ? "active" : ""}`}
              onClick={() => toggle(idx)}
            >
              {q}
              <i className={`fa fa-${open === idx ? "minus" : "plus"}`} />
            </button>

            <div
              className="pannel"
              style={{ display: open === idx ? "block" : "none" }}
            >
              <p>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FaqsPage;
