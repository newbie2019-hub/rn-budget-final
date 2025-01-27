import {create} from 'zustand';
import { MMKV } from 'react-native-mmkv';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Wallets } from '@/db/schema';

// Initialize MMKV storage
const storage = new MMKV();

// Create a Zustand store with persistence
type WalletState = {
  wallets: Wallets[];
  setWallets: (wallets: Wallets[]) => void;
};

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      wallets: [], // Default currency
      setWallets: (wallets) => set({ wallets }),
    }),
    {
      name: 'wallet-store', // Storage key
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
