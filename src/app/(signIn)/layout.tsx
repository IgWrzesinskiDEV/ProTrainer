import Image from "next/image";
import Link from "next/link";

import logo from "/public/logos/b.png";

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="flex  items-center pl-14  py-4 text-xl  border-b-2 border-stone-700 shadow-2xl  bg-background ">
        <Link href="/" className="flex-shrink-0">
          <Image src={logo} width={90} alt="Heavy dumbbel" />{" "}
        </Link>
      </nav>
      <main className="mt-5 lg:mt-12">{children}</main>
    </>
  );
}
