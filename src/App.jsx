import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaOfertas from "./pages/Ofertas/ListaOfertas";
import CrearOferta from "./pages/EmpresaAdmin/Ofertas/CrearOferta";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/empresa" element={<EmpresaLayout />}>
  <Route index element={<DashboardEmpresa />} />
  <Route path="ofertas" element={<ListaOfertas />} />
  <Route path="ofertas/nueva" element={<CrearOferta />} />
  <Route path="empleados" element={<ListaEmpleados />} />
</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
