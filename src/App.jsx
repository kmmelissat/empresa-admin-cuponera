import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmpresaLayout from "./layout/EmpresaLayout";

import EmployeeList from "./pages/Employees/EmployeeList";
import EmployeeForm from "./pages/Employees/EmployeeForm";

import OfferList from "./pages/Offers/OfferList";
import CreateOffer from "./pages/Offers/CreateOffer";
import EditOffer from "./pages/Offers/EditOffer";
import EmpresaLogin from "./pages/Auth/EmpresaLogin";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login público */}
        <Route path="/" element={<EmpresaLogin />} />

        {/* Rutas privadas para empresas */}
        <Route path="/empresa" element={<PrivateRoute />}>
          <Route element={<EmpresaLayout />}>
            <Route path="empleados" element={<EmployeeList />} />
            <Route path="empleados/nuevo" element={<EmployeeForm />} />
            <Route path="ofertas" element={<OfferList />} />
            <Route path="ofertas/nueva" element={<CreateOffer />} />
            <Route path="ofertas/editar/:id" element={<EditOffer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
