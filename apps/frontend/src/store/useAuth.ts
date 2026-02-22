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
const SESSION_HOURS = 0; // persistence無効化

export const useAuth = create<AuthState>((set) => ({
  token: null,
  userId: null,
  loading: true,
  setAuth: (token, userId) => {
    // 永続化しない：起動・リロード時は毎回ログインを要求
    set({ token, userId, loading: false });
  },
  clear: () => {
    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
    set({ token: null, userId: null, loading: false });
  },
  hydrate: () => {
    // 永続化を行わないが、既にメモリ上にトークンがある場合はそれを保持
    set((state) => {
      if (state.token) return { loading: false };
      return { token: null, userId: null, loading: false };
    });
  },
}));
