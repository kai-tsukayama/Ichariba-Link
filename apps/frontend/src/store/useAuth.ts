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
const STORAGE_VERSION = 'v2';
const SESSION_HOURS = 12;

export const useAuth = create<AuthState>((set) => ({
  token: null,
  userId: null,
  loading: true,
  setAuth: (token, userId) => {
    if (typeof window !== 'undefined') {
      const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, userId, version: STORAGE_VERSION, expiresAt }));
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
      const expired = !parsed.expiresAt || parsed.expiresAt < Date.now();
      const versionMismatch = parsed.version !== STORAGE_VERSION;
      if (expired || versionMismatch) {
        localStorage.removeItem(STORAGE_KEY);
        return set({ token: null, userId: null, loading: false });
      }
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
