import { verifyAuth } from "@/lib/lucia/auth";

import { redirect } from "next/navigation";

import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifyAuth();

  if (!user) {
    return redirect("/auth/login");
  }
  console.log("user", user);
  return (
    <>
      <div className="min-h-screen bg-[#2a2522] text-white">
        <DashboardHeader
          profileDetails={user?.profileDetails}
          userName={user.userName}
          currentTrainer={user?.currentTrainer}
          role={user.role}
        />

        {/* Main Navigation Tabs */}
        <DashboardNav />
        <main className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
      {/* <main className=" h-full  px-32 py-20">{children}</main> */}
    </>
  );
}
