import { User } from "@/lib/type";
import { create } from "zustand";

type CurrentUserStore = {
  user?: User;
  onLoaded: (user: User) => void;
};
export const useCurrentUser = create<CurrentUserStore>(
  (set) => ({
    onLoaded: (user) => set({ user: user }),
  })
);
