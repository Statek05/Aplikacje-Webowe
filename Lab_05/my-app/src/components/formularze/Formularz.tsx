import React, { useState } from "react";

const Formularz: React.FC = () => {
  const [tekst, setTekst] = useState<string>("");

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 3.1: Formularz</h3>
      <input
        type="text"
        value={tekst}
        onChange={(e) => setTekst(e.target.value)}
        placeholder="Wpisz coś..."
      />
      <div style={{ marginTop: "10px" }}>Replikacja: {tekst}</div>
    </div>
  );
};

export default Formularz;
