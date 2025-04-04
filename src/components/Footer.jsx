import React from "react";

const Footer = () => {
  return (
    <footer className="text-black py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-0">© {new Date().getFullYear()} La Cuponera - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
