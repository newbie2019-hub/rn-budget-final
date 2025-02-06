import {create} from 'zustand';
import { MMKV } from 'react-native-mmkv';
import { persist, createJSONStorage } from 'zustand/middleware';

// Initialize MMKV storage
const storage = new MMKV();

// Create a Zustand store with persistence
type AppState = {
  currency: string;
  maskedValue: boolean;
  theme: 'light' | 'dark';
  setCurrency: (currency: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setMaskedValue: (maskedValue: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currency: 'USD', // Default currency
      theme: 'light',  // Default theme
      maskedValue: false,
      setCurrency: (currency) => set({ currency }),
      setTheme: (theme) => set({ theme }),
      setMaskedValue: (maskedValue) => set({ maskedValue }),
    }),
    {
      name: 'app-store', // Storage key
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const value = storage.getString(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          storage.set(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          storage.delete(key);
        },
      })),
    }
  )
);
