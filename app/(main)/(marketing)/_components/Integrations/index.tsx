import StarBackground from './StarBackground'
import Image from 'next/image'

import background from './background.jpg'
import React from 'react'
import AnimatedContent from './AnimatedContent'
import Bounded from '../Bounded'

const Integrations =
  (): JSX.Element => {
    return (
      <Bounded className="relative overflow-hidden">
        <Image
          src={background}
          alt=""
          fill
          className="object-cover"
          quality={90}
        />
        <StarBackground />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-center text-heading3-bold md:text-heading2-semibold">
            Integration more
          </h2>
          <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
            See my projects and
            integrations
          </div>
          <AnimatedContent />
        </div>
      </Bounded>
    )
  }

export default Integrations
