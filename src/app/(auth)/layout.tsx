import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Threads - auth",
  description: "Meta Threads App",
};

const inter = Inter({ subsets: ["latin"] });
interface Props {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body
          className={`${inter.className} flex justify-center items-center bg-neutral-900`}
        >
          <main className=" max-w-2xl">
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <Toaster position="bottom-right" />

              {children}
            </ThemeProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
