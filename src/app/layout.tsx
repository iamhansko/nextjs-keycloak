import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import SigninButton from "@/components/SigninButton";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keycloak",
  description: "Next.js + NextAuth.js + Keycloak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="layout">
            <ul className="navbar">
              <SigninButton />
              <li><Link href="/">Landnig Page</Link></li>
              <li><Link href="/client">User Page - Client Component</Link></li>
              <li><Link href="/server">User Page - Server Component</Link></li>
              <li><Link href="/partner">Partner Page</Link></li>
              <li><Link href="/admin">Admin Page</Link></li>
            </ul>
            <div className="page">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
