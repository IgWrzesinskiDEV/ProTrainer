import { LuExternalLink } from "react-icons/lu";

export default function SocialLink({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center"
    >
      {icon}
      <LuExternalLink size={16} className="ml-1" />
    </a>
  );
}
