'use client'

import Image from 'next/image'
import { PlusCircle } from 'lucide-react'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'

const DocumentsPage = () => {
  const router = useRouter()
  const create = useMutation(
    api.workspace.create
  )
  const onCreate = () => {
    const promise = create().then(
      ({ workspace, member }) =>
        router.push(
          `/workspaces/${workspace}`
        )
    )

    toast.promise(promise, {
      loading:
        'Creating a new workspace...',
      success: 'New workspace created!',
      error:
        'Failed to create a new workspace.',
    })
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <Image
        src="/assets/empty.png"
        height={300}
        width={300}
        alt="empty"
        className="dark:hidden"
      />
      <Image
        src="/assets/empty-dark.png"
        height={300}
        width={300}
        alt="empty"
        className="hidden dark:block"
      />
      <Button onClick={onCreate}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create new Workspace
      </Button>
    </div>
  )
}

export default DocumentsPage
