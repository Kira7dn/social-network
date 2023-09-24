import React from "react";

type Props = {};

const RightSideBar = (props: Props) => {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="text-heading4-medium text-light-1">
        <h3>Suggested Communities</h3>
      </div>
      <div className="text-heading4-medium text-light-1">
        <h3>Similar Minds</h3>
      </div>
    </section>
  );
};

export default RightSideBar;
