import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const EditOffer = () => {
  const { id } = useParams(); // Obtener el ID de la oferta desde la URL
  const navigate = useNavigate();
  const [oferta, setOferta] = useState(null);

  useEffect(() => {
    const cargarOferta = async () => {
      const ofertaRef = doc(db, "cupones", id);
      const ofertaDoc = await getDoc(ofertaRef);
      if (ofertaDoc.exists()) {
        setOferta(ofertaDoc.data());
      } else {
        navigate("/empresa/ofertas"); // Redirigir si no se encuentra la oferta
      }
    };

    cargarOferta();
  }, [id, navigate]);

  const handleChange = (e) => {
    setOferta({
      ...oferta,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ofertaRef = doc(db, "cupones", id);
      await updateDoc(ofertaRef, {
        ...oferta,
        estado: "En espera de aprobación", // Reenviar para aprobación
        creado: new Date(),
      });

      alert("Oferta reenviada para aprobación.");
      navigate("/empresa/ofertas"); // Redirigir a la lista de ofertas
    } catch (error) {
      console.error("Error al actualizar oferta:", error);
      alert("Error al actualizar la oferta");
    }
  };

  if (!oferta) return <p>Cargando...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Editar Oferta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="titulo"
            value={oferta.titulo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio Regular</label>
          <input
            type="number"
            step="0.01"
            name="precioRegular"
            value={oferta.precioRegular}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio de Oferta</label>
          <input
            type="number"
            step="0.01"
            name="precioOferta"
            value={oferta.precioOferta}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Inicio</label>
          <input
            type="date"
            name="fechaInicio"
            value={new Date(oferta.fechaInicio.seconds * 1000).toISOString().split("T")[0]}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Fin</label>
          <input
            type="date"
            name="fechaFin"
            value={new Date(oferta.fechaFin.seconds * 1000).toISOString().split("T")[0]}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            value={oferta.descripcion}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Otros Detalles</label>
          <textarea
            name="otrosDetalles"
            value={oferta.otrosDetalles}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar para aprobación
        </button>
      </form>
    </div>
  );
};

export default EditOffer;
