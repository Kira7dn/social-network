import React from "react";

type Props = {
  top?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
  children: React.ReactNode;
};

function LayoutComponent({ top, children }: Props) {
  return (
    <div className="container">
      {top}
      <main className="flex justify-center pt-[56px] px-4">
        <div className="w-full h-full flex justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}

export default LayoutComponent;
