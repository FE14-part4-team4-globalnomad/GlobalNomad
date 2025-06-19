import { create } from "zustand";

interface NotificationStore {
  isOpen: boolean;
  hasNew: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setHasNew: (v: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  isOpen: false,
  hasNew: true,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setHasNew: (v) => set({ hasNew: v }),
}));