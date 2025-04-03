import { Outlet, Link } from "react-router-dom";

export default function EmpresaLayout() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Panel de Empresa</h1>
      <nav className="mb-4">
        <Link to="/empresa/empleados" className="btn btn-outline-primary me-2">
          Ver empleados
        </Link>
        <Link to="/empresa/empleados/nuevo" className="btn btn-outline-success">
          Nuevo empleado
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
