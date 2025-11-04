import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Erreur fetch API :", error));
  }, []);

  return (
    <div>
      <h1>{message || "Chargement..."}</h1>
    </div>
  );
}

export default App;
