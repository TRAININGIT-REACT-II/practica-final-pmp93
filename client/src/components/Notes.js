import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { useParams } from "react-router";
import ReactDOM from 'react-dom'


import "./../styles/Notes.css";
let listItems;

const POSTOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "api-token": localStorage.token,
  },
};
const ListNotes = () => {
  function openEditor(i){
    let link = "/edit/";
    console.log(i);
    window.location = link + i
  }
  fetch("/api/notes", POSTOptions)
  .then((response) => response.json())
  .then((data) => {
    listItems = data;
    console.log("items",listItems);
    if (listItems) {
      console.log("cargadoo");
    }else{
      window.location = ''
    }
    localStorage.setItem("data", JSON.stringify(data));
    console.log(listItems);
      let layoutNotes = (
        <>{listItems.map((data, i) => (
          <main key={Math.random()} >

              <div id="note">
                <button key={Math.random() + data.id} onClick={() => openEditor(i)}>Editar</button>

                <p key={Math.random() + data.title} id="title">
                  {data.title}
                </p>
                <p key={Math.random() + data.content} id="contentNote">
                  {data.content}
                </p>
              </div>
            </main>
          ))}</>
          )
          ReactDOM.render(layoutNotes, document.getElementById('Notascontainer'));
          
          
        });
        
        // listItems = JSON.parse(localStorage.data);
        
        return (
          <div className="container" >
            <div id="Notascontainer"></div>
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
        fetch("/api/notes", POSTOptions)
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("data", JSON.stringify(data));
            window.location = "/";

          });
      });

  };

  return (
    <div className="col-6">
      <form onSubmit={onSubmit}>
        <label>Titulo</label>
        <input ref={tituloRef} id="titulo" type="text" name="titulo" defaultValue={JSON.parse(localStorage.data)[id].title} />
        <br />
        <label>Contenido</label>
        <textarea ref={contenidoRef} id="contenido" type="text" name="contenido" defaultValue={JSON.parse(localStorage.data)[id].content}></textarea>
        <br />
        <input type="submit" value="Guardar"></input>
      </form>
    </div>
  );
};

const NewNote = () => {

  const tituloRef = useRef('');
  const contenidoRef = useRef('');

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

        fetch("/api/notes", POSTOptions)
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("data", JSON.stringify(data));
            window.location = "/";

          });
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
