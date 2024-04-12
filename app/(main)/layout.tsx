'use client'
import { useConvexAuth } from 'convex/react'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, isLoading } =
    useConvexAuth()
  if (!isLoading && !isAuthenticated) {
    return (
      <AlertDialogDemo
        navigate={() =>
          router.push('/')
        }
      />
    )
  }

  return <>{children}</>
}

export function AlertDialogDemo({
  navigate,
}: {
  navigate: () => void
}) {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogPortal>
        <AlertDialogOverlay className="bg-black opacity-100" />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You did not Sign In
            </AlertDialogTitle>
            <AlertDialogDescription className="flex items-center space-x-2">
              <AlertCircle size={24} />
              <span>
                You need to sign in to
                continue
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={navigate}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}
