import * as SecureStore from "expo-secure-store";
import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storage = new MMKV();

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      signIn: async (token: string, user: User) => {
        set({ isLoading: true });
        try {
          await SecureStore.setItemAsync("token", token);
          storage.set("user", JSON.stringify(user));
          set({ token, user, isLoading: false, error: null });
        } catch (error) {
          set({ isLoading: false, error: `Failed to sign in: ${error}` });
        }
      },
      signOut: async () => {
        set({ isLoading: true });
        try {
          await SecureStore.deleteItemAsync("token");
          storage.delete("user");
          set({ token: null, user: null, isLoading: false, error: null });
        } catch (error) {
          set({ isLoading: false, error: `Failed to sign out: ${error}` });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          if (name === "token") {
            return await SecureStore.getItemAsync(name);
          }
          return storage.getString(name) || null;
        },
        setItem: async (name, value) => {
          if (name === "token") {
            await SecureStore.setItemAsync(name, value);
          } else {
            storage.set(name, value);
          }
        },
        removeItem: async (name) => {
          if (name === "token") {
            await SecureStore.deleteItemAsync(name);
          } else {
            storage.delete(name);
          }
        },
      })),
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);

export function useAuth() {
  const { user, token, isLoading, error, signIn, signOut } = useAuthStore();
  return { user, token, isLoading, error, signIn, signOut };
}
