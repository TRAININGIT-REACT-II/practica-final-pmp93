import "./Status.css";
import { useEffect, useState, useRef } from "react";
import { render } from "react-dom";
import { EditNotes, ListNotes } from "./Notes";

// Mostramos si el servidor funciona o no.
const Status = () => {
  const [estado, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const css = estado ? "status status-ok" : "status";
  const text = estado ? "OK" : "NO CONECTA";

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status === "ok");
      })
      .finally(() => setLoading(false));
  }, []);

  // Cargamos el estado del servidor
  return (
    <>
      <h1>Curso de React de TrainingIT</h1>
      <p>
        Estado del servidor:
        {loading ? " Cargando..." : <span className={css}>{text}</span>}
      </p>
     
    </>
  );
};

export default Status;
