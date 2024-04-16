import clsx from 'clsx'
import Bounded from '../Bounded'
import AnimatedContent from './AnimatedContent'
import ButtonLink from '../ButtonLink'
import Image from 'next/image'
import {
  MessageSquareIcon,
  Newspaper,
} from 'lucide-react'
import {
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

const Showcase = (): JSX.Element => {
  return (
    <Bounded className="relative z-10">
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />

      <AnimatedContent>
        <h2 className="text-heading3-semibold text-balance text-center md:text-heading2-semibold">
          Your workspace. Your workflow.
        </h2>
      </AnimatedContent>
      <div className="mt-16 grid items-center gap-8 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div>
          <div className="w-fit rounded-lg bg-blue-500/35 p-4 text-heading3-bold">
            <MessageSquareIcon />
          </div>
          <div className="mt-6 text-large-semibold">
            Communicate teammates by
            Chatbox
          </div>

          <div className="mt-4 max-w-xl">
            <p>
              Chatbox is a powerful tool
              that allows you to
              communicate with your
              teammates in real-time.
              Easy to use, create a
              great way to stay
              connected with your team.
            </p>
          </div>

          <SignedIn>
            <ButtonLink
              className="mt-8"
              href="/dashboard"
            >
              Try now
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
        </div>

        <Image
          src="/assets/Chatbox.png"
          alt="Chatbox"
          className={clsx(
            'opacity-90 shadow-2xl lg:col-span-2 lg:pt-0',
            'lg:-order-1 lg:translate-x-[-15%]'
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          width={800}
          height={800}
        />
      </div>
      <div className="mt-16 grid items-center gap-8 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div>
          <div className="w-fit rounded-lg bg-blue-500/35 p-4 text-heading3-bold">
            <Newspaper />
          </div>
          <div className="mt-6 text-large-semibold">
            Share value Information by
            post
          </div>

          <div className="mt-4 max-w-xl">
            <p>
              Post is a powerful tool
              that allows you to share
              value information with
              your teammates in
              real-time. Easy to use,
              create a great way to stay
              connected with your team.
            </p>
          </div>

          <SignedIn>
            <ButtonLink
              className="mt-8"
              href="/dashboard"
            >
              Try now
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
        </div>

        <Image
          src="/assets/Post.png"
          alt="Post"
          className={clsx(
            'opacity-90 shadow-2xl lg:col-span-2 lg:pt-0',
            'lg:order-1 lg:translate-x-[15%]'
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          width={800}
          height={800}
        />
      </div>
    </Bounded>
  )
}

export default Showcase
