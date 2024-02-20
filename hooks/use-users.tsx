import { User } from "@/lib/type";
import { create } from "zustand";

type ChatboxStore = {
  store: User[];
  onLoaded: (users: User[]) => void;
};
export const useUsers = create<ChatboxStore>((set) => ({
  store: [],
  onLoaded: (users) =>
    set((state) =>
      state.store.length > 0
        ? state
        : {
            store: [...users],
          }
    ),
}));
