import React, { useState, useEffect } from "react";

const Tytul: React.FC = () => {
  const [tytul, setTytul] = useState("");
  useEffect(() => {
    document.title = tytul;
  }, [tytul]);

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 6.2: Tytuł strony</h3>
      <input
        type="text"
        value={tytul}
        onChange={(e) => setTytul(e.target.value)}
        placeholder="Wpisz tytuł strony..."
      />
    </div>
  );
};
export default Tytul;
