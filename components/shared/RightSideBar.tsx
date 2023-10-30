import React from "react";
import Messenger from "../sections/Messenger";

type Props = {};

const RightSideBar = (props: Props) => {
  return (
    <section className="w-3/12 ">
      <article className=" mx-2 rounded-lg ">
        <Messenger />
      </article>
    </section>
  );
};

export default RightSideBar;
