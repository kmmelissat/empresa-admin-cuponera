import { Outlet, Link } from "react-router-dom";

export default function EmpresaLayout() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Panel de Empresa</h1>

      <nav className="mb-4 d-flex flex-wrap gap-2">
        {/* Empleados */}
        <Link to="/empresa/empleados" className="btn btn-outline-primary">
          Ver empleados
        </Link>
        <Link to="/empresa/empleados/nuevo" className="btn btn-outline-success">
          Nuevo empleado
        </Link>

        {/* Ofertas */}
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
