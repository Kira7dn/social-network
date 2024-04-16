import { useConvexAuth } from "convex/react";
import AccountProfile from "./AccountProfile";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import useFetchUser from "@/hooks/use-fetch-user";

const User = () => {
  const user = useFetchUser();
  if (!user) {
    return null;
  }
  return <AccountProfile user={user} btnTitle="Continue" />;
};

const AccountContainer = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!isLoading && !isAuthenticated) {
    return redirect("/sign-in");
  }
  return (
    <main className="mx-auto flex flex-col justify-start px-10 py-2 bg-card mt-4 rounded-lg max-h-[80vh] max-w-xl">
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
  );
};
export default AccountContainer;
