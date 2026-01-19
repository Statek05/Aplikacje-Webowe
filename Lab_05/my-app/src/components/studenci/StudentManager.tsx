import React, { useState } from "react";
import Dodawanie from "./Dodawanie";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const StudentManager: React.FC = () => {
  // Stan początkowy taki sam jak w zadaniu 5.1 [cite: 117]
  const [studenci, setStudenci] = useState<Student[]>([
    { imie: "Jan", nazwisko: "Kowalski", rocznik: 1999 },
    { imie: "Anna", nazwisko: "Nowak", rocznik: 2000 },
    { imie: "Marek", nazwisko: "Zień", rocznik: 1998 },
  ]);

  // Funkcja dodająca nowego studenta do stanu
  const dodajStudenta = (nowyStudent: Student) => {
    setStudenci([...studenci, nowyStudent]);
  };

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 5.2: Student Manager</h3>

      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {studenci.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dodawanie dodaj={dodajStudenta} />
    </div>
  );
};
export default StudentManager;
