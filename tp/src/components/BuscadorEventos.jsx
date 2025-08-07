import React, { useState } from "react";
import API from "../services/api";

export default function BuscadorEventos({ setResultados }) {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [tag, setTag] = useState("");

  const buscarEventos = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();

      if (nombre) params.append("name", nombre);
      if (fecha) params.append("startdate", fecha);
      if (tag) params.append("tag", tag);

      const res = await API.get(`/event?${params.toString()}`);
      setResultados(res.data.eventos || res.data);
    } catch (err) {
      console.error("Error al buscar eventos", err);
    }
  };

  return (
    <form onSubmit={buscarEventos} className="mb-4">
      <div className="row">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del evento"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tag (opcional)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div className="col-md-2 mb-2">
          <button type="submit" className="btn btn-success w-100">
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
