'use client'
import { sidebarLinks } from '@/constants'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Bottombar = () => {
  const pathname = usePathname()
  const { userId } = useAuth()

  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5 ">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(
              link.route
            ) &&
              link.route.length > 1) ||
            pathname === link.route
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${isActive && 'bg-primary text-primary-foreground'}`}
            >
              {link.component}
              <p className="text-tiny-bold max-sm:hidden">
                {
                  link.label.split(
                    /\s+/
                  )[0]
                }
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Bottombar
