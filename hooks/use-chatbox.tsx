import { User } from "@/lib/type";
import { create } from "zustand";

type ChatboxStore = {
  store: {
    currentUser: User;
    friend: User;
  }[];
  onOpen: (currentUser: User, friend: User) => void;
  onClose: (friendId: string) => void;
  onCloseAll: () => void;
};

export const useChatbox = create<ChatboxStore>((set) => ({
  store: [],
  onOpen: (currentUser, friend) =>
    set((state) => ({
      store: state.store.some(
        (item) => item.friend._id === friend._id
      )
        ? state.store
        : [
            ...state.store,
            {
              currentUser,
              friend,
            },
          ],
    })),
  onClose: (_id) =>
    set((state) => ({
      store: state.store.filter(
        (item) => item.friend._id !== _id
      ),
    })),
  onCloseAll: () =>
    set((state) => ({
      store: [],
    })),
}));
