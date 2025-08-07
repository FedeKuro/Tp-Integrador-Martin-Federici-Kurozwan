import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventosList from "./pages/EventosList";
import EventoDetalle from "./pages/EventoDetalle";
import MisEventos from "./pages/MisEventos";
import CrearEventoForm from "./pages/CrearEventoForm";
import UbicacionesList from "./pages/UbicacionesList";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<EventosList/>}/>
        <Route path="/eventos/:id" element={<EventoDetalle/>}/>
        <Route path="/mis-eventos" element={<MisEventos/>}/>
        <Route path="/crear-evento" element={<CrearEventoForm/>}/>
        <Route path="/ubicaciones" element={<UbicacionesList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
