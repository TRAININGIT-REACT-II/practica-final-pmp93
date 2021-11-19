import App from "./src/App";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";


// Montamos la aplicación
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
