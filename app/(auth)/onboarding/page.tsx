"use client";
import { useUser } from "@clerk/nextjs";
import AccountContainer from "./_components/Profile";

function Page() {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return <AccountContainer />;
}

export default Page;
