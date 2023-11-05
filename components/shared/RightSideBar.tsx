import React from "react";
import Messenger from "../sections/Messenger";

type Props = {};

const RightSideBar = (props: Props) => {
  return (
    <aside className="border-l-2 border-secondary overflow-y-auto w-60">
      <Messenger />
    </aside>
  );
};

export default RightSideBar;
