import { useEffect, useState, useRef } from "react";


const Login =({ login })=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [dataUser,setData] =useState(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const getData=()=>{
      console.log(dataUser);
      
    
    }
    const onSubmit = (e) => {
      e.preventDefault();
      
      
    //    console.log(Object.values(dataUser));
      
  
console.log();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:usernameRef.current.value,password:passwordRef.current.value })
    };
    fetch('/api/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          setData(data);
          localStorage.setItem('user', data.username)
          localStorage.setItem('token', data.token)
          localStorage.setItem('id_user', data.id)
        } );
  
      }





    return  <div className="row">
    <div className="col-6">
      <form onSubmit={onSubmit}>
        <label htmlFor="uncontrolled-name">Nombre</label>
        <input ref={usernameRef} id="name" type="text" name="username" />
        <input ref={passwordRef} id="password" type="password"  name="password"/>
        <button>Mandar preferencias</button>
      </form>
  </div>
  <div className="col-6">
  {name}
    </div>
    <button onClick={getData}>test</button>
    </div>;
};
export default Login;