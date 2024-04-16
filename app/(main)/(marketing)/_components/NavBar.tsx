'use client'

import { useState } from 'react'
import {
  MdMenu,
  MdClose,
} from 'react-icons/md'
import clsx from 'clsx'
import ButtonLink from './ButtonLink'
import { Spinner } from '@/components/spinner'
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { UserItem } from '@/components/shared/TopBar/UserItem'
import { Logo } from './Logo'

export default function NavBar() {
  const [open, setOpen] =
    useState(false)
  return (
    <nav
      className="md-:py-6 px-4 py-4 md:px-6"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Logo expanded size={40} />
          <button
            type="button"
            className="text-3xl block p-2 text-white md:hidden"
            aria-expanded={open}
            onClick={() =>
              setOpen(true)
            }
          >
            <MdMenu />
            <span className="sr-only">
              Open menu
            </span>
          </button>
        </div>
        {/* Mobile Nav */}
        <div
          className={clsx(
            'ga-4 fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden',
            open
              ? 'translate-x-0'
              : 'translate-x-[100%]'
          )}
        >
          <button
            type="button"
            className="text-3xl fixed right-4 top-4 mb-4 block p-2 text-white md:hidden"
            aria-expanded={open}
            onClick={() =>
              setOpen(false)
            }
          >
            <MdClose />
            <span className="sr-only">
              Close menu
            </span>
          </button>

          <div className="grid justify-items-end gap-8">
            <ClerkLoading>
              <Spinner />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <ButtonLink href="/dashboard">
                  Dashboards
                </ButtonLink>
                <UserItem />
              </SignedIn>
              <SignedOut>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/dashboard"
                  redirectUrl="/dashboard"
                >
                  <div className="relative inline-flex h-fit w-fit cursor-pointer rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 outline-none ring-yellow-300 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 after:hover:bg-opacity-10 focus:ring-2 focus:ring-offset-2">
                    Try Free
                  </div>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="z-40 hidden gap-6 md:flex">
          <ClerkLoading>
            <Spinner />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <ButtonLink href="/dashboard">
                Dashboards
              </ButtonLink>
              <UserItem />
            </SignedIn>
            <SignedOut>
              <SignInButton
                mode="modal"
                afterSignInUrl="/dashboard"
                redirectUrl="/dashboard"
              >
                <div className="relative inline-flex h-fit w-fit cursor-pointer rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 outline-none ring-yellow-300 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 after:hover:bg-opacity-10 focus:ring-2 focus:ring-offset-2">
                  Try Free
                </div>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </nav>
  )
}
