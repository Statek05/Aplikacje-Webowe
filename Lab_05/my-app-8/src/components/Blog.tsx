import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Artykul {
  id: number;
  tytul: string;
  tresc: string;
}

const Blog: React.FC = () => {
  const [artykuly] = useState<Artykul[]>(() => {
    const saved = localStorage.getItem("artykuly");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ margin: 0, color: "#2c3e50" }}>Lista Artykułów</h2>
        <Link
          to="/dodaj"
          style={{
            background: "#27ae60",
            color: "white",
            textDecoration: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          + Dodaj Artykuł
        </Link>
      </div>

      {artykuly.length === 0 ? (
        <p style={{ textAlign: "center", color: "#999", fontSize: "1.2rem" }}>
          Brak artykułów. Dodaj pierwszy!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {artykuly.map((art) => (
            <div
              key={art.id}
              style={{
                padding: "20px",
                background: "#f8f9fa",
                borderLeft: "5px solid #3498db",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>{art.tytul}</h3>
              <Link
                to={`/article/${art.id}`}
                style={{
                  color: "#3498db",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Czytaj więcej →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Blog;
