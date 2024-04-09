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

        <ButtonLink
          href={'/'}
          className="mt-6"
        >
          Start Now
        </ButtonLink>
      </Bounded>
    )
  }

export default CallToAction
