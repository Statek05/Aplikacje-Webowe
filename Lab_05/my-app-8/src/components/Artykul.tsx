import React from "react";
import { useParams, Link } from "react-router-dom";

interface IArtykul {
  id: number;
  tytul: string;
  tresc: string;
}

const Artykul: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  let artykul: IArtykul | null = null;

  const saved = localStorage.getItem("artykuly");
  if (saved && id) {
    const lista: IArtykul[] = JSON.parse(saved);
    artykul = lista.find((a) => a.id === parseInt(id)) || null;
  }

  if (!artykul) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Nie znaleziono artykułu.</h2>
        <Link to="/blog">Wróć do listy</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "40px",
        background: "white",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        borderRadius: "10px",
      }}
    >
      <Link
        to="/blog"
        style={{
          color: "#999",
          textDecoration: "none",
          marginBottom: "20px",
          display: "inline-block",
        }}
      >
        ← Wróć do listy
      </Link>
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#2c3e50",
          marginBottom: "20px",
          borderBottom: "1px solid #eee",
          paddingBottom: "20px",
        }}
      >
        {artykul.tytul}
      </h1>
      <div
        style={{
          fontSize: "1.2rem",
          lineHeight: "1.8",
          color: "#333",
          whiteSpace: "pre-wrap",
        }}
      >
        {artykul.tresc}
      </div>
    </div>
  );
};

export default Artykul;
