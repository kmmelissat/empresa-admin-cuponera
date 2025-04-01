import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CrearOferta() {
  const navigate = useNavigate();
  const [oferta, setOferta] = useState({
    titulo: "",
    descripcion: "",
    precioRegular: "",
    precioOferta: "",
    fechaInicio: "",
    fechaFin: "",
    fechaLimiteUso: "",
    cantidadLimite: "",
    otrosDetalles: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOferta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaOferta = {
      ...oferta,
      precioRegular: parseFloat(oferta.precioRegular),
      precioOferta: parseFloat(oferta.precioOferta),
      cantidadLimite: oferta.cantidadLimite ? parseInt(oferta.cantidadLimite) : null,
      fechaInicio: new Date(oferta.fechaInicio),
      fechaFin: new Date(oferta.fechaFin),
      fechaLimiteUso: new Date(oferta.fechaLimiteUso),
      estado: "En espera de aprobación",
      cuponesVendidos: 0,
      timestamp: serverTimestamp(),
      empresaId: "empresaX123", // Aquí podrías usar el UID del usuario o su correo
    };

    await addDoc(collection(db, "cupones"), nuevaOferta);
    alert("Oferta registrada exitosamente");
    navigate("/empresa/ofertas");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrar nueva oferta</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input type="text" name="titulo" onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Imagen (URL)</label>
          <input type="text" name="imagen" onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-12">
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Precio Regular</label>
          <input type="number" name="precioRegular" onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Precio Oferta</label>
          <input type="number" name="precioOferta" onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Fecha de Inicio</label>
          <input type="date" name="fechaInicio" onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Fecha de Fin</label>
          <input type="date" name="fechaFin" onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Fecha Límite de Uso</label>
          <input type="date" name="fechaLimiteUso" onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Cantidad Límite (opcional)</label>
          <input type="number" name="cantidadLimite" onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Otros Detalles</label>
          <input type="text" name="otrosDetalles" onChange={handleChange} className="form-control" />
        </div>
        <div className="col-12 mt-4">
          <button type="submit" className="btn btn-primary">Guardar Oferta</button>
        </div>
      </form>
    </div>
  );
}
