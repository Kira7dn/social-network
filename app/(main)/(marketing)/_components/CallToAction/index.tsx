import {
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import Bounded from '../Bounded'
import ButtonLink from '../ButtonLink'
import PlainLogo from './PlainLogo'

const CallToAction =
  (): JSX.Element => {
    return (
      <Bounded className="relative z-10 py-32 text-center font-medium md:py-40">
        <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-500/50 blur-[160px] filter" />

        <div className="glass-container rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 p-4 md:rounded-xl">
          <PlainLogo />
        </div>

        <div className="mt-8 max-w-xl text-balance text-heading3-bold">
          Evolution Workspace for your
          team
        </div>

        <SignedIn>
          <ButtonLink
            className="mt-8"
            href="/dashboard"
          >
            Start now
          </ButtonLink>
        </SignedIn>
        <SignedOut>
          <SignInButton
            mode="modal"
            afterSignInUrl="/dashboard"
            redirectUrl="/dashboard"
          >
            <div className="relative mt-8 inline-flex h-fit w-fit cursor-pointer rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 outline-none ring-yellow-300 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 after:hover:bg-opacity-10 focus:ring-2 focus:ring-offset-2">
              Try Free
            </div>
          </SignInButton>
        </SignedOut>
      </Bounded>
    )
  }

export default CallToAction
