import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import EmpresaLayout from "./layout/EmpresaLayout";

// Empleados
import EmployeeList from "./pages/Employees/EmployeeList";
import EmployeeForm from "./pages/Employees/EmployeeForm";

// Cupones (ofertas)
import OfferList from "./pages/Offers/OfferList";
import CreateOffer from "./pages/Offers/CreateOffer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/empresa" element={<EmpresaLayout />}>
          {/* Empleados */}
          <Route path="empleados" element={<EmployeeList />} />
          <Route path="empleados/nuevo" element={<EmployeeForm />} />

          {/* Ofertas */}
          <Route path="ofertas" element={<OfferList />} />
          <Route path="ofertas/nueva" element={<CreateOffer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
