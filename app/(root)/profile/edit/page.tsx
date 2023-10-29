import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboarded) redirect("/onboarding");
  const userData = {
    id: user.id,
    // objectId: userInfo?._id,
    username: userInfo ? userInfo.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo.bio : "",
    image: userInfo ? userInfo.image : user.imageUrl,
  };
  return (
    <>
      <h1 className="head-text">Edit Profile</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      <section>
        <AccountProfile user={userData} btnTitle="Edit" />
      </section>
    </>
  );
}

export default Page;