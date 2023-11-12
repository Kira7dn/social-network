import { create } from "zustand";

type ChatboxStore = {
  store: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  onOpen: (id: string, name: string, imageUrl: string) => void;
  onClose: (id: string) => void;
  onCloseAll: () => void;
};

export const useChatbox = create<ChatboxStore>((set) => ({
  store: [],
  onOpen: (id, name, imageUrl) =>
    set((state) =>
      state.store.find((item) => item.id === id)
        ? state
        : {
            store: [...state.store, { id, name, imageUrl }],
          }
    ),
  onClose: (id) =>
    set((state) => ({
      store: state.store.filter((item) => item.id !== id),
    })),
  onCloseAll: () =>
    set((state) => ({
      store: [],
    })),
}));
