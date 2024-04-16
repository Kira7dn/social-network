'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import StarGrid from '../StarGrid'
import ButtonLink from '../ButtonLink'
import Image from 'next/image'
import {
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

export default function AnimatedContent() {
  const container = useRef(null)
  const prefersReducedMotion =
    usePrefersReducedMotion()
  gsap.registerPlugin(useGSAP)

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          '.hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow',
          { opacity: 1 }
        )
        return
      }

      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.inOut',
        },
      })

      tl.fromTo(
        '.hero__heading',
        { scale: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
        }
      )

      tl.fromTo(
        '.hero__body',
        { y: 20 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
        },
        '-=0.6'
      )

      tl.fromTo(
        '.hero__button',
        { scale: 1.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
        },
        '-=0.8'
      )
      tl.fromTo(
        '.hero__image',
        { y: 100 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
        },
        '+=0.3'
      )
      tl.fromTo(
        '.hero__glow',
        { scale: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
        },
        '-=1'
      )
    },
    { scope: container }
  )

  return (
    <div
      className="relative"
      ref={container}
    >
      <StarGrid />
      <div className="hero__heading mx-auto mt-6 max-w-3xl text-balance text-heading4-bold opacity-0 md:text-heading3-bold">
        Transform Your Office Experience
        with Our Digital Workspace
      </div>

      <div className="hero__body mx-auto mt-6 max-w-md text-balance text-body-medium text-slate-300 opacity-0">
        Streamline task management,
        communication, and performance
        tracking in one centralized
        platform.
      </div>
      <SignedIn>
        <ButtonLink
          className="hero__button mt-8 opacity-0"
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
          <div className="hero__button relative mt-8 inline-flex h-fit w-fit cursor-pointer rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 opacity-0 outline-none ring-yellow-300 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 after:hover:bg-opacity-10 focus:ring-2 focus:ring-offset-2">
            Try Free
          </div>
        </SignInButton>
      </SignedOut>

      <div className="hero__image glass-container mt-16 w-fit opacity-0">
        <div className="hero__glow absolute inset-0 -z-10 bg-blue-500/30 opacity-0 blur-2xl filter" />
        <Image
          src="/assets/home.png"
          className="h-auto w-auto rounded-lg"
          priority
          sizes="100vw"
          alt="Hero image"
          width={800}
          height={500}
        />
      </div>
    </div>
  )
}
