import { useState, useRef } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ReactDOM from 'react-dom'
import { Button,Card,CardBody, CardTitle,CardGroup,Label,Col,Row,Input } from 'reactstrap';



const Login = () => {
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dataUser, setData] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
const loading =(<Loader type="ThreeDots" color="#000" secondaryColor="#dcdcdc"  height={20} width={20} />);
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
    fetch("/api/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        {}
        localStorage.setItem("user", data.username);
        localStorage.setItem("token", data.token);
        localStorage.setItem("id_user", data.id);
        // loading = true;
        ReactDOM.render(loading, document.getElementById('loading'));
        console.log();

        setTimeout(() => {
          
          window.location =""
          
        }, 2000);
      });
  };

  return (
    <div className="row">
          <Row id="LoginForm">
            <Col  sm="4" >    </Col>
            <Col  sm="4" className="bg-light border LoginContainer" >
              <form onSubmit={onSubmit}>
              <h4 >Nombre</h4>
                <input ref={usernameRef} id="name" type="text" name="username" />
              <h4 >Contraseña</h4>
                <input ref={passwordRef} id="password" type="password" name="password" />
                <br/>
                <br/>

                <Button type="submit" block id="loading">Mandar preferencias</Button>

              </form>
              {/* <div id="loading"></div> */}

            </Col>
            <Col  sm="4" ></Col>
          </Row>
           
        
    </div>
  );
};
export default Login;
