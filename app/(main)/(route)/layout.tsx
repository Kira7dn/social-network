'use client'
import { Topbar } from '@/components/shared/TopBar/Topbar'
import LeftSideBar from '@/components/shared/LeftSideBar/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar/RightSideBar'
import Bottombar from '@/components/shared/Bottombar'
import LayoutComponent2 from '@/components/hocs/layoutComponent2'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutComponent2
      left={<LeftSideBar />}
      right={<RightSideBar />}
      top={<Topbar />}
      bottom={<Bottombar />}
    >
      {children}
    </LayoutComponent2>
  )
}
