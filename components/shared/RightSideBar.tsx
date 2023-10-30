import React from "react";
import Messenger from "../sections/Messenger";

type Props = {};

const RightSideBar = (props: Props) => {
  return (
    <section className="custom-scrollbar rightsidebar w-3/12 ">
      <article className="bg-light-1 mx-2 rounded-lg ">
        <Messenger />
      </article>
      <article className="bg-light-1 mx-2 rounded-lg ">
        <h3>Events</h3>
      </article>
    </section>
  );
};

export default RightSideBar;
