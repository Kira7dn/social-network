"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useIconImage } from "@/hooks/use-icon-image";
import { resizeImage } from "@/lib/utils";

export const IconImageSpaceModal = () => {
  const params = useParams();
  const update = useMutation(api.workspace.update);
  const iconImage = useIconImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    iconImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      const resizedFile = (await resizeImage(
        file,
        400,
        400
      )) as File; // Resize to max 800x800
      const res = await edgestore.publicFiles.upload({
        file: resizedFile,
        options: {
          replaceTargetUrl: iconImage.iconUrl,
        },
      });

      await update({
        id: params.workspaceId as Id<"workspace">,
        iconImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog
      open={iconImage.isOpen}
      onOpenChange={iconImage.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Icon Image
          </h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
