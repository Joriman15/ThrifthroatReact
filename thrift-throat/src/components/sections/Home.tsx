// THIS IS FOR THE LANDING PAGE OR HOME PAGE

function Home() {
  return (
    <>
      <div className="main-section">
        <div className="main-subsection">
          <h1 className="h1">Timeless Style, Secondhand Finds</h1>
          <h2 className="h2">
            Curated vintage treasures & unique pieces that tell a story —
            sustainably yours.
          </h2>

          <a href="#" className="btn">
            Shop
          </a>
        </div>
      </div>
      <section className="abt-section">
        <div className="abt-subsection">
          <h2 className="abt-title">About Thrifthroat</h2>
          <div className="logo">
            <img src="../src/assets/images/logo.jpg" width="50px" />
          </div>
        </div>

        <h4 className="abt-comment">
          We believe the past has style worth repeating. Our vintage thrift shop
          is all about giving pre-loved fashion and home goods a second life.
          Thoughtfully curated, sustainably sourced, and full of character —
          each piece is a find waiting to be found.
        </h4>
      </section>
    </>
  );
}

export default Home;
