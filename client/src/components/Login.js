import { useState, useRef } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ReactDOM from 'react-dom'


const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dataUser, setData] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
const loading =(<Loader type="Rings" color="#00BFFF" height={100} width={100} timeout={3000} />);
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
      <div id="loading"></div>
         <div className="col-6">
        <form onSubmit={onSubmit}>
          <label htmlFor="uncontrolled-name">Nombre</label>
          <input ref={usernameRef} id="name" type="text" name="username" />
          <input ref={passwordRef} id="password" type="password" name="password" />
          <button>Mandar preferencias</button>
        </form>
      </div>
      <div className="col-6">{name}</div>
    </div>
  );
};
export default Login;
