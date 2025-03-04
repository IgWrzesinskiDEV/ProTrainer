import ProfileLink from "../profile/ProfileLink";

export default function MobileNav({
  NavLinks,
  setIsMenuOpen,
}: {
  NavLinks: string[];
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="absolute z-10 w-full bg-[#1e1b19] border-t border-gray-700 shadow-lg rounded-b-lg max-h-[70vh] overflow-y-auto">
      <div className="py-2 px-1">
        {NavLinks.map((tab) => (
          <div
            key={tab}
            className="mb-1 last:mb-0"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <ProfileLink
              href={`/dashboard/${tab.split(" ").join("-").toLowerCase()}`}
              text={tab}
              fullWidth
            />
          </div>
        ))}
      </div>
    </div>
  );
}
