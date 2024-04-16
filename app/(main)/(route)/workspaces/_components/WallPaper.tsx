'use client'

import Image from 'next/image'
import {
  ImageIcon,
  SmileIcon,
  Trash2Icon,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCoverImage } from '@/hooks/use-cover-image'
import { useIconImage } from '@/hooks/use-icon-image'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Title } from './Title'
import { Name } from './Name'
import {
  useParams,
  useRouter,
} from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { toast } from 'sonner'

interface CoverImageProps {
  url?: string
  icon?: string
  name?: string
  title?: string
}

const WallPaper = ({
  url,
  icon,
  name,
  title,
}: CoverImageProps) => {
  const param = useParams()
  const remove = useMutation(
    api.workspace.remove
  )
  const coverImage = useCoverImage()
  const iconImage = useIconImage()
  const router = useRouter()
  const onDelete = () => {
    if (param.workspaceId) {
      router.push('/workspaces')
      const promise = remove({
        id: param.workspaceId as Id<'workspace'>,
      })
      toast.promise(promise, {
        loading:
          'Deleting workspace...',
        success:
          'New workspace deleted!',
        error:
          'Failed to delete workspace.',
      })
    }
  }

  return (
    <div
      className={cn(
        'border-muted-foreground group relative h-40 w-full border-b-[1px] bg-gradient-to-b '
      )}
    >
      {!!url && (
        <Image
          src={url}
          fill
          alt="Cover"
          className="object-cover opacity-30 dark:opacity-60"
        />
      )}
      <div className="absolute bottom-4 left-2 flex items-center gap-2 md:left-16 md:gap-9">
        <Avatar className="h-14 w-14 border-[3px] border-card shadow-sm shadow-secondary md:h-24 md:w-24">
          <AvatarImage
            src={icon}
            className="border-[1px] border-secondary object-cover"
          />
          <AvatarFallback className="bg-card"></AvatarFallback>
        </Avatar>
        <div className="h-auto w-52 rounded-lg bg-card px-4 py-1 shadow-sm shadow-secondary">
          {<Name initialName={name} />}
          {
            <Title
              initialTitle={title}
            />
          }
        </div>
      </div>

      {url && (
        // create delete button at top right of cover image
        <>
          <div className="absolute right-5 top-5 md:opacity-0 md:group-hover:opacity-100">
            <div
              onClick={onDelete}
              className="cursor-pointer text-secondary opacity-40 transition-all duration-200 ease-in-out hover:text-red-500 hover:opacity-100"
            >
              <Trash2Icon />
            </div>
          </div>
          <div className="absolute bottom-28 right-56 flex items-center gap-2 md:bottom-5 md:right-5 md:opacity-0 md:group-hover:opacity-100">
            <Button
              onClick={() =>
                iconImage.onReplace(url)
              }
              className="p-2 text-secondary opacity-50 transition-all duration-200 ease-in-out hover:text-primary hover:opacity-100 dark:hover:text-white"
              variant="outline"
              size="sm"
            >
              <SmileIcon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:block">
                Change Icon
              </span>
            </Button>
            <Button
              onClick={() =>
                coverImage.onReplace(
                  url
                )
              }
              className="p-2 text-secondary opacity-50 transition-all duration-200 ease-in-out hover:text-primary hover:opacity-100 dark:hover:text-white"
              variant="outline"
              size="sm"
            >
              <ImageIcon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:block">
                Change Cover
              </span>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

WallPaper.Skeleton =
  function CoverSkeleton() {
    return (
      <Skeleton className="relative h-40 w-full rounded-none">
        <div className="absolute bottom-4 left-16 flex items-center gap-9">
          <Skeleton className="h-24 w-24 rounded-full shadow-sm shadow-secondary"></Skeleton>
          <div className="flex h-16 w-52 flex-col justify-between rounded-lg px-4 py-2 shadow-sm shadow-secondary"></div>
        </div>
      </Skeleton>
    )
  }

export default WallPaper
