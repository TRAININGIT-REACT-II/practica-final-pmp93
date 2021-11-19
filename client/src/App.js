import { useEffect, useState, useRef } from "react";
import Status from "./components/Status";
import { Routes, Route, Link,Redirect , NavLink} from "react-router-dom";
import Login from "./components/Login";
import {EditNotes,ListNotes, NewNote } from "./components/Notes";
import "./styles/Login.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.css";
import { Button,Col,Row } from 'reactstrap';




// Componente principal de la aplicación.
const App = () => {
  let logged = false
  localStorage.user?logged=true:logged=false
  const logOut = () => {
    logged =false;
    localStorage.clear();
    window.location = "/";
    
  } 
  const BackPage = () => {
    
    window.location = "/";
    
  } 
  function newNote(){
    window.location = 'new'
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
      <Row id="">

        <Col  sm="1" className=" columnas " ></Col>
        <Col  sm="10" className="   columnas" >
            {logged?window.location.pathname == '/' ?<Button className="newNote" onClick={() => newNote()}>Nuevo</Button>:<Button className="back" onClick={BackPage}>Volver</Button>:""}
            {logged?<Button className="logOut" onClick={logOut}>Cerrar Sesion</Button>:""}
            <div className="cuerpo">
              <Routes >
                <Route path="/" element={logged ? <ListNotes/>:<Login/>} />
                <Route path="/status" element={<Status />} />
                <Route path="/edit/:id" element={<EditNotes />} />
                <Route path="/new" element={<NewNote />} />
              </Routes>
            </div>
      </Col>
      <Col  sm="1" className="   columnas" >
      </Col>
    </Row>
    </main>
  );
};

export default App;
