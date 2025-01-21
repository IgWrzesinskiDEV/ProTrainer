import Image from "next/image";
import Link from "next/link";

import logo from "/public/logos/b.png";
import { verifyAuth } from "@/lib/lucia/auth";
import { logout } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifyAuth();
  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <>
      <nav className="flex  items-center  py-4 text-xl px-44 gap-10 border-b-2 border-stone-700 shadow-2xl sticky top-0 bg-background z-50">
        <div className="flex-shrink-0">
          <Image src={logo} width={110} alt="Heavy dumbbel" />{" "}
        </div>
        <ul className="flex gap-3 w-full  justify-center items-center">
          <li>
            <Link
              href="/profile"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Profile
            </Link>
          </li>
          <li className="ml-auto">
            <p>Hello,{user?.userName}</p>
          </li>
          <li>
            <form action={logout}>
              <button className="bg-blue-500 px-3 py-2 rounded-lg">
                Logout
              </button>
            </form>
          </li>
        </ul>
      </nav>
      <main className="bg-zinc-900 h-full  px-32 py-20">{children}</main>
    </>
  );
}
