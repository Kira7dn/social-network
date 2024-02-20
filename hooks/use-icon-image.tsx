import { create } from "zustand";

type IconImageStore = {
  iconUrl?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (iconUrl: string) => void;
};

export const useIconImage = create<IconImageStore>(
  (set) => ({
    iconUrl: undefined,
    isOpen: false,
    onOpen: () => set({ isOpen: true, iconUrl: undefined }),
    onClose: () =>
      set({ isOpen: false, iconUrl: undefined }),
    onReplace: (iconUrl: string) =>
      set({ isOpen: true, iconUrl }),
  })
);
