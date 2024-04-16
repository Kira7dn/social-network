import { useConvexAuth } from 'convex/react'
import AccountProfile from './AccountProfile'
import { Spinner } from '@/components/spinner'
import { redirect } from 'next/navigation'
import useFetchUser from '@/hooks/use-fetch-user'

const User = () => {
  const user = useFetchUser()
  if (!user) {
    return null
  }
  return (
    <AccountProfile
      user={user}
      btnTitle="Continue"
    />
  )
}

const AccountContainer = () => {
  const { isAuthenticated, isLoading } =
    useConvexAuth()
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }
  if (!isLoading && !isAuthenticated) {
    return redirect('/sign-in')
  }
  return (
    <main className="glass-container mx-auto my-auto mt-4 flex w-full max-w-xl flex-col justify-start rounded-lg bg-card from-gray-900 to-gray-950 px-4 py-2 pt-2 dark:bg-gradient-to-b">
      <h1 className="text-heading4-bold text-primary">
        Onboarding
      </h1>
      <p className="text-base-regular">
        Complete your profile now.
      </p>
      <section className="mt-4">
        <User />
      </section>
    </main>
  )
}
export default AccountContainer
