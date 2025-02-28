import ProfileLink from "../profile/ProfileLink";

export default function DashboardNav() {
  return (
    <nav className="bg-[#252220] shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {["Profile", "Account", "Plans", "Measurement", "Trainers"].map(
            (tab) => (
              <ProfileLink
                href={`/dashboard/${tab.toLowerCase()}`}
                key={tab}
                text={tab}
              />
            )
          )}
        </div>
      </div>
    </nav>
  );
}
