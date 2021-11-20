import { useState, useRef } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ReactDOM from 'react-dom'
import { Button,Card,CardBody, CardTitle,CardGroup,Label,Col,Row,Input,Alert } from 'reactstrap';



const RegisterUser = () => {
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dataUser, setData] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);
  const loading =(<Loader type="ThreeDots" color="#000" secondaryColor="#dcdcdc"  height={20} width={20} />);
  let alertPasword =(<div> <Alert color="danger">Las contraseñas no coinciden</Alert></div>);
  const onSubmit = (e) => {
    e.preventDefault();

    //    console.log(Object.values(dataUser));

    console.log();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
    };
    if (passwordRef.current.value === password2Ref.current.value) {
      fetch("/api/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
        // loading = true;
        ReactDOM.render(loading, document.getElementById('loading'));
        console.log(data);
        alertPasword = "";
        ReactDOM.render(alertPasword, document.getElementById('alert'));

        setTimeout(() => {
          
          window.location ="/"
          
        }, 2000);
      });  
    } else {
      ReactDOM.render(alertPasword, document.getElementById('alert'));

      console.log("hola");
      
    }
    
  };

  return (
    <div className="row">
          <Row id="LoginForm">
            <Col  sm="4" >    </Col>
            <Col  sm="4" className="bg-light border LoginContainer" >
              <h3>Registro</h3>
              <form onSubmit={onSubmit}>
              <label >Nombre</label>
                <input ref={usernameRef} id="name" type="text" name="username" />
                <label >Contraseña</label>
                <input ref={passwordRef} id="password" type="password" name="password" />
                <label >Repite Contraseña</label>
                <input ref={password2Ref} id="password" type="password" name="password2" />
                <br/>
                <br/>

                <Button type="submit" block id="loading">Crear Usuario</Button>

              </form>
              {/* <div id="loading"></div> */}

            </Col>
            <Col  sm="4" ></Col>
          </Row>
           
        
    </div>
  );
};
export default RegisterUser;
