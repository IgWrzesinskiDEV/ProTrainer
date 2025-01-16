import Image from "next/image";
import Link from "next/link";

import logo from "/public/logos/b.png";

import { logout } from "@/actions/auth.actions";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}
