"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "../modals/SettingModal";
import { CoverImageSpaceModal } from "../modals/CoverImageSpaceModal";
import { IconImageSpaceModal } from "../modals/IconImageSpaceModal";
import { MemberModal } from "../modals/MemberModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageSpaceModal />
      <IconImageSpaceModal />
      <MemberModal />
    </>
  );
};
