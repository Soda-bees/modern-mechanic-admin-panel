import { create } from 'zustand';

export const useAuth = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));
