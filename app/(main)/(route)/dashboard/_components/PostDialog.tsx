import { SingleImageDropzone } from '@/components/single-image-dropzone'
import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/convex/_generated/api'
import { useCurrentUser } from '@/hooks/use-currrent-user'
import { useEdgeStore } from '@/lib/edgestore'
import { Post } from '@/lib/type'
import { resizeImage } from '@/lib/utils'
import { PostValidation } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

type Props = {
  isOpen: boolean
  onClose: () => void
  post?: Post
}

export function PostDialog({
  isOpen,
  onClose,
  post,
}: Props) {
  const currentUser = useCurrentUser()
  const create = useMutation(
    api.posts.create
  )
  const form = useForm<
    z.infer<typeof PostValidation>
  >({
    resolver: zodResolver(
      PostValidation
    ),
    defaultValues: {
      content: post?.content || '',
    },
  })
  const { edgestore } = useEdgeStore()

  const [file, setFile] =
    useState<File>()
  const handleClose = () => {
    form.reset()
    onClose()
    setFile(undefined)
  }
  const onSubmit = async (
    values: z.infer<
      typeof PostValidation
    >
  ) => {
    onClose()
    let imageUrl = ''
    if (file) {
      const resizedFile =
        (await resizeImage(
          file,
          800,
          800
        )) as File // Resize to max 800x800
      const res =
        await edgestore.publicFiles.upload(
          {
            file: resizedFile,
          }
        )
      imageUrl = res.url
    }
    const promise = create({
      image: imageUrl
        ? imageUrl
        : undefined,
      content: values.content,
    })
    form.reset()
    setFile(undefined)
    toast.promise(promise, {
      loading:
        'Creating or Updating Post...',
      success:
        'Post created/updated successfully!',
      error:
        'Failed to create/update Post',
    })
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleClose}
    >
      <DialogContent className="p-0 sm:w-[500px]">
        <DialogHeader className=" h-14 items-center border-b">
          <DialogTitle className="my-auto text-large-semibold">
            Create your Post
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="mx-4 flex items-center space-x-2">
          {currentUser?.user
            ?.imageUrl && (
            <Avatar>
              <AvatarImage
                src={
                  currentUser?.user
                    ?.imageUrl
                }
              />
            </Avatar>
          )}
          <p className="text-base-semibold">
            {
              currentUser?.user
                ?.fullname
            }
          </p>
        </DialogDescription>
        <Form {...form}>
          <form
            className="flex min-h-36 flex-col justify-start gap-4 px-2"
            onSubmit={form.handleSubmit(
              onSubmit
            )}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Textarea
                      rows={Math.max(
                        field.value.split(
                          '\n'
                        ).length,
                        Math.ceil(
                          field.value
                            .length / 52
                        )
                      )}
                      {...field}
                      className="max-h-36 w-full resize-none border-none bg-transparent text-base-medium focus-visible:border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:!ring-opacity-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="mt-4 flex justify-between">
                <div className="relative h-8 w-8 cursor-pointer shadow-sm">
                  <Image
                    src="/assets/image.png"
                    fill
                    alt="image"
                  />
                </div>
                <div className="relative h-8 w-8 cursor-pointer shadow-sm">
                  <Image
                    src="/assets/emoji.png"
                    fill
                    alt="emoji"
                  />
                </div>
              </div>
              <SingleImageDropzone
                className="mx-auto mt-4 w-full"
                value={file}
                onChange={(file) => {
                  setFile(file)
                }}
              />
            </div>

            <DialogFooter className="p-2">
              <Button
                type="submit"
                disabled={
                  !form.formState
                    .isDirty
                }
                className="mx-auto w-2/4"
              >
                Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
