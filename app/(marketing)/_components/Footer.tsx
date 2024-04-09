import Link from 'next/link'
import { Logo } from './Logo'

export default async function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-slate-600 px-8 py-7 md:flex-row">
      <Logo expanded size={40} />
      <nav aria-label="Footer">
        <ul className="flex gap-6">
          <li>
            <Link
              href="/dashboard"
              className="inline-flex min-h-11 items-center"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="inline-flex min-h-11 items-center"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
