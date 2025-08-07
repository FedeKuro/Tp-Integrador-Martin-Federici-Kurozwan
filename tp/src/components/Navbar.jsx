import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">EventosApp</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
        aria-controls="nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>

          {token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/crear-evento">Crear Evento</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mis-eventos">Mis Eventos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ubicaciones">Ubicaciones</Link>
              </li>
            </>
          )}
        </ul>

        <div className="d-flex">
          {token ? (
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">
                Iniciar sesión
              </Link>
              <Link to="/register" className="btn btn-outline-light">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
