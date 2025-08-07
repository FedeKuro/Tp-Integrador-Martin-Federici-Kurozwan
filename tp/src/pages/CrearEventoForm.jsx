import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CrearEventoForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    start_date: "",
    duration_in_minutes: 60,
    price: 0,
    max_assistance: 0,
    id_event_location: "",
  });

  const [ubicaciones, setUbicaciones] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const cargarUbicaciones = async () => {
    try {
      const res = await API.get("/event-location");
      setUbicaciones(res.data);
    } catch (err) {
      console.error("Error al cargar ubicaciones", err);
    }
  };

  useEffect(() => {
    cargarUbicaciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "duration_in_minutes" || name === "price" || name === "max_assistance"
        ? parseInt(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!form.name || !form.description || !form.start_date || !form.id_event_location) {
      setError("Todos los campos obligatorios deben completarse.");
      return;
    }

    if (form.duration_in_minutes <= 0 || form.price < 0 || form.max_assistance <= 0) {
      setError("Duración, precio y capacidad deben ser valores positivos.");
      return;
    }

    try {
      await API.post("/event", form);
      setMensaje("Evento creado con éxito.");
      navigate("/mis-eventos");
    } catch (err) {
      setError("Error al crear evento.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear nuevo evento</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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

        <div className="mb-3">
          <label>Descripción:</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Fecha y hora de inicio:</label>
          <input
            type="datetime-local"
            className="form-control"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Duración (min):</label>
            <input
              type="number"
              className="form-control"
              name="duration_in_minutes"
              value={form.duration_in_minutes}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>Precio:</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>Capacidad:</label>
            <input
              type="number"
              className="form-control"
              name="max_assistance"
              value={form.max_assistance}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Ubicación:</label>
          <select
            className="form-control"
            name="id_event_location"
            value={form.id_event_location}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar una ubicación</option>
            {ubicaciones.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} - {u.full_address}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear evento
        </button>
      </form>
    </div>
  );
}
