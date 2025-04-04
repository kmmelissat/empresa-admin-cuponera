import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
// correcto:
import { db, auth } from "../../firebase";
import useEmpresaStore from "../../store/useEmpresaStore";


export default function EmployeeList() {
  const [empleados, setEmpleados] = useState([]);
  const { empresa } = useEmpresaStore();


  useEffect(() => {
    const cargarEmpleados = async () => {
      if (!empresa) return;

      const q = query(
        collection(db, "empleados"),
        where("empresaId", "==", empresa.codigo)
      );

      const querySnapshot = await getDocs(q);
      const resultado = [];
      querySnapshot.forEach((doc) => {
        resultado.push({ id: doc.id, ...doc.data() });
      });
      setEmpleados(resultado);
    };

    cargarEmpleados();
  }, [empresa]);

  return (

    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">👥 Empleados Registrados</h2>
        <p className="text-muted">
          Visualiza la información de los empleados registrados
        </p>
      </div>

      <div className="mb-5">
        <div className="bg-light rounded shadow-sm p-4">
          {empleados.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Nombre completo</th>
                    <th>Correo</th>
                    <th>Registrado</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.nombres} {emp.apellidos}</td>
                      <td>{emp.correo}</td>
                      <td>
                        {emp.creado?.seconds
                          ? new Date(emp.creado.seconds * 1000).toLocaleDateString()
                          : "Sin fecha"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No hay empleados registrados.</p>
          )}
        </div>
      </div>
    </div>
  )
}
