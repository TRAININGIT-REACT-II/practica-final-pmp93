import { useEffect, useState, useRef } from "react";
import Status from "./components/Status";
import { Routes, Route, Link,Redirect , NavLink} from "react-router-dom";
import Login from "./components/Login";
import {EditNotes,ListNotes, NewNote } from "./components/Notes";
import "./styles/Login.css"


// Componente principal de la aplicación.
const App = () => {
  let logged = false
  localStorage.user?logged=true:logged=false
  const logOut = () => {
    logged =false;
    localStorage.clear();
    window.location = "/";
    
  } 
  if (logged) {
    // setInterval(() => {
      const POSTOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-token": localStorage.token,
        },
      };
                fetch("/api/notes", POSTOptions)
                  .then((response) => response.json())
                  .then((data) => {
                    localStorage.setItem("data", JSON.stringify(data))
      
                  });
    // }, 1000);
    
  }
  // Mostramos la aplicación
  return (
    <main>

      {logged?<button onClick={logOut}>Cerrar Sesion</button>:""}
      <p key="principal">Notas de {localStorage.user}</p> 
      <Routes>


      <Route path="/" element={logged ? <ListNotes/>:<Login/>
      } />
      <Route path="/status" element={<Status />} />
        <Route path="/edit/:id" element={<EditNotes />} />
        <Route path="/new" element={<NewNote />} />
      </Routes>
    </main>
  );
};

export default App;
