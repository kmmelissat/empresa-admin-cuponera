import { create } from 'zustand';

const useEmpresaStore = create((set) => ({
  empresa: null,
  setEmpresa: (empresaData) => set({ empresa: empresaData }),
}));

export default useEmpresaStore;
