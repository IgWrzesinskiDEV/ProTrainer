import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import logo from "/public/logos/b.png";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.className} font-bold  antialiased`}>
        <nav className="flex  items-center  py-4 text-xl px-44 gap-10 border-b-2 border-stone-700 shadow-2xl sticky top-0 bg-background z-50">
          <div className="flex-shrink-0">
            <Image src={logo} width={110} alt="Heavy dumbbel" />{" "}
          </div>
          <ul className="flex gap-3 w-full  ">
            <li>
              <Link
                href="/"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/home"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                About us
              </Link>
            </li>
            <li className="ml-auto">
              <Link href="/login" className="text-blue-500">
                Log In
              </Link>
            </li>
            <li>
              <Link href="/signup" className="bg-blue-500 px-3 py-2 rounded-lg">
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
