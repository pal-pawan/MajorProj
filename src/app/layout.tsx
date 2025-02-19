import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from '../context/AuthProvider';
import { Toaster } from "@/components/ui/toaster";
import { UserRoleProvider } from "@/context/UserRoleContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MajorProj",
  description: "AI powered companion for all your interveiw preparation needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserRoleProvider>
        {children}
        </UserRoleProvider>
        <Toaster />
      </body>
      </AuthProvider>
    </html>
  );
}
