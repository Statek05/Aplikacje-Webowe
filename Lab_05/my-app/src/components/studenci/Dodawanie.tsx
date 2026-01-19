import React, { useState } from "react";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

interface DodawanieProps {
  dodaj: (student: Student) => void;
}

const Dodawanie: React.FC<DodawanieProps> = ({ dodaj }) => {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [rocznik, setRocznik] = useState("");

  const handleAdd = () => {
    if (!imie || !nazwisko || !rocznik) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    const rocznikNumber = parseInt(rocznik);
    if (isNaN(rocznikNumber)) {
      alert("Rocznik musi być liczbą!");
      return;
    }

    dodaj({
      imie: imie,
      nazwisko: nazwisko,
      rocznik: rocznikNumber,
    });
    setImie("");
    setNazwisko("");
    setRocznik("");
  };

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "gray",
      }}
    >
      <h4>Dodaj studenta:</h4>
      <input
        placeholder="Imię"
        value={imie}
        onChange={(e) => setImie(e.target.value)}
        style={{ marginRight: "5px" }}
      />
      <input
        placeholder="Nazwisko"
        value={nazwisko}
        onChange={(e) => setNazwisko(e.target.value)}
        style={{ marginRight: "5px" }}
      />
      <input
        placeholder="Rocznik"
        value={rocznik}
        onChange={(e) => setRocznik(e.target.value)}
        style={{ marginRight: "5px" }}
      />
      <button onClick={handleAdd}>Dodaj</button>
    </div>
  );
};
export default Dodawanie;
