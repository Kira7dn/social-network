import React from "react";
import UserInfoCard from "../sections/UserInfoCard";
import MyNavigator from "../sections/MyNavigator";
import MySignOut from "../sections/MySignOut";

type Props = {};

const LeftSideBar = (props: Props) => {
  return (
    <section className="custom-scrollbar leftsidebar w-3/12">
      <article className="bg-light-1 mx-2 rounded-lg">
        <UserInfoCard />
      </article>
      <article className="bg-light-1 mx-2 my-2 rounded-lg grow">
        <MyNavigator />
      </article>
      <article className="mx-2 my-2 px-6">
        <MySignOut />
      </article>
    </section>
  );
};

export default LeftSideBar;
