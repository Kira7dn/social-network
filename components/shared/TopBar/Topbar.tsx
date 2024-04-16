'use client'

import { useConvexAuth } from 'convex/react'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'
import { Spinner } from '../../spinner'
import { UserItem } from './UserItem'
import SearchBar from './SearchBar'
import { Button } from '@/components/ui/button'
import {
  ClerkLoading,
  SignInButton,
} from '@clerk/nextjs'
import { Logo } from './Logo'

export const Topbar = () => {
  const { isAuthenticated, isLoading } =
    useConvexAuth()
  const today = new Date()
  const formattedDate =
    today.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <div
      className={cn(
        'sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-background transition-all duration-300'
      )}
    >
      <div className="flex w-full items-center justify-between px-6">
        <Logo
          expanded
          size={40}
          name={false}
          className="md:hidden"
        />
        <div className="hidden w-96 text-large-semibold text-secondary md:block">
          {formattedDate}
        </div>
        <SearchBar />
        <div className="flex w-[400px] items-center justify-end gap-x-8">
          <ClerkLoading>
            <Spinner />
          </ClerkLoading>
          {!isAuthenticated &&
            !isLoading && (
              <>
                <SignInButton
                  mode="redirect"
                  afterSignInUrl="/dashboard"
                >
                  <Button
                    size="sm"
                    className="bg-primary-gradient"
                  >
                    Login
                  </Button>
                </SignInButton>
              </>
            )}
          {isAuthenticated &&
            !isLoading && <UserItem />}
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
