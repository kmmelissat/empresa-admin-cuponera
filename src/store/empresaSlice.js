import { create } from 'zustand';

export const useEmpresaStore = create((set) => ({
  empresas: [],
  setEmpresas: (nuevasEmpresas) => set({ empresas: nuevasEmpresas }),
}));
