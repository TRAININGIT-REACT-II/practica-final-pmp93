import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { useParams } from "react-router";

import "./../styles/Notes.css";
let listItems = [];

const POSTOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "api-token": localStorage.token,
  },
};
const ListNotes = () => {
  fetch("/api/notes", POSTOptions)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("data", JSON.stringify(data));
    });

  listItems = JSON.parse(localStorage.data);

  let link = "/notes/edit/";
  return (
    <div className="container">
      {listItems.map((data, i) => (
        <main>
          <div id="note">
          <NavLink key={data.id} to={link + i}>Editar</NavLink>
          
            <p key={data.title} id="title">
              {data.title}{" "}
            </p>
            <p key={data.content} id="contentNote">
              {data.content}
            </p>
          </div>
        </main>
      ))}
    </div>
  );
};
// export default ListNotes;

const EditNotes = () => {
  const tituloRef = useRef(null);
  const contenidoRef = useRef(null);
  let { id } = useParams();

  const onSubmit = (e) => {
    e.preventDefault();

    //    console.log(Object.values(dataUser));

    console.log();
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "api-token": localStorage.token,
      },
      body: JSON.stringify({
        title: tituloRef.current.value,
        content: contenidoRef.current.value,
      }),
    };
    fetch("/api/notes/" + JSON.parse(localStorage.data)[id].id, requestOptions)
      .then((response) => response.json())
      .then((data) => {

      });
  };

  return (
    <div className="col-6">
      <form onSubmit={onSubmit}>
        <label>Titulo</label>
        <input ref={tituloRef} id="titulo" type="text" name="titulo" defaultValue={JSON.parse(localStorage.data)[id].title}/>
        <br />
        <label>Contenido</label>
        <textarea ref={contenidoRef} id="contenido" type="text" name="contenido" defaultValue={JSON.parse(localStorage.data)[id].title}></textarea>
        <br />
        <input type="submit" value="Guardar"></input>
      </form>
    </div>
  );
};

const NewNote = () => {

  const tituloRef = useRef(null);
  const contenidoRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-token": localStorage.token,
      },
      body: JSON.stringify({
        title: tituloRef.current.value,
        content: contenidoRef.current.value,
        author: localStorage.id_user,
      }),
    };
    fetch("/api/notes", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
window.location('./notes')
      });
  };
  

  return (
    <div className="col-6">
      <form onSubmit={onSubmit}>
        <label>Titulo</label>
        <input ref={tituloRef} id="titulo" type="text" name="titulo" />
        <br />
        <label>Contenido</label>
        <textarea ref={contenidoRef} id="contenido" type="text" name="contenido" ></textarea>
        <br />
        <input type="submit" value="Guardar"></input>
      </form>
    </div>
  );
};
export { EditNotes, ListNotes, NewNote };