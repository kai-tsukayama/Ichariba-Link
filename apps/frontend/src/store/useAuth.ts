import { create } from 'zustand';

type AuthState = {
  token: string | null;
  userId: string | null;
  loading: boolean;
  setAuth: (token: string, userId: string) => void;
  clear: () => void;
  hydrate: () => void;
};

const STORAGE_KEY = 'ichariba-auth';

export const useAuth = create<AuthState>((set) => ({
  token: null,
  userId: null,
  loading: true,
  setAuth: (token, userId) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, userId }));
    }
    set({ token, userId, loading: false });
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    set({ token: null, userId: null, loading: false });
  },
  hydrate: () => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return set({ loading: false });
    try {
      const parsed = JSON.parse(stored);
      set({
        token: parsed.token ?? null,
        userId: parsed.userId ?? null,
        loading: false,
      });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      set({ token: null, userId: null, loading: false });
    }
  },
}));
