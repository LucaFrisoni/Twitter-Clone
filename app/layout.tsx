import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "./components/Layout";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import ModalProvider from "@/provider/ModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
