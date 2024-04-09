import React from 'react'
import ChatContainer from '../shared/Messenger/ChatContainer'

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
  return (
    <>
      <main className="flex w-full justify-center bg-background">
        {left}
        <div className="relative flex w-full flex-col justify-between">
          {top}
          <section className="flex min-h-screen flex-1 flex-col items-center">
            <div className="container flex h-full w-full">
              <div className="w-full">
                {children}
              </div>
              <div className="ml-6 h-full w-3/12 pl-2">
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
