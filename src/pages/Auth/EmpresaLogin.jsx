import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase"; // Asegúrate de tener la configuración de Firebase importada
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useEmpresaStore from "../../store/useEmpresaStore";

const EmpresaLogin = () => {
  const { setEmpresa } = useEmpresaStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
      const uid = cred.user.uid;

      const empresaDoc = await getDoc(doc(db, "empresas", uid));

      if (!empresaDoc.exists()) {
        setError("No tienes permisos para acceder.");
        return;
      }

      const empresa = empresaDoc.data();
      if (empresa.rol !== "empresa") {
        setError("Tu cuenta no tiene el rol autorizado.");
        return;
      }

      // Guardar empresa en el store y localStorage
      setEmpresa({ ...empresa, id: uid });
      localStorage.setItem("empresa", JSON.stringify({ ...empresa, id: uid }));

      // Redirigir al dashboard de la empresa
      navigate("/empresa/empleados");
    } catch (err) {
      console.error("Error de login:", err);
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 flex-column">
      <h1 className="text-center text-danger fw-bold mb-4">
        La Cuponera Empresa 🎟️
      </h1>

      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 text-danger">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="empresa@cuponera.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-danger w-100">
            Entrar
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-center text-muted mt-4" style={{ fontSize: "0.9rem" }}>
        © 2025 La Cuponera. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default EmpresaLogin;
