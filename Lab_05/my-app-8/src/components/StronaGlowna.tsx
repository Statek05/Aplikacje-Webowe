import React from "react";
import { Link } from "react-router-dom";

const StronaGlowna: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ color: "#2c3e50", fontSize: "3rem" }}>
        Witaj na moim Blogu!
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#7f8c8d" }}>
        To jest aplikacja stworzona w ramach Zadania 8.
      </p>
      <div style={{ marginTop: "30px" }}>
        <Link
          to="/blog"
          style={{
            textDecoration: "none",
            background: "#27ae60",
            color: "white",
            padding: "15px 30px",
            borderRadius: "30px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(39, 174, 96, 0.4)",
          }}
        >
          Przejdź do Bloga →
        </Link>
      </div>
    </div>
  );
};
export default StronaGlowna;
