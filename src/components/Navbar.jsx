import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Asegúrate de tener la configuración de Firebase importada
import useEmpresaStore from "../store/useEmpresaStore";

const Navbar = () => {
  const { empresa } = useEmpresaStore();
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirigir al usuario al inicio
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient p-3 shadow-sm">
      <div className="container-fluid">
        <Link to="/empresa/empleados" className="navbar-brand text-black fs-4">
          <strong>{empresa?.nombre || "La Cuponera"}</strong>
        </Link>
        <div id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/empresa/empleados" className="nav-link text-gray-600 fw-bold hover-effect">Empleados</Link>
            </li>
            <li className="nav-item">
              <Link to="/empresa/ofertas" className="nav-link text-gray-600 fw-bold hover-effect">Cupones</Link>
            </li>
            <li className="nav-item">
              <Link to="/empresa/empleados/nuevo" className="nav-link text-gray-600 fw-bold hover-effect">Nuevo empleado</Link>
            </li>
            <li className="nav-item">
              <Link to="/empresa/ofertas/nueva" className="nav-link text-gray-600 fw-bold hover-effect">Nueva oferta</Link>
            </li>
          </ul>
        </div>
        <div>
        <ul className="navbar-nav ms-auto">
        <li className="nav-item">
              <button 
                className="nav-link text-gray-600 fw-bold hover-effect bg-transparent border-0" 
                onClick={handleLogout}
              >Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
