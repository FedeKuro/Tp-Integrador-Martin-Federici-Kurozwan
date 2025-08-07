import React from "react";
import { Link } from "react-router-dom";

export default function EventoCard({ evento }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{evento.name}</h5>
        <p className="card-text">{evento.description}</p>
        <p className="card-text">
          <strong>Fecha:</strong> {new Date(evento.start_date).toLocaleDateString()}
        </p>
        <p className="card-text">
          <strong>Precio:</strong> ${evento.price}
        </p>
        <p className="card-text">
          <strong>Capacidad:</strong> {evento.max_assistance}
        </p>
        <Link to={`/eventos/${evento.id}`} className="btn btn-primary">
          Ver más
        </Link>
      </div>
    </div>
  );
}
