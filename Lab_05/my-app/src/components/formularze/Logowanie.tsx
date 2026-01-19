import React, { useState } from "react";

const Logowanie: React.FC = () => {
  const [nazwa, setNazwa] = useState<string>("");
  const [haslo, setHaslo] = useState<string>("");
  const [powtorzHaslo, setPowtorzHaslo] = useState<string>("");

  const czyPuste = !nazwa || !haslo || !powtorzHaslo;

  const handleLogin = () => {
    if (haslo !== powtorzHaslo) {
      alert("Hasła nie są zgodne");
    } else {
      alert("Zalogowano poprawnie");
    }
  };

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 3.3: Logowanie</h3>
      <div>
        Użytkownik:{" "}
        <input
          type="text"
          value={nazwa}
          onChange={(e) => setNazwa(e.target.value)}
        />
      </div>
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

      <button
        style={{ marginTop: "10px" }}
        disabled={czyPuste}
        onClick={handleLogin}
      >
        Logowanie
      </button>
    </div>
  );
};

export default Logowanie;
