import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DodajArtykul: React.FC = () => {
  const [tytul, setTytul] = useState("");
  const [tresc, setTresc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tytul || !tresc) {
      alert("Wypełnij oba pola!");
      return;
    }

    const istniejace = localStorage.getItem("artykuly");
    const artykuly = istniejace ? JSON.parse(istniejace) : [];

    const nowyArtykul = {
      id: Date.now(),
      tytul,
      tresc,
    };
    artykuly.push(nowyArtykul);

    localStorage.setItem("artykuly", JSON.stringify(artykuly));

    navigate("/blog");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #3498db", paddingBottom: "10px" }}>
        Dodaj nowy wpis
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Tytuł artykułu"
          value={tytul}
          onChange={(e) => setTytul(e.target.value)}
          style={{
            padding: "15px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          placeholder="Treść artykułu..."
          rows={10}
          value={tresc}
          onChange={(e) => setTresc(e.target.value)}
          style={{
            padding: "15px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "15px",
            background: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          DODAJ
        </button>
      </form>
    </div>
  );
};
export default DodajArtykul;
