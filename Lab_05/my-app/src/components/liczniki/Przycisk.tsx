import React from "react";

// Interfejs określający, że komponent spodziewa się funkcji (callbacku) [cite: 78]
interface PrzyciskProps {
  dodaj: () => void;
}

const Przycisk: React.FC<PrzyciskProps> = ({ dodaj }) => {
  return <button onClick={dodaj}>Dodaj</button>;
};

export default Przycisk;
