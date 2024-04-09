'use client'
import { Navigation } from '@/app/(main)/(route)/workspaces/_components/Navigation'
import { useUser } from '@clerk/nextjs'

const MainLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { isSignedIn, user } = useUser()
  return (
    <div className="relative z-10 mt-4 flex h-full w-full flex-1 flex-col rounded-t-3xl">
      <div className="glass-container flex w-full flex-col rounded-md bg-card from-gray-900 to-gray-950 dark:bg-gradient-to-b">
        {isSignedIn && user && (
          <Navigation />
        )}
        <div className="min-h-[60vh] w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
