import { Topbar } from "@/components/shared/Topbar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import Bottombar from "@/components/shared/Bottombar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Topbar />
      <main className="flex justify-center h-full pt-24 ">
        <div className="flex flex-row h-full w-full justify-between max-w-screen-2xl">
          <LeftSideBar />
          <section className="flex-1 w-6/12 max-w-4xl">{children}</section>
          <RightSideBar />
        </div>
      </main>
      <Bottombar />
    </div>
  );
}
