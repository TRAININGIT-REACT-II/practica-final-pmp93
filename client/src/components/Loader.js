import "./../styles/Loader.css";

// Componente que muestra una animación de carga
const Loader = ({ loadingText }) => (
  <div className="loader">
    <div className="loader-animation" />
    <span className="loader-text">{loadingText}</span>
  </div>
);

export default Loader;