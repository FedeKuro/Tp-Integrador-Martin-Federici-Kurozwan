import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function EventoDetalle() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [evento, setEvento] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [inscripto, setInscripto] = useState(false);

  const cargarEvento = async () => {
    try {
      const res = await API.get(`/event/${id}`);
      setEvento(res.data);
    } catch (err) {
      setMensaje("Error al cargar el evento.");
    }
  };

  const verificarInscripcion = async () => {
    try {
      const res = await API.get(`/event/${id}/enrollment/check`);
      setInscripto(res.data.inscripto); // backend debería devolver este dato
    } catch (err) {
      console.log("No se pudo verificar inscripción");
    }
  };

  const inscribirse = async () => {
    try {
      await API.post(`/event/${id}/enrollment`);
      setInscripto(true);
      setMensaje("Te has inscrito al evento.");
    } catch (err) {
      setMensaje("Error al inscribirse.");
    }
  };

  const cancelarInscripcion = async () => {
    try {
      await API.delete(`/event/${id}/enrollment`);
      setInscripto(false);
      setMensaje("Inscripción cancelada.");
    } catch (err) {
      setMensaje("Error al cancelar inscripción.");
    }
  };

  useEffect(() => {
    cargarEvento();
    if (token) verificarInscripcion();
  }, [id]);

  if (!evento) return <div className="container mt-4">Cargando evento...</div>;

  return (
    <div className="container mt-4">
      <h2>{evento.name}</h2>
      <p><strong>Descripción:</strong> {evento.description}</p>
      <p><strong>Fecha:</strong> {new Date(evento.start_date).toLocaleString()}</p>
      <p><strong>Duración:</strong> {evento.duration_in_minutes} minutos</p>
      <p><strong>Precio:</strong> ${evento.price}</p>
      <p><strong>Capacidad:</strong> {evento.max_assistance}</p>
      <p><strong>Provincia:</strong> {evento.event_location?.location?.province?.name}</p>
      <p><strong>Localidad:</strong> {evento.event_location?.location?.locality?.name}</p>
      <p><strong>Dirección:</strong> {evento.event_location?.full_address}</p>
      <p><strong>Tags:</strong> {evento.tags?.join(", ")}</p>
      <p><strong>Creador:</strong> {evento.creator?.name}</p>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {token && (
        <div className="mt-3">
          {inscripto ? (
            <button className="btn btn-danger" onClick={cancelarInscripcion}>
              Cancelar inscripción
            </button>
          ) : (
            <button className="btn btn-success" onClick={inscribirse}>
              Inscribirme
            </button>
          )}
        </div>
      )}
    </div>
  );
}
