import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

import "../globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Topbar } from "@/components/shared/Topbar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import Bottombar from "@/components/shared/Bottombar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
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
              <Topbar />
              <main className="flex justify-center pt-[72px]">
                <div className="w-full max-w-screen-2xl flex justify-between min-h-screen">
                  <LeftSideBar />
                  <section className="flex min-h-screen flex-1 flex-col items-center">
                    <div className="w-full max-w-4xl">{children}</div>
                  </section>
                  <RightSideBar />
                </div>
              </main>
              <Bottombar />
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
