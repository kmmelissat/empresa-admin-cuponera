import { Navigate, Outlet } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const [validando, setValidando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const empresaDoc = await getDoc(doc(db, "empresas", user.uid));
        if (empresaDoc.exists() && empresaDoc.data().rol === "empresa") {
          setAutorizado(true);
        }
      }
      setValidando(false);
    });

    return () => unsubscribe();
  }, []);

  if (validando) return <p className="text-center mt-5">Cargando...</p>;

  return autorizado ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
