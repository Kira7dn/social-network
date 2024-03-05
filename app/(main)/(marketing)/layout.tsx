import LayoutComponent from "@/components/hocs/layoutComponent";
import { TopbarMarketing } from "@/components/shared/TopBar/MarketingTopbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutComponent top={<TopbarMarketing />}>
      {children}
    </LayoutComponent>
  );
}
