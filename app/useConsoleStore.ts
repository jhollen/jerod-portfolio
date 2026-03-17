import { create } from "zustand";

export type PresetMode = "ORIGINAL" | "RETRO" | "HACKER" | null;
export type ThemeMode = "DARK" | "LIGHT";

export interface ConsoleState {
  isBooting: boolean;
  activePreset: PresetMode;
  menuIndex: number;
  tabIndex: number;
  activeSelection: string | null;
  contentDepth: number; // 0-100
  panDepth: number; // 0-100
  theme: ThemeMode;
  logMessages: string[];
  lastInteraction: number;

  setBooting: (booting: boolean) => void;
  setActivePreset: (preset: PresetMode) => void;
  setMenuIndex: (index: number) => void;
  setTabIndex: (index: number) => void;
  setActiveSelection: (id: string | null) => void;
  setContentDepth: (depth: number) => void;
  setPanDepth: (depth: number) => void;
  applyPreset: (preset: PresetMode) => void;
  toggleTheme: () => void;
  addLogMessage: (message: string) => void;
  setLastInteraction: () => void;
}

export const useConsoleStore = create<ConsoleState>((set) => ({
  isBooting: true,
  activePreset: null,
  menuIndex: 0,
  tabIndex: 0,
  activeSelection: null,
  contentDepth: 0,
  panDepth: 0,
  theme: "DARK",
  logMessages: ["SYSTEM BOOT..."],
  lastInteraction: 0,

  setBooting: (booting) => set({ isBooting: booting }),
  setActivePreset: (preset) => set({ activePreset: preset }),
  setMenuIndex: (index) => set({ menuIndex: index }),
  setTabIndex: (index) =>
    set({ tabIndex: index, contentDepth: 0, panDepth: 0 }),
  setActiveSelection: (id) =>
    set({ activeSelection: id, contentDepth: 0, tabIndex: 0, panDepth: 0 }),
  setContentDepth: (depth) =>
    set({ contentDepth: Math.max(0, Math.min(100, depth)) }),
  setPanDepth: (depth) => set({ panDepth: Math.max(0, Math.min(100, depth)) }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "DARK" ? "LIGHT" : "DARK" })),
  addLogMessage: (message) =>
    set((state) => ({
      logMessages: [...state.logMessages.slice(-4), message], // Keep last 5 messages
    })),
  setLastInteraction: () => set({ lastInteraction: Date.now() }),
  applyPreset: (preset) => {
    set((state) => {
      if (state.activePreset === preset) {
        // Toggle off if clicking the already active preset
        return {
          activePreset: null,
          activeSelection: null,
          menuIndex: 0,
          tabIndex: 0,
          contentDepth: 0,
        };
      }
      return { activePreset: preset };
    });
  },
}));
