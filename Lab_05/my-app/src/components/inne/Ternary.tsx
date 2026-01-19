import React, { useState } from "react";

const Aktualizacja: React.FC = () => {
  const [produkt, setProdukt] = useState({ nazwa: "Pomidor", cena: 50 });

  const zmienCene = () => {
    setProdukt((prev) => ({
      ...prev,
      cena: 100,
    }));
  };

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 4.1</h3>
      <div>
        Aktualnie {produkt.nazwa} kosztuje {produkt.cena}
      </div>
      <button onClick={zmienCene} style={{ marginTop: "10px" }}>
        Zmień cenę
      </button>
    </div>
  );
};

export default Aktualizacja;
