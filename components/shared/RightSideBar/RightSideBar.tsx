'use client'
import React from 'react'
import Contacts from './Contacts'
import Conversation from './Conversation/Conversation'
import { useConvexAuth } from 'convex/react'

const RightSideBar = () => {
  const { isAuthenticated, isLoading } =
    useConvexAuth()
  return (
    <div className="flex h-full w-full flex-col justify-start">
      <div className="sticky top-[72px] flex h-[90vh] w-full flex-col gap-5">
        {!isAuthenticated &&
          isLoading && (
            <div className="flex h-full w-full flex-col justify-start gap-6">
              <section className="glass-container w-full bg-card from-gray-900 to-gray-950 pt-2 dark:bg-gradient-to-b">
                <Contacts.Skeleton />
              </section>
              <section className="glass-container w-full bg-card from-gray-900 to-gray-950 pt-2 dark:bg-gradient-to-b">
                <Conversation.Skeleton />
              </section>
            </div>
          )}
        {isAuthenticated &&
          !isLoading && (
            <div className="flex h-full w-full flex-col justify-start gap-6">
              <section className="glass-container w-full bg-card from-gray-900 to-gray-950 pt-2 dark:bg-gradient-to-b">
                <Contacts />
              </section>
              <section className="glass-container w-full bg-card from-gray-900 to-gray-950 pt-2 dark:bg-gradient-to-b">
                <Conversation />
              </section>
            </div>
          )}
      </div>
    </div>
  )
}

export default RightSideBar
