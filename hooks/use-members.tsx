import { create } from "zustand";

type MemberStore = {
  members?: string[];
  isOpen: boolean;
  onOpen: (members?: string[]) => void;
  onClose: () => void;
  onReplace: (url: string[]) => void;
};

export const useMembers = create<MemberStore>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: (members?: string[]) =>
    set({ isOpen: true, members: members }),
  onClose: () => set({ isOpen: false, members: undefined }),
  onReplace: (members: string[]) =>
    set({ isOpen: true, members }),
}));
