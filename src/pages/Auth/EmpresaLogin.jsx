import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EmpresaLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

      // Redirigir al dashboard de la empresa
      navigate("/empresa/empleados");
    } catch (err) {
      console.error("Error de login:", err);
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Iniciar sesión - Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="empresa@correo.com"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="********"
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
};

export default EmpresaLogin;
