import React from "react";

type Props = {
  top?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
  children: React.ReactNode;
};

function LayoutComponent2({
  left,
  top,
  children,
  right,
  bottom,
}: Props) {
  return (
    <>
      <main className="flex justify-center">
        {left}
        <div className="w-full flex flex-col justify-between relative">
          {top}
          <section className="flex min-h-screen flex-1 flex-col items-center">
            <div className="w-full h-full flex justify-between bg-background">
              <div className="container">{children}</div>
              <div className="w-3/12 h-full pl-2 pr-4">
                {right}
              </div>
            </div>
          </section>
        </div>
      </main>
      {bottom}
    </>
  );
}

export default LayoutComponent2;
