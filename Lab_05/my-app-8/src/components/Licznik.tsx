import React, { useState, useEffect } from "react";

const Licznik: React.FC = () => {
  const [liczba, setLiczba] = useState<number>(() => {
    const saved = localStorage.getItem("licznik-zad8");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("licznik-zad8", liczba.toString());
  }, [liczba]);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        maxWidth: "300px",
        margin: "20px auto",
        background: "#fff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ color: "#333" }}>Zadanie 8.1: Trwały Licznik</h3>
      <div style={{ fontSize: "3rem", color: "#007bff", margin: "15px 0" }}>
        {liczba}
      </div>
      <button
        onClick={() => setLiczba(liczba + 1)}
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Dodaj +1
      </button>
    </div>
  );
};

export default Licznik;
