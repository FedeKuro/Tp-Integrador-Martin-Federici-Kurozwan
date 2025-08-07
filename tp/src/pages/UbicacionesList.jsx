import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function UbicacionesList() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [form, setForm] = useState({ name: "", full_address: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarUbicaciones = async () => {
    try {
      const res = await API.get("/event-location");
      setUbicaciones(res.data);
    } catch (err) {
      setMensaje("Error al cargar ubicaciones.");
    }
  };

  useEffect(() => {
    cargarUbicaciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      if (editandoId) {
        await API.put(`/event-location/${editandoId}`, form);
        setMensaje("Ubicación actualizada.");
      } else {
        await API.post("/event-location", form);
        setMensaje("Ubicación creada.");
      }
      setForm({ name: "", full_address: "" });
      setEditandoId(null);
      cargarUbicaciones();
    } catch (err) {
      setMensaje("Error al guardar ubicación.");
    }
  };

  const editar = (ubicacion) => {
    setForm({ name: ubicacion.name, full_address: ubicacion.full_address });
    setEditandoId(ubicacion.id);
  };

  const eliminar = async (id) => {
    const confirmar = window.confirm("¿Eliminar esta ubicación?");
    if (!confirmar) return;

    try {
      await API.delete(`/event-location/${id}`);
      setMensaje("Ubicación eliminada.");
      cargarUbicaciones();
    } catch (err) {
      setMensaje("Error al eliminar ubicación.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mis ubicaciones</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label>Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label>Dirección completa:</label>
          <input
            type="text"
            className="form-control"
            name="full_address"
            value={form.full_address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {editandoId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <ul className="list-group">
        {ubicaciones.map((ubic) => (
          <li
            key={ubic.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{ubic.name}</strong> – {ubic.full_address}
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => editar(ubic)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => eliminar(ubic.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
