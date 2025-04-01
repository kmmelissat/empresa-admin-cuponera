import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-5">
      <nav className="space-y-4">
        <Link to="/admin" className="block font-bold">Dashboard</Link>
        <Link to="/admin/empresas" className="block">Empresas</Link>
        <Link to="/admin/ofertas" className="block">Ofertas</Link>
        <Link to="/admin/rubros" className="block">Rubros</Link>
      </nav>
    </aside>
  );
}
