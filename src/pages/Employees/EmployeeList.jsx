import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
// correcto:
import { db, auth } from "../../firebase"; 

export default function EmployeeList() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const cargarEmpleados = async () => {
      const q = query(
        collection(db, "empleados"),
        where("empresaId", "==", "empresaX123") // ← reemplazar por ID real del usuario logueado
      );

      const querySnapshot = await getDocs(q);
      const resultado = [];
      querySnapshot.forEach((doc) => {
        resultado.push({ id: doc.id, ...doc.data() });
      });
      setEmpleados(resultado);
    };

    cargarEmpleados();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Empleados Registrados</h2>
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
  );
}
