import { verifyAuth } from "@/lib/lucia/auth";

import { redirect } from "next/navigation";

import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import getNotificationsByUserId from "@/utils/data/notifications/getNotificationsByUserId";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifyAuth();

  if (!user) {
    return redirect("/auth/login");
  }
  const notifications = await getNotificationsByUserId(user.id);

  return (
    <>
      <div className="min-h-screen bg-[#2a2522] text-white" aria-hidden="false">
        <DashboardHeader
          profileDetails={user?.profileDetails}
          userName={user.userName}
          currentTrainer={user?.currentTrainer}
          role={user.role}
          notifications={JSON.parse(JSON.stringify(notifications))}
        />

        {/* Main Navigation Tabs */}
        <DashboardNav role={user.role} />
        <main className="max-w-[120rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {children}
        </main>
      </div>
      {/* <main className=" h-full  px-32 py-20">{children}</main> */}
    </>
  );
}
