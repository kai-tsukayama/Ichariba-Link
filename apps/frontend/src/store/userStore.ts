import { create } from "zustand";
import { User } from "@/app/interfaces/User";
import { seedUser } from "@/app/seeds/LoginUserSeed";

type UserStore = {
    currentUser: User;
    setUser: (user: User) => void;
    updateUser: (user: Partial<User>) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    // Initialize with the first seed user. 
    // In a real app, this would be null or fetched from an API/Auth provider.
    currentUser: seedUser[0],

    setUser: (user) => set({ currentUser: user }),

    updateUser: (updatedFields) =>
        set((state) => ({
            currentUser: { ...state.currentUser, ...updatedFields },
        })),
}));
