import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function OfferList() {
  const [cupones, setCupones] = useState([]);
  const porcentajeComision = 0.1; // ← Esto deberías sacarlo de la empresa (hardcodeado por ahora)
  const hoy = new Date();

  useEffect(() => {
    const cargarCupones = async () => {
      const q = query(collection(db, "cupones"), where("empresaId", "==", "empresaX123"));
      const querySnapshot = await getDocs(q);
      const resultado = [];
      querySnapshot.forEach((doc) => {
        resultado.push({ id: doc.id, ...doc.data() });
      });
      setCupones(resultado);
    };

    cargarCupones();
  }, []);

  // Categorizar las ofertas
  const categorias = {
    "En espera de aprobación": [],
    "Aprobadas futuras": [],
    "Activas": [],
    "Pasadas": [],
    "Rechazadas": [],
    "Descartadas": [],
  };

  cupones.forEach((cupon) => {
    const estado = cupon.estado;
    const inicio = cupon.fechaInicio?.toDate?.() || new Date(cupon.fechaInicio);
    const fin = cupon.fechaFin?.toDate?.() || new Date(cupon.fechaFin);

    if (estado === "En espera de aprobación") {
      categorias["En espera de aprobación"].push(cupon);
    } else if (estado === "Oferta aprobada") {
      if (hoy < inicio) {
        categorias["Aprobadas futuras"].push(cupon);
      } else if (hoy >= inicio && hoy <= fin) {
        categorias["Activas"].push(cupon);
      } else if (hoy > fin) {
        categorias["Pasadas"].push(cupon);
      }
    } else if (estado === "Oferta rechazada") {
      categorias["Rechazadas"].push(cupon);
    } else if (estado === "Oferta descartada") {
      categorias["Descartadas"].push(cupon);
    }
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mis Cupones</h2>

      {Object.entries(categorias).map(([categoria, lista]) => (
        <div key={categoria} className="mb-5">
          <h4 className="mb-3">{categoria}</h4>
          {lista.length === 0 ? (
            <p className="text-muted">No hay ofertas en esta categoría.</p>
          ) : (
            <div className="row">
              {lista.map((cupon) => {
                const vendidos = cupon.cuponesVendidos || 0;
                const disponibles =
                  cupon.cantidadLimite != null ? cupon.cantidadLimite - vendidos : "∞";
                const ingresos = vendidos * cupon.precioOferta;
                const comision = ingresos * porcentajeComision;

                return (
                  <div className="col-md-4 mb-4" key={cupon.id}>
                    <div className="card h-100">
                      <img
                        src={`/img/${cupon.imagen || "default.jpg"}`}
                        className="card-img-top"
                        alt={cupon.titulo}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="card-title">{cupon.titulo}</h5>
                          <p className="card-text text-muted">{cupon.descripcion}</p>
                          <p>
                            <strong>${cupon.precioOferta}</strong>{" "}
                            <span className="text-muted ms-2">
                              <del>${cupon.precioRegular}</del>
                            </span>
                          </p>
                        </div>
                        <ul className="list-group mt-3">
                          <li className="list-group-item">
                            <strong>Vendidos:</strong> {vendidos}
                          </li>
                          <li className="list-group-item">
                            <strong>Disponibles:</strong> {disponibles}
                          </li>
                          <li className="list-group-item">
                            <strong>Ingresos:</strong> ${ingresos.toFixed(2)}
                          </li>
                          <li className="list-group-item">
                            <strong>Comisión:</strong> ${comision.toFixed(2)}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
