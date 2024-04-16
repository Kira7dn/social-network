'use client'

import {
  usePathname,
  useRouter,
} from 'next/navigation'
import { useQuery } from 'convex/react'
import { cn } from '@/lib/utils'
import { api } from '@/convex/_generated/api'
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

export const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const workspaces = useQuery(
    api.workspace.list
  )
  const scrollContainer =
    useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -=
        scrollContainer.current
          .scrollWidth * 0.16
    }
  }

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft +=
        scrollContainer.current
          .scrollWidth * 0.16
    }
  }

  return (
    <>
      <aside
        className={cn(
          'flex w-full border-b-2 border-primary py-2 md:h-20'
        )}
      >
        <div className="relative flex w-full gap-2">
          <div
            ref={scrollContainer}
            className="scrollbar-hide group flex w-full items-center justify-start overflow-x-scroll md:gap-2"
          >
            <button
              onClick={scrollLeft}
              className="absolute left-0 rounded-full  opacity-0 transition-opacity hover:text-primary group-hover:opacity-100 md:left-2"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 rounded-full  opacity-0 transition-opacity hover:text-primary group-hover:opacity-100 md:right-2"
            >
              <ChevronRight size={24} />
            </button>
            {workspaces?.map(
              (workspace) => {
                if (workspace) {
                  return (
                    <div
                      key={
                        workspace._id
                      }
                      onClick={() =>
                        router.push(
                          `/workspaces/${workspace._id}`
                        )
                      }
                      className={cn(
                        'md:w20-minus-05 flex h-full flex-shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg px-1 transition-colors duration-200 md:justify-start md:px-2',
                        {
                          'bg-primary text-white':
                            pathname ===
                            `/workspaces/${workspace._id}`,
                          'transition-colors duration-200 hover:bg-primary hover:text-white':
                            pathname !==
                            `/workspaces/${workspace._id}`,
                        }
                      )}
                    >
                      <div className="relative h-6 w-6">
                        <Image
                          src={
                            workspace.iconImage
                              ? workspace.iconImage
                              : '/assets/logo.svg'
                          }
                          fill
                          alt={
                            workspace.name
                          }
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="hidden md:block">
                        <p className="truncate text-base-semibold">
                          {
                            workspace.name
                          }
                        </p>
                        <p className="truncate text-small-medium font-light">
                          {
                            workspace.title
                          }
                        </p>
                      </div>
                    </div>
                  )
                }
              }
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
