import React, { useEffect, useState } from "react";
import API from "../services/api";
import EventoCard from "../components/EventoCard";
import BuscadorEventos from "../components/BuscadorEventos";

export default function EventosList() {
  const [eventos, setEventos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const fetchEventos = async (page = 1) => {
    try {
      const res = await API.get(`/event?page=${page}`);
      setEventos(res.data.eventos || res.data); // tolerancia a formatos
      setPagina(page);
      if (res.data.totalPaginas) {
        setTotalPaginas(res.data.totalPaginas);
      }
    } catch (err) {
      console.error("Error al cargar eventos", err);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleSiguiente = () => {
    if (pagina < totalPaginas) {
      fetchEventos(pagina + 1);
    }
  };

  const handleAnterior = () => {
    if (pagina > 1) {
      fetchEventos(pagina - 1);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Eventos disponibles</h2>

      <BuscadorEventos setResultados={setEventos} />

      <div className="row">
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <div key={evento.id} className="col-md-4 mb-3">
              <EventoCard evento={evento} />
            </div>
          ))
        ) : (
          <p>No hay eventos disponibles.</p>
        )}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={handleAnterior}
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <span>Página {pagina}</span>
        <button
          className="btn btn-outline-primary"
          onClick={handleSiguiente}
          disabled={pagina === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
