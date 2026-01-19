import React from "react";
import Produkt from "./Produkt";

const NowyKoszyk: React.FC = () => {
  const Produkty = ["Jabłko", "Gruszka", "Śliwka", "Banan", "Pomarańcza"];

  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <h3>Zadanie 1.2: Nowy Koszyk</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {Produkty.map((nazwaProduktu, index) => (
          <Produkt key={index} nazwa={nazwaProduktu} />
        ))}
      </div>
    </div>
  );
};

export default NowyKoszyk;
