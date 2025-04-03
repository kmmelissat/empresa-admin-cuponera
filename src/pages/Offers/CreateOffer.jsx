import { useState } from "react";
import { db } from "../../firebase"; // Ajusta la ruta si es diferente
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateOffer() {
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
    imagen: "", // nombre del archivo (ej: nails.jpg)
  });

  const handleChange = (e) => {
    setOferta({
      ...oferta,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaOferta = {
      ...oferta,
      imagen: oferta.imagen || "default.jpg",
      precioRegular: parseFloat(oferta.precioRegular),
      precioOferta: parseFloat(oferta.precioOferta),
      cantidadLimite: oferta.cantidadLimite ? parseInt(oferta.cantidadLimite) : null,
      fechaInicio: new Date(oferta.fechaInicio),
      fechaFin: new Date(oferta.fechaFin),
      fechaLimiteUso: new Date(oferta.fechaLimiteUso),
      estado: "En espera de aprobación",
      cuponesVendidos: 0,
      empresaId: "empresaX123", // <- luego dinámico según el usuario logueado
      creado: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "cupones"), nuevaOferta);
      alert("Cupón creado exitosamente");
      navigate("/empresa/ofertas");
    } catch (error) {
      console.error("Error al registrar la oferta:", error);
      alert("Ocurrió un error al crear el cupón");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear nuevo cupón</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título de la oferta</label>
          <input type="text" name="titulo" onChange={handleChange} required className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Nombre de imagen (ej: nails.jpg)</label>
          <input type="text" name="imagen" onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-12">
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" onChange={handleChange} required className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio regular</label>
          <input type="number" name="precioRegular" onChange={handleChange} required className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio de oferta</label>
          <input type="number" name="precioOferta" onChange={handleChange} required className="form-control" />
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha de inicio</label>
          <input type="date" name="fechaInicio" onChange={handleChange} required className="form-control" />
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha de fin</label>
          <input type="date" name="fechaFin" onChange={handleChange} required className="form-control" />
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha límite de uso</label>
          <input type="date" name="fechaLimiteUso" onChange={handleChange} required className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Cantidad límite (opcional)</label>
          <input type="number" name="cantidadLimite" onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Otros detalles</label>
          <input type="text" name="otrosDetalles" onChange={handleChange} className="form-control" />
        </div>

        <div className="col-12 mt-4">
          <button type="submit" className="btn btn-primary">
            Guardar cupón
          </button>
        </div>
      </form>
    </div>
  );
}
