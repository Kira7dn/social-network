"use client";

import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMembers } from "@/hooks/use-members";
import { useEffect, useState } from "react";
import { User } from "@/lib/type";
import { getUsers } from "../action/action";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

export const MemberModal = () => {
  let [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  const params = useParams();
  const update = useMutation(api.workspace.update);
  const memberModal = useMembers();

  const onClose = () => {
    memberModal.onClose();
  };

  const onChangeAdd = async (member?: string) => {
    if (member) {
      await update({
        id: params.workspaceId as Id<"workspace">,
        members: [member, ...(memberModal.members ?? [])],
      });
    }
  };
  const onChangeRemove = async (member?: string) => {
    if (member) {
      await update({
        id: params.workspaceId as Id<"workspace">,
        members: (memberModal.members ?? []).filter(
          (m) => m !== member
        ),
      });
    }
  };
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <Dialog
      open={memberModal.isOpen}
      onOpenChange={memberModal.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Member List
          </h2>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 p-3 bg-card rounded-lg shadow-sm h-full"
          >
            <p className="text-large-bold ">Contacts</p>
            <div className="flex flex-col gap-2 py-2 overflow-y-auto scrollbar-style-1">
              {users.map((user) => {
                const { id, name, imageUrl } = user;
                return (
                  <div
                    className="flex justify-between items-center gap-2 cursor-pointer hover:bg-lightGray rounded-xl px-2"
                    key={id}
                    // onClick={() => onOpen(id, name, imageUrl)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="border-2 border-lightGray">
                          <AvatarImage src={imageUrl} />
                          <AvatarFallback>
                            {name}
                          </AvatarFallback>
                        </Avatar>
                        <div className="w-3 h-3 absolute right-[1px] bottom-[-1px] rounded-full bg-green border-2 border-white"></div>
                      </div>
                      <p className="text-body-normal capitalize text-ellipsis">
                        {name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
