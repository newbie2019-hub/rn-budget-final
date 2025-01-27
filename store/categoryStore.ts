import {create} from 'zustand';
import { MMKV } from 'react-native-mmkv';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Categories } from '@/db/schema';

// Initialize MMKV storage
const storage = new MMKV();

// Create a Zustand store with persistence
type CategoryState = {
  categories: Categories[];
  setCategories: (categories: Categories[]) => void;
};

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [], // Default currency
      setCategories: (categories) => set({ categories }),
    }),
    {
      name: 'category-store', // Storage key
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
