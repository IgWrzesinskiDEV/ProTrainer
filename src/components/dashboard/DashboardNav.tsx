import { IUserRole } from "@/lib/models/user.model";
import ProfileLink from "../profile/ProfileLink";

export default function DashboardNav({ role }: { role: IUserRole }) {
  const NavLinks =
    role === IUserRole.CLIENT
      ? ["Profile", "Account", "Plans", "Measurement", "Trainers"]
      : ["Profile", "Account", "Clients", "Trainer profile", "Invites"];
  return (
    <nav className="bg-[#252220] shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {NavLinks.map((tab) => (
            <ProfileLink
              href={`/dashboard/${tab.split(" ").join("-").toLowerCase()}`}
              key={tab}
              text={tab}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
