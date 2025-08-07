import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function MisEventos() {
  const [eventos, setEventos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const cargarEventos = async () => {
    try {
      const res = await API.get("/event/mis-eventos"); // ajustar si tu ruta difiere
      setEventos(res.data);
    } catch (err) {
      setMensaje("Error al cargar tus eventos.");
    }
  };

  const eliminarEvento = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este evento?");
    if (!confirmar) return;

    try {
      await API.delete(`/event/${id}`);
      setEventos(eventos.filter((e) => e.id !== id));
      setMensaje("Evento eliminado correctamente.");
    } catch (err) {
      setMensaje("Error al eliminar el evento.");
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Mis eventos creados</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {eventos.length === 0 ? (
        <p>No has creado eventos.</p>
      ) : (
        <div className="row">
          {eventos.map((evento) => (
            <div key={evento.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{evento.name}</h5>
                  <p className="card-text">{evento.description}</p>
                  <p className="card-text">
                    <strong>Fecha:</strong>{" "}
                    {new Date(evento.start_date).toLocaleDateString()}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/eventos/${evento.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Ver
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarEvento(evento.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
