import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import logo from "/public/logos/b.png";
import "../globals.css";
import { logout } from "@/actions/auth-actions";

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
          <ul className="flex gap-3 w-full  justify-center items-center">
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
                href="/profile"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                Profile
              </Link>
            </li>

            <li className="ml-auto">
              <form action={logout}>
                <button className="bg-blue-500 px-3 py-2 rounded-lg">
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
