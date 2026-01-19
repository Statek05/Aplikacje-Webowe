import React from "react";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const Studenci: React.FC = () => {
  const Students: Student[] = [
    { imie: "Jan", nazwisko: "Kowalski", rocznik: 2004 },
    { imie: "Anna", nazwisko: "Nowak", rocznik: 2005 },
    { imie: "Marek", nazwisko: "Zieliński", rocznik: 2006 },
  ];

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <h3>Zadanie 5.1: Lista Studentów</h3>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {Students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Studenci;
