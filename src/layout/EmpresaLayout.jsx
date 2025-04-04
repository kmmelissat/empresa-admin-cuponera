import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Importamos la nueva Navbar
import Footer from "../components/Footer"; // Footer sigue igual

export default function EmpresaLayout() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {/* Navbar que ahora está en la parte superior */}
      <Navbar />
      
      {/* Contenido principal */}
      <div className="container mt-4" style={{ flex: 1 }}>
        {/* Este es el lugar donde el contenido de las páginas se inyectará */}
        <Outlet />
      </div>

      {/* Footer que se mantiene al fondo */}
      <Footer />
    </div>
  );
}
