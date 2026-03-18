import { create } from "zustand";

export type PresetMode = "ORIGINAL" | "RETRO" | "HACKER" | null;
export type ThemeMode = "DARK" | "LIGHT";

export interface ConsoleState {
  isBooting: boolean;
  activePreset: PresetMode;
  menuIndex: number;
  tabIndex: number;
  activeSelection: string | null;
  selectedProject: string | null;
  contentDepth: number; // 0-100
  panDepth: number; // 0-100
  theme: ThemeMode;
  logMessages: string[];
  lastInteraction: number;
  navActivity: number;
  tabActivity: number;

  setBooting: (booting: boolean) => void;
  setActivePreset: (preset: PresetMode) => void;
  setMenuIndex: (index: number) => void;
  setTabIndex: (index: number) => void;
  setActiveSelection: (id: string | null) => void;
  setSelectedProject: (id: string | null) => void;
  setContentDepth: (depth: number) => void;
  setPanDepth: (depth: number) => void;
  applyPreset: (preset: PresetMode) => void;
  toggleTheme: () => void;
  addLogMessage: (message: string) => void;
  setLastInteraction: () => void;
  triggerNavSpike: (val?: number) => void;
  triggerTabSpike: (val?: number) => void;
  setNavActivity: (val: number) => void;
  setTabActivity: (val: number) => void;
}

export const useConsoleStore = create<ConsoleState>((set) => ({
  isBooting: true,
  activePreset: null,
  menuIndex: 0,
  tabIndex: 0,
  activeSelection: null,
  selectedProject: null,
  contentDepth: 0,
  panDepth: 0,
  theme: "DARK",
  logMessages: ["SYSTEM BOOT..."],
  lastInteraction: 0,
  navActivity: 0,
  tabActivity: 0,

  setBooting: (booting) => set({ isBooting: booting }),
  setActivePreset: (preset) => set({ activePreset: preset }),
  setMenuIndex: (index) => set({ menuIndex: index }),
  setTabIndex: (index) =>
    set({ tabIndex: index, contentDepth: 0, panDepth: 0 }),
  setActiveSelection: (id) =>
    set({ activeSelection: id, contentDepth: 0, tabIndex: 0, panDepth: 0, selectedProject: null }),
  setSelectedProject: (id) =>
    set({ selectedProject: id, tabIndex: 0, contentDepth: 0 }),
  setContentDepth: (depth) =>
    set({ contentDepth: Math.max(0, Math.min(100, depth)) }),
  setPanDepth: (depth) => set({ panDepth: Math.max(0, Math.min(100, depth)) }),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "DARK" ? "LIGHT" : "DARK" })),
  addLogMessage: (message) =>
    set((state) => ({
      logMessages: [...state.logMessages.slice(-14), message],
    })),
  setLastInteraction: () => set({ lastInteraction: Date.now() }),
  triggerNavSpike: (val) => set({ navActivity: val ?? 40 + Math.random() * 55 }),
  triggerTabSpike: (val) => set({ tabActivity: val ?? 40 + Math.random() * 55 }),
  setNavActivity: (val) => set({ navActivity: val }),
  setTabActivity: (val) => set({ tabActivity: val }),
  applyPreset: (preset) => {
    set((state) => {
      if (state.activePreset === preset) {
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
