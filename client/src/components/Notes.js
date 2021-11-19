import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { useParams } from "react-router";
import ReactDOM from 'react-dom';
import { Button,Card,CardBody, CardTitle,CardGroup,CardText,Col,Row,Input } from 'reactstrap';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"




import "./../styles/Notes.css";
let listItems;

const POSTOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "api-token": localStorage.token,
  },
};
const DeleteOptions = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "api-token": localStorage.token,
  },
  body: JSON.stringify({
    
  })
};
const ListNotes = () => {
  function openEditor(i){
    let link = "/edit/";
    window.location = link + i
  }
  function deleteNote(id){
    fetch("/api/notes/" + id, DeleteOptions)
  .then((response) => response.json())
  .then((data) => {
    window.location = ''

  });
  }
 
  fetch("/api/notes", POSTOptions)
  .then((response) => response.json())
  .then((data) => {
    listItems = data;
    console.log("items",listItems);
    listItems ? " " :  window.location = ''
    
    localStorage.setItem("data", JSON.stringify(data));
    console.log(listItems);
      let layoutNotes = (
        <>
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200:4}} >

        <Masonry >
        {listItems.map((data, i) => (
          <CardGroup>
          <Card color="secondary" outline  key={Math.random() + data.id}   >
            <CardBody  key={Math.random() + data.id} >
              <CardTitle key={Math.random() + data.title} tag="h5"> {data.title} </CardTitle>
              {console.log(data.content)}
                  <div>{data.content}</div>
              {/* </CardText> */}
              <Button className="boton-edit" size="sm" color="secondary" key={Math.random() + data.id} onClick={() => openEditor(i)}>Editar</Button>
              <Button className="boton-delete" size="sm" color="danger" key={Math.random() + data.id} onClick={() => deleteNote(data.id)}>Borrar</Button>

            </CardBody>
            
          </Card>

          </CardGroup>
          ))}
          </Masonry>
  </ResponsiveMasonry>
          </>
          )
          ReactDOM.render(layoutNotes, document.getElementById('Notascontainer'));
          
          
        });
        
        
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

       console.log(tituloRef);

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
    <div className="editor"><Row id="FormNote">
    <Col  sm="4" >    </Col>
    <Col  sm="4" className="bg-light border FormNoteContainer" >
      <form onSubmit={onSubmit}>
        <h4>Titulo</h4>
        <input ref={tituloRef} id="titulo" type="text" name="titulo" defaultValue={JSON.parse(localStorage.data)[id].title} />
        <br />
        <h4>Contenido</h4>
        <textarea ref={contenidoRef} id="contenido" type="text" name="contenido" defaultValue={JSON.parse(localStorage.data)[id].content} rows="4" cols="45"></textarea>
        <br />
        {/* <Input id="contenido" name="contenido" type="textarea" ref={contenidoRef} value={JSON.parse(localStorage.data)[id].content} />     */}
        <Input type="submit" value="Guardar" id="guardar"></Input><Button id="volver">Volver</Button>
      </form>
      </Col>
      
      <Col  sm="4" >    </Col>

      </Row>
      
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
    <div className="editor">
      <Row id="FormNote">
            <Col  sm="4" >    </Col>
            <Col  sm="4" className="bg-light border FormNoteContainer" ><form onSubmit={onSubmit}>
      <h4>Titulo</h4>
        <input ref={tituloRef} id="titulo" type="text" name="titulo"  />
        <br />
        <h4>Contenido</h4>
        <textarea ref={contenidoRef} id="contenido" type="text" name="contenido"  rows="4" cols="50"></textarea>
        <br />
        {/* <Input id="contenido" name="contenido" type="textarea" ref={contenidoRef} value={JSON.parse(localStorage.data)[id].content} />     */}
        <Button block>Guardar</Button>
      </form>
      </Col>
      
      <Col  sm="4" >    </Col>

      </Row>
    </div>
  );
};
export { EditNotes, ListNotes, NewNote };
