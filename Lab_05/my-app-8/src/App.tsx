import React from "react";
// Importujemy elementy routera
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Importujemy nasze komponenty
import StronaGlowna from "./components/StronaGlowna";
import Blog from "./components/Blog";
import Artykul from "./components/Artykul";
import DodajArtykul from "./components/DodajArtykul";
import Licznik8 from "./components/Licznik";

function App() {
  return (
    <BrowserRouter>
      {/* Pasek nawigacji widoczny zawsze */}
      <nav
        style={{
          background: "#2c3e50",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
          Mój Blog
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Start
          </Link>
          <Link to="/blog" style={{ color: "white", textDecoration: "none" }}>
            Blog
          </Link>
          <Link to="/dodaj" style={{ color: "white", textDecoration: "none" }}>
            Dodaj
          </Link>
          <Link
            to="/licznik"
            style={{ color: "#f1c40f", textDecoration: "none" }}
          >
            Licznik (8.1)
          </Link>
        </div>
      </nav>

      {/* Kontener na treść podstron */}
      <div
        style={{
          padding: "20px",
          background: "#f4f6f7",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <Routes>
          <Route path="/" element={<StronaGlowna />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:id" element={<Artykul />} />
          <Route path="/dodaj" element={<DodajArtykul />} />

          {/* Zadanie 8.1 wrzuciłem tutaj */}
          <Route path="/licznik" element={<Licznik8 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
