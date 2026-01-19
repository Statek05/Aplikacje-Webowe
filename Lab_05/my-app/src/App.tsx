import React from "react";
// Zadanie 1
import Koszyk from "./components/koszyk/Koszyk";
import NowyKoszyk from "./components/koszyk/NowyKoszyk";
// Zadanie 2
import Licznik from "./components/liczniki/Licznik";
import NowyLicznik from "./components/liczniki/NowyLicznik";
// Zadanie 3
import Formularz from "./components/formularze/Formularz";
import Haslo from "./components/formularze/Haslo";
import Logowanie from "./components/formularze/Logowanie";
// Zadanie 4
import Ternary from "./components/inne/Ternary";
import Aktualizacja from "./components/inne/Aktualizacja";
// Zadanie 5
import Studenci from "./components/studenci/Studenci";
import StudentManager from "./components/studenci/StudentManager";
// Zadanie 6
import LicznikEfekt from "./components/efekty/Licznik";
import Tytul from "./components/efekty/Tytul";
import Odliczanie from "./components/efekty/Odliczanie";
// Zadanie 7
import Komentarze from "./components/produkty/Komentarze";

function App() {
  return (
    <div style={{ padding: "20px", paddingBottom: "100px" }}>
      <h1>Lab 5 - Wszystkie Zadania</h1>

      <h2>Zadanie 1: Koszyki</h2>
      <Koszyk />
      <NowyKoszyk />
      <hr />

      <h2>Zadanie 2: Liczniki</h2>
      <Licznik />
      <NowyLicznik />
      <hr />

      <h2>Zadanie 3: Formularze</h2>
      <Formularz />
      <Haslo />
      <Logowanie />
      <hr />

      <h2>Zadanie 4: Inne</h2>
      <Ternary />
      <Aktualizacja />
      <hr />

      <h2>Zadanie 5: Studenci</h2>
      <Studenci />
      <StudentManager />
      <hr />

      <h2>Zadanie 6: Efekty</h2>
      <LicznikEfekt />
      <Tytul />
      <Odliczanie />
      <hr />

      <h2>Zadanie 7: Produkty (API)</h2>
      <Komentarze />
    </div>
  );
}

export default App;
