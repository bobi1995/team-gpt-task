import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotificationBar from "@/components/notification-bar";
import { NotificationProvider } from "@/context/new-notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notification Application",
  description: "Notification tracker app by Team-GPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationBar />
        {children}
      </body>
    </html>
  );
}
