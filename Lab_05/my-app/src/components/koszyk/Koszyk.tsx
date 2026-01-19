import React from "react";
import Produkt from "./Produkt";

const Koszyk: React.FC = () => {
  const Produkty = ["Jabłko", "Gruszka", "Śliwka", "Banan", "Pomarańcza"];

  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <h3>Zadanie 1.1: Koszyk</h3>
      {Produkty.map((item, index) => (
        <Produkt key={index} nazwa={item} />
      ))}
    </div>
  );
};

export default Koszyk;
