import { create } from 'zustand';

// Cargar desde localStorage si existe
const storedEmpresa = localStorage.getItem("empresa");

const useEmpresaStore = create((set) => ({
  empresa: storedEmpresa ? JSON.parse(storedEmpresa) : null,

  setEmpresa: (empresaData) => {
    localStorage.setItem("empresa", JSON.stringify(empresaData));
    set({ empresa: empresaData });
  },

  cerrarSesion: () => {
    localStorage.removeItem("empresa");
    set({ empresa: null });
  }
}));

export default useEmpresaStore;
