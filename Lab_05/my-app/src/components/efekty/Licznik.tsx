import React, { useState, useEffect } from "react";

const Licznik: React.FC = () => {
  const [liczba, setLiczba] = useState<number>(0);

  const dodaj = () => {
    setLiczba(liczba + 1);
  };

  useEffect(() => {
    console.log("Hello world");
  }, []);

  useEffect(() => {
    console.log("Licznik zwiększył się do " + liczba);
  }, [liczba]);

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 6.1: Licznik </h3>
      <div>Stan: {liczba}</div>
      <button onClick={dodaj}>Dodaj</button>
      <p style={{ fontSize: "12px", color: "gray" }}></p>
    </div>
  );
};

export default Licznik;
