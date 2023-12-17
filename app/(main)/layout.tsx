import { Toaster } from "sonner";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

import "../globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Topbar } from "@/components/shared/TopBar/Topbar";
import LeftSideBar from "@/components/shared/LeftSideBar/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar/RightSideBar";
import Bottombar from "@/components/shared/Bottombar";
import LayoutComponent from "@/components/hocs/layoutComponent";
import createLocalFont from 'next/font/local'
const LGEI = createLocalFont({
  src: [
    {
      path: './fonts/LGEIText-Light.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/LGEIText-Regular.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/LGEIText-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/LGEIText-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
})



export const metadata: Metadata = {
  title: "Workspace",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "assets/logo.svg",
        href: "assets/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "assets/logo-dark.svg",
        href: "assets/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${LGEI.className}`}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="theme"
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              <LayoutComponent
                left={<LeftSideBar />}
                right={<RightSideBar />}
                top={<Topbar />}
                bottom={<Bottombar />}
              >
                {children}
              </LayoutComponent>
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
