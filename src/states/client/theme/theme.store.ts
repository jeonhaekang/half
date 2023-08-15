import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  theme: boolean;
  toggle: VoidFunction;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: true,
      toggle: () => set((prevState) => ({ ...prevState, theme: !prevState.theme }))
    }),
    {
      name: "theme"
    }
  )
);
