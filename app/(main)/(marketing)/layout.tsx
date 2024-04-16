import {
  ClerkLoaded,
  ClerkLoading,
} from '@clerk/nextjs'
import Footer from './_components/Footer'
import { Header } from './_components/Header'
import { Spinner } from '@/components/spinner'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid bg-[#070815] text-white">
      <Header />
      <ClerkLoading>
        <div className="flex h-screen items-center justify-center" />
      </ClerkLoading>
      <ClerkLoaded>
        {children}
      </ClerkLoaded>
      <Footer />
    </main>
  )
}
