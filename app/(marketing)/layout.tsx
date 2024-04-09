import Footer from './_components/Footer'
import { Header } from './_components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid bg-[#070815] text-white">
      <Header />
      <div>{children}</div>
      <Footer />
    </main>
  )
}
