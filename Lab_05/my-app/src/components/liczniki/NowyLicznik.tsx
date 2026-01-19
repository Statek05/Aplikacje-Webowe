import React, { useState } from "react";
import Przycisk from "./Przycisk";

const NowyLicznik: React.FC = () => {
  const [liczba, setLiczba] = useState<number>(0);

  const inkrementuj = () => {
    setLiczba(liczba + 1);
  };

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 2.2: Nowy Licznik</h3>
      <div>Stan licznika: {liczba}</div>
      <Przycisk dodaj={inkrementuj} />
    </div>
  );
};

export default NowyLicznik;
