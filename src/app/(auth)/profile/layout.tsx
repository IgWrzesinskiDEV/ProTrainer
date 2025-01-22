import ProfileLink from "@/components/UI/profile/ProfileLink";
export default function profileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside className="flex gap-4 flex-col ">
        <div className="flex items-center gap-2 ">
          <div className="w-14 h-14 rounded-full bg-stone-300"></div>
          <h2 className="text-4xl ">John Doe</h2>
        </div>
        <nav className="">
          <ul className="flex  gap-1">
            <li>
              <ProfileLink href="/profile" text="Profile" />
            </li>
            <li>
              <ProfileLink href="/profile/account" text="Account" />
            </li>
            <li>
              <ProfileLink href="/profile/plans" text=" Plans" />
            </li>
            <li>
              <ProfileLink href="/profile/measurement" text="Measurement" />
            </li>
          </ul>
        </nav>
      </aside>
      <section>{children}</section>
    </>
  );
}
