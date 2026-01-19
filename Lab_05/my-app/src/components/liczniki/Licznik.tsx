import React, { useState } from "react";

const Licznik: React.FC = () => {
  const [liczba, setLiczba] = useState<number>(0);

  const dodaj = () => {
    setLiczba(liczba + 1);
  };

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 2.1: Licznik</h3>
      <div>Stan licznika: {liczba}</div>
      <button onClick={dodaj}>Dodaj</button>
    </div>
  );
};

export default Licznik;
