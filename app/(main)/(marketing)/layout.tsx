import LayoutComponent from "@/components/hocs/layoutComponent";
import { Topbar } from "@/components/shared/TopBar/Topbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutComponent top={<Topbar />}>
      {children}
    </LayoutComponent>
  );
}
