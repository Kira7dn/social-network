'use client'

import React from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import clsx from 'clsx'

import {
  FaDigitalOcean,
  FaCloudflare,
  FaNpm,
  FaGithub,
  FaFigma,
  FaFly,
} from 'react-icons/fa6'
import { projecLinks } from '@/constants'
import Link from 'next/link'
import LogoSVG from '../LogoSVG'

export default function AnimatedContent() {
  const container = useRef(null)
  const prefersReducedMotion =
    usePrefersReducedMotion()
  gsap.registerPlugin(useGSAP)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: {
          ease: 'power2.inOut',
        },
      })

      tl.to('.pulsing-logo', {
        keyframes: [
          {
            filter: 'brightness(2)',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.in',
          },
          {
            filter: 'brightness(1)',
            opacity: 0.7,
            duration: 0.9,
          },
        ],
      })

      tl.to(
        '.signal-line',
        {
          keyframes: [
            {
              backgroundPosition:
                '0% 0%',
            },
            {
              backgroundPosition:
                '100% 100%',
              stagger: {
                from: 'center',
                each: 0.3,
              },
              duration: 1,
            },
          ],
        },
        '-=1.4'
      )

      tl.to(
        '.pulsing-icon',
        {
          keyframes: [
            {
              opacity: 1,
              stagger: {
                from: 'center',
                each: 0.3,
              },
              duration: 1,
            },
            {
              opacity: 0.4,
              duration: 1,
              stagger: {
                from: 'center',
                each: 0.3,
              },
            },
          ],
        },
        '-=2'
      )
    },
    { scope: container }
  )

  return (
    <div
      className="mt-20 flex flex-col items-center md:flex-row"
      ref={container}
    >
      {projecLinks.map(
        (item, index) => (
          <React.Fragment key={index}>
            {index ===
              Math.floor(
                projecLinks.length / 2
              ) && (
              <>
                <LogoSVG />
                <div className="signal-line rotate-180 bg-gradient-to-t" />
              </>
            )}
            <Link
              href={item.route}
              className="pulsing-icon text-3xl md:text-4xl lg:text-5xl flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-3 text-blue-100 opacity-40"
            >
              {item.icon}
            </Link>
            {index !==
              projecLinks.length -
                1 && (
              <div
                className={clsx(
                  'signal-line',
                  index >=
                    Math.floor(
                      projecLinks.length /
                        2
                    )
                    ? 'rotate-180'
                    : 'rotate-0'
                )}
              />
            )}
          </React.Fragment>
        )
      )}
    </div>
  )
}
