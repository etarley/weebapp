import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

const storage: StateStorage = {
  getItem: async (key) => {
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key) => {
    await SecureStore.deleteItemAsync(key);
  },
};

// interface User {
//   id: string;
//   email: string;
// }

interface AuthState {
  // user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  signIn: (
    token: string,
    // user: User
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // user: null,
      token: null,
      isLoading: false,
      error: null,
      signIn: async (
        token: string,
        // user: User
      ) => {
        set({ isLoading: true });
        try {
          await SecureStore.setItemAsync("token", token);
          // await SecureStore.setItemAsync("user", JSON.stringify(user));
          set({
            token,
            // user,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({ isLoading: false, error: `Failed to sign in: ${error}` });
        }
      },
      signOut: async () => {
        set({ isLoading: true });
        try {
          await SecureStore.deleteItemAsync("token");
          await SecureStore.deleteItemAsync("user");
          set({
            token: null,
            // user: null,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({ isLoading: false, error: `Failed to sign out: ${error}` });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        token: state.token,
        // user: state.user
      }),
    },
  ),
);

export function useAuth() {
  const {
    // user,
    token,
    isLoading,
    error,
    signIn,
    signOut,
  } = useAuthStore();
  return {
    // user,
    token,
    isLoading,
    error,
    signIn,
    signOut,
  };
}
