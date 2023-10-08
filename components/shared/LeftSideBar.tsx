import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import UserInfoCard from "../cards/UserInfoCard";
import MyNavigator from "../cards/MyNavigator";
import MySignOut from "../cards/MySignOut";

type Props = {};

const LeftSideBar = (props: Props) => {
  return (
    <section className="custom-scrollbar leftsidebar w-3/12">
      <article className="bg-light-1 mx-2 rounded-lg py-4 ">
        <UserInfoCard />
      </article>
      <article className="bg-light-1 mx-2 rounded-lg py-4 ">
        <MyNavigator />
      </article>
      <article className="mt-10 px-6">
        <MySignOut />
      </article>
    </section>
  );
};

export default LeftSideBar;
