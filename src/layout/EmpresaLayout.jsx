import { Outlet, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import useEmpresaStore from "../store/useEmpresaStore";

export default function EmpresaLayout() {
  const navigate = useNavigate();
  const { cerrarSesion } = useEmpresaStore();

  const handleLogout = async () => {
    await signOut(auth);
    cerrarSesion();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Panel de Empresa</h1>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <nav className="mb-4 d-flex flex-wrap gap-2">
        <Link to="/empresa/empleados" className="btn btn-outline-primary">
          Ver empleados
        </Link>
        <Link to="/empresa/empleados/nuevo" className="btn btn-outline-success">
          Nuevo empleado
        </Link>
        <Link to="/empresa/ofertas" className="btn btn-outline-secondary">
          Ver ofertas
        </Link>
        <Link to="/empresa/ofertas/nueva" className="btn btn-outline-dark">
          Crear oferta
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}
