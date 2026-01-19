import React, { useState } from "react";

const Haslo: React.FC = () => {
  const [haslo, setHaslo] = useState<string>("");
  const [powtorzHaslo, setPowtorzHaslo] = useState<string>("");

  const getMessage = () => {
    if (!haslo && !powtorzHaslo) {
      return "Proszę wprowadzić hasło";
    }
    if (haslo !== powtorzHaslo) {
      return "Hasła nie są zgodne";
    }
    return "";
  };

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 3.2: Walidacja hasła</h3>
      <div>
        Hasło:{" "}
        <input
          type="text"
          value={haslo}
          onChange={(e) => setHaslo(e.target.value)}
        />
      </div>
      <div>
        Powtórz:{" "}
        <input
          type="text"
          value={powtorzHaslo}
          onChange={(e) => setPowtorzHaslo(e.target.value)}
        />
      </div>
      <div style={{ color: "red", marginTop: "5px" }}>{getMessage()}</div>
    </div>
  );
};

export default Haslo;
