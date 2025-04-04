import { useState } from "react";
// correcto:
import { db, auth } from "../../firebase"; 

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useEmpresaStore from "../../store/useEmpresaStore";

export default function EmployeeForm() {

  const { empresa } = useEmpresaStore();

  const navigate = useNavigate();
  const auth = getAuth();

  const [empleado, setEmpleado] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
  });

  const handleChange = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  const generarContrasena = () => {
    return Math.random().toString(36).slice(-10); // Ej: 'f83kd9lsq2'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contrasenaGenerada = generarContrasena();

    try {
      // Crear usuario en Auth
      const credenciales = await createUserWithEmailAndPassword(
        auth,
        empleado.correo,
        contrasenaGenerada
      );

      // Guardar datos en Firestore
      const nuevoEmpleado = {
        uid: credenciales.user.uid,
        ...empleado,
        contrasenaTemporal: contrasenaGenerada, // para referencia (luego debería eliminarse)
        rol: "Empleado",
        empresa: empresa.nombre,
        empresaId: empresa.codigo, // Ajustar según sesión actual
        creado: serverTimestamp(),
      };

      await addDoc(collection(db, "empleados"), nuevoEmpleado);

      alert(`Empleado registrado. Contraseña temporal: ${contrasenaGenerada}`);
      navigate("/empresa/empleados");
    } catch (error) {
      console.error("Error al registrar empleado:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container my-5">
    <div className="text-center mb-5">
      <h2 className="fw-bold text-primary">👤 Registrar nuevo empleado</h2>
      <p className="text-muted">
        Ingresa la información para registrar un nuevo empleado
      </p>
    </div>

    <div className="mb-5">
      <div className="bg-light rounded shadow-sm p-4">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombres</label>
          <input
            type="text"
            name="nombres"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 mt-4">
          <button type="submit" className="btn btn-primary">
            Guardar Empleado
          </button>
        </div>
      </form>
      </div>
    </div>
  </div>
  );
}
