import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type MemberStore = {
  workspaceId?: Id<"workspace">;
  isOpen: boolean;
  onOpen: (workspaceId: Id<"workspace">) => void;
  onClose: () => void;
};

export const useMembers = create<MemberStore>((set) => ({
  workspaceId: undefined,
  isOpen: false,
  onOpen: (workspaceId: Id<"workspace">) =>
    set({ isOpen: true, workspaceId: workspaceId }),
  onClose: () =>
    set({ isOpen: false, workspaceId: undefined }),
}));
