// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/user/login", {
        email,
        password,
      });

      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        setError("No se recibió token.");
      }
    } catch (err) {
      setError("Credenciales incorrectas o error en el servidor.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Iniciar sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
}
