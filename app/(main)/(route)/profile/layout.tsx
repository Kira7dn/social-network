"use client";

const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex-1 flex h-full relative">
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
};

export default MainLayout;
