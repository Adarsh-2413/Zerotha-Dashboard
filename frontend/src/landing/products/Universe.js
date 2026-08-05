import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <div style={{ minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="images/smallcaseLogo.png" alt="Smallcase" style={{ maxHeight: "60px", objectFit: "contain" }} />
          </div>
          <p className="text-small text-muted mt-3">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="images/streakLogo.png" alt="Streak" style={{ maxHeight: "60px", objectFit: "contain" }} />
          </div>
          <p className="text-small text-muted mt-3">Algo & strategy platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="images/sensibullLogo.svg" alt="Sensibull" style={{ maxHeight: "60px", objectFit: "contain" }} />
          </div>
          <p className="text-small text-muted mt-3">Options trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="images/zerodhaFundhouse.png" alt="Zerodha Fundhouse" style={{ maxHeight: "60px", objectFit: "contain" }} />
          </div>
          <p className="text-small text-muted mt-3">Asset management </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="images/goldenpiLogo.png" alt="Goldenpi" style={{ maxHeight: "60px", objectFit: "contain" }} />
          </div>
          <p className="text-small text-muted mt-3">Bonds trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="images/dittoLogo.png" alt="Ditto" style={{ maxHeight: "60px", objectFit: "contain" }} />
          </div>
          <p className="text-small text-muted mt-5">Insurence</p>
        </div>
        
        <button
          className="p-2 btn btn-primary fs-5 mb-5 mt-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;