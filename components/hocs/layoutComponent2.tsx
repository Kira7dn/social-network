import React from 'react'
import ChatContainer from '../shared/Messenger/ChatContainer'
import useCheckLogIn from '@/hooks/use-check-login'
import Bottombar from '../shared/Bottombar'

type Props = {
  top?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  bottom?: React.ReactNode
  children: React.ReactNode
}

function LayoutComponent2({
  left,
  top,
  children,
  right,
  bottom,
}: Props) {
  useCheckLogIn()
  return (
    <>
      <main className="flex w-full justify-center bg-background">
        {left}
        <div className="relative flex w-full flex-col justify-between">
          {top}
          <section className="flex min-h-screen flex-1 flex-col items-center">
            <div className="container flex h-full w-full">
              <div className="mr-0 w-full md:mr-6">
                {children}
              </div>
              <div className="ml-6 hidden h-full w-96 md:block">
                {right}
              </div>
            </div>
          </section>
          <ChatContainer />
        </div>
      </main>
      {bottom}
    </>
  )
}

export default LayoutComponent2
