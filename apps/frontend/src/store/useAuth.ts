import { create } from 'zustand';

type AuthState = { userId: string; setUserId: (id: string) => void };

export const useAuth = create<AuthState>((set) => ({
  userId: '',
  setUserId: (id) => set({ userId: id }),
}));
