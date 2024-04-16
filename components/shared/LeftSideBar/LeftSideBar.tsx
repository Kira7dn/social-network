'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import { Logo } from '../TopBar/Logo'
import ProgressChart from './ProgressChart'
import { useConvexAuth } from 'convex/react'

const LeftSideBar = () => {
  const path = usePathname()
  const isHome = path === '/dashboard'
  const pathname = usePathname()
  const { isAuthenticated, isLoading } =
    useConvexAuth()

  return (
    <aside
      className={cn(
        'hidden w-28 transition-all duration-300 ease-out md:block',
        isHome && 'w-3/12'
      )}
    >
      <div
        className={cn(
          'fixed top-0 z-50 w-28 pr-10 pt-4 transition-all duration-300 ease-out dark:pt-7',
          isHome && 'w-80'
        )}
      >
        <article className="glass-container flex h-screen flex-col gap-10 rounded-tr-2xl bg-card from-gray-900 to-gray-950 px-3 pt-3 shadow-sidebar dark:bg-gradient-to-b">
          <section className="w-full">
            <Logo
              expanded={isHome}
              size={50}
            />
          </section>
          <section
            className={cn(
              'flex h-40 flex-col justify-center overflow-hidden transition-all duration-300 ease-out',
              !isHome && 'h-0 opacity-0'
            )}
          >
            <p
              className={cn(
                'text-large-bold',
                !isHome &&
                  'text-[0px] opacity-0'
              )}
            >
              Tasks Progress
            </p>
            {isAuthenticated &&
              !isLoading && (
                <ProgressChart />
              )}
          </section>
          <section
            className={cn(
              'flex h-3/5 flex-col pb-6',
              isHome && 'max-h-72'
            )}
          >
            <div
              className={cn(
                'flex h-full flex-col justify-between'
              )}
            >
              {sidebarLinks.map(
                (link) => {
                  const isActive =
                    (pathname.includes(
                      link.route
                    ) &&
                      link.route
                        .length > 1) ||
                    pathname ===
                      link.route
                  return (
                    <Link
                      href={link.route}
                      key={link.label}
                      className={`flex gap-2 rounded-sm px-2 py-1 hover:text-primary ${
                        isActive &&
                        'bg-primary'
                      } ${!isHome && 'scale-up justify-center'}`}
                    >
                      <div
                        className={`${
                          isActive &&
                          'text-primary-foreground'
                        } `}
                      >
                        {link.component}
                      </div>
                      <p
                        className={cn(
                          'text-base-semibold max-md:hidden',
                          isActive &&
                            'text-primary-foreground',
                          !isHome &&
                            'hidden'
                        )}
                      >
                        {link.label}
                      </p>
                    </Link>
                  )
                }
              )}
            </div>
          </section>
        </article>
      </div>
    </aside>
  )
}

export default LeftSideBar
