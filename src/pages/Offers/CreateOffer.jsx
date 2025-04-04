import { useState, useEffect } from "react";
import { db } from "../../firebase"; // Ajusta la ruta si es diferente
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useEmpresaStore from "../../store/useEmpresaStore";

export default function CreateOffer() {
  const { empresa } = useEmpresaStore(); // Obtenemos la empresa desde el store

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
    categoria: "", // El rubro se tomará automáticamente del objeto 'empresa'
  });

  // Usamos el rubro de la empresa para asignarlo automáticamente
  useEffect(() => {
    if (empresa) {
      setOferta((prevState) => ({
        ...prevState,
        categoria: empresa.rubro || "", // Asignamos el rubro de la empresa
      }));
    }
  }, [empresa]);

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
      empresaId: empresa.codigo,
      nombreEmpresa: empresa.nombre,
      porcentajeComision: empresa.porcentajeComision,
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

    <div className="container my-5">
    <div className="text-center mb-5">
      <h2 className="fw-bold text-primary">🎉 Crear Nuevo Cupon</h2>
      <p className="text-muted">
        Ingresa la información de tu oferta para crear un nuevo cupón
      </p>
    </div>

    <div className="mb-5">
      <div className="bg-light rounded shadow-sm p-4">
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
          <input
            type="number"
            step="0.01" // ← esto es lo importante
            name="precioRegular"
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio de oferta</label>
          <input
            type="number"
            step="0.01"
            name="precioOferta"
            onChange={handleChange}
            required
            className="form-control"
          />
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
    </div>
  </div>
  );
}
