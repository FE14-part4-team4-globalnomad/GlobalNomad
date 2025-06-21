import { create } from "zustand";

interface NotificationStore {
  hasNew: boolean;
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  setHasNew: (value: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  hasNew: false,
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  setHasNew: (value) => set({ hasNew: value }),
}));
