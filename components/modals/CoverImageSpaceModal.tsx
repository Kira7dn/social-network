'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { useParams } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import { useCoverImage } from '@/hooks/use-cover-image'
import { useEdgeStore } from '@/lib/edgestore'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { resizeImage } from '@/lib/utils'
import { SingleImageDropzone } from '../single-image-dropzone'

export const CoverImageSpaceModal =
  () => {
    const params = useParams()
    const update = useMutation(
      api.workspace.update
    )
    const coverImage = useCoverImage()
    const { edgestore } = useEdgeStore()

    const [file, setFile] =
      useState<File>()
    const [
      isSubmitting,
      setIsSubmitting,
    ] = useState(false)

    const onClose = () => {
      setFile(undefined)
      setIsSubmitting(false)
      coverImage.onClose()
    }

    const onChange = async (
      file?: File
    ) => {
      if (file) {
        setIsSubmitting(true)
        const resizedFile =
          (await resizeImage(
            file,
            800,
            400
          )) as File // Resize to max 800x800
        // setFile(file)

        const res =
          await edgestore.publicFiles.upload(
            {
              file: resizedFile,
              options: {
                replaceTargetUrl:
                  coverImage.url,
              },
            }
          )

        await update({
          id: params.workspaceId as Id<'workspace'>,
          coverImage: res.url,
        })

        onClose()
      }
    }

    return (
      <Dialog
        open={coverImage.isOpen}
        onOpenChange={
          coverImage.onClose
        }
      >
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg text-center font-semibold">
              Change Cover Image
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
    )
  }
