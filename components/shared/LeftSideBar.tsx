import React from "react";
import UserInfoCard from "../sections/UserInfoCard";
import MyNavigator from "../sections/MyNavigator";
import MySignOut from "../sections/MySignOut";

type Props = {};

const LeftSideBar = (props: Props) => {
  return (
    <section className="w-3/12 h-full">
      <article className="rounded-lg grow h-full">
        <MyNavigator />
      </article>
    </section>
  );
};

export default LeftSideBar;
