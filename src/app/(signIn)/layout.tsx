import Link from "next/link";
import ProTrainerLogo from "@/components/UI/logo/ProTrainerLogo";

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-800 bg-black/50 ">
        <Link href="/" className="flex items-center">
          <ProTrainerLogo className="w-12 h-12" />
          <span className="ml-2 text-xl font-bold hidden sm:inline-block">
            ProTrainer
          </span>
        </Link>
      </nav>
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
