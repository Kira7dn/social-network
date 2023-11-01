import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

type Props = {
  params: {
    id: string;
  };
};

async function Page({ params }: Props) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params.id);
  if (!userInfo.onboarded) redirect("/onboarding/");
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => {
              return (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {profileTabs.map((tab) => {
            return (
              <TabsContent
                key={tab.label}
                value={tab.value}
                className="w-full text-light-1"
              >
                <ThreadsTab />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
