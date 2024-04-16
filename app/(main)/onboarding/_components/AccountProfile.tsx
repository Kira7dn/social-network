'use client'

import * as z from 'zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import {
  usePathname,
  useRouter,
} from 'next/navigation'
import {
  ChangeEvent,
  useState,
} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  isBase64Image,
  resizeImage,
  updateClerkUser,
} from '@/lib/utils'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserValidation } from '@/lib/validations'
import { useEdgeStore } from '@/lib/edgestore'
import { User } from '@/lib/type'
import { useUser } from '@clerk/nextjs'
import { clerkClient } from '@clerk/nextjs'

interface Props {
  user: User
  btnTitle: string
}

const AccountProfile = ({
  user,
  btnTitle,
}: Props) => {
  const {
    isSignedIn,
    user: currentUser,
  } = useUser()
  const updateUser = useMutation(
    api.users.update
  )
  const router = useRouter()
  const pathname = usePathname()
  const [file, setFile] =
    useState<File>()
  const { edgestore } = useEdgeStore()
  const form = useForm<
    z.infer<typeof UserValidation>
  >({
    resolver: zodResolver(
      UserValidation
    ),
    defaultValues: {
      profile_photo: user.imageUrl,
      email: user.email,
      fullname: user.fullname ?? '',
      bio: user.bio,
    },
  })

  const onChange = async (
    file: File
  ) => {
    let imageUrl = ''
    if (file) {
      const resizedFile =
        (await resizeImage(
          file,
          400,
          400
        )) as File // Resize to max 800x800
      const res =
        await edgestore.publicFiles.upload(
          {
            file: resizedFile,
          }
        )
      imageUrl = res.url
    }
    return imageUrl
  }

  const onSubmit = async (
    values: z.infer<
      typeof UserValidation
    >
  ) => {
    const blob = values.profile_photo

    const hasImageChanged =
      isBase64Image(blob)
    if (hasImageChanged && file) {
      const imgRes =
        await onChange(file)
      if (imgRes && imgRes) {
        values.profile_photo = imgRes
      }
    }

    await updateUser({
      id: user._id,
      fullname: values.fullname,
      email: values.email,
      imageUrl: values.profile_photo,
      bio: values.bio,
      onboarded: true,
    })

    if (pathname === '/profile/edit') {
      router.back()
    } else {
      router.push('/')
    }
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()
    const fileReader = new FileReader()
    if (
      e.target.files &&
      e.target.files.length > 0
    ) {
      const file = e.target.files[0]
      setFile(file)
      if (!file.type.includes('image'))
        return
      fileReader.onload = async (
        event
      ) => {
        const imageDataUrl =
          event.target?.result?.toString() ||
          ''
        fieldChange(imageDataUrl)
      }
      fileReader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex min-h-36 flex-col justify-start gap-10 px-2"
        onSubmit={form.handleSubmit(
          onSubmit
        )}
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="h-auto w-auto rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={96}
                    height={96}
                    className="h-auto w-auto rounded-full object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-secondary">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="file:text-blue cursor-pointer border-none bg-transparent outline-none"
                  onChange={(e) =>
                    handleImage(
                      e,
                      field.onChange
                    )
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-light-2 text-base-semibold">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-light-2 text-base-semibold">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex h-full w-full flex-col gap-3">
              <FormLabel className="text-light-2 text-base-semibold">
                Bio
              </FormLabel>
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
                  className="max-h-36 w-full resize-none bg-transparent text-base-medium"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={
            !form.formState.isDirty
          }
          className="mx-auto w-2/4"
        >
          {btnTitle}
        </Button>
      </form>
    </Form>
  )
}

export default AccountProfile
