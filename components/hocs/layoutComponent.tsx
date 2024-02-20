import React from "react";

type Props = {
  top?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
  children: React.ReactNode;
};

function LayoutComponent({ top, left, right, bottom, children }: Props) {
  return (
    <>
      {top}
      <main className="flex justify-center pt-[56px] px-4">
        <div className="w-full flex justify-between min-h-screen">
          {left}
          <section className="flex min-h-screen flex-1 flex-col items-center">
            <div className="w-full h-full flex justify-center">{children}</div>
          </section>
          {right}
        </div>
      </main>
      {bottom}
    </>
  );
}

export default LayoutComponent;
