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
  // Individual Tier Persistence
  bioTier: number;      // 1, 2, or 3
  projectsTier: number; // 1, 2, or 3
  stackTier: number;    // 1, 2, or 3
  activeCategoryIndex: number; // For filtering projects index
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
  setTier: (tier: number) => void; // Updates active selection's tier
  setActiveCategoryIndex: (index: number) => void;
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

export const useConsoleStore = create<ConsoleState>((set, get) => ({
  isBooting: true,
  activePreset: null,
  menuIndex: 0,
  tabIndex: 0,
  activeSelection: null,
  selectedProject: null,
  bioTier: 1,
  projectsTier: 1,
  stackTier: 1,
  activeCategoryIndex: 0,
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
    set({ tabIndex: index, panDepth: 0 }),
  setActiveSelection: (id) =>
    set({ activeSelection: id, tabIndex: 0, panDepth: 0, selectedProject: null, activeCategoryIndex: 0 }),
  setSelectedProject: (id) =>
    set({ selectedProject: id, tabIndex: 0 }),
  setTier: (tier) => {
    const { activeSelection } = get();
    const clampedTier = Math.max(1, Math.min(3, tier));
    if (activeSelection === "BIO") set({ bioTier: clampedTier });
    if (activeSelection === "PROJECTS") set({ projectsTier: clampedTier });
    if (activeSelection === "STACK") set({ stackTier: clampedTier });
  },
  setActiveCategoryIndex: (index) => set({ activeCategoryIndex: index }),
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
          bioTier: 1,
          projectsTier: 1,
          stackTier: 1,
          activeCategoryIndex: 0,
        };
      }
      return { activePreset: preset };
    });
  },
}));
