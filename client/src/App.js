import { useEffect, useState, useRef } from "react";
import Status from "./components/Status";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import {EditNotes,ListNotes, NewNote } from "./components/Notes";

// Componente principal de la aplicación.
const App = () => {
  // Mostramos la aplicación
  return (
    <main>

      <p>Notas de {localStorage.user}</p> 
      <Routes>
        <Route path="/status" element={<Status />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<ListNotes />} />
        <Route path="/notes/edit/:id" element={<EditNotes />} />
        <Route path="/notes/new" element={<NewNote />} />
      </Routes>
    </main>
  );
};

export default App;
