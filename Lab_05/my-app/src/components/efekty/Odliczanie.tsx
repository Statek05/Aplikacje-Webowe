import React, { useState, useEffect } from "react";

const Odliczanie: React.FC = () => {
  const [licznik, setLicznik] = useState(15.0);
  const [aktywne, setAktywne] = useState(false);

  const zakonczone = licznik <= 0;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (aktywne && licznik > 0) {
      interval = setInterval(() => {
        setLicznik((prev) => {
          if (prev <= 0.1) {
            setAktywne(false);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [aktywne, licznik]);

  const toggleStart = () => {
    setAktywne(!aktywne);
  };

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 6.3: Odliczanie</h3>
      <div style={{ fontSize: "20px", fontWeight: "bold", margin: "10px 0" }}>
        {licznik.toFixed(1)} sek
      </div>
      <button onClick={toggleStart} disabled={zakonczone}>
        {zakonczone ? "Odliczanie zakończone" : aktywne ? "STOP" : "START"}
      </button>
    </div>
  );
};

export default Odliczanie;
