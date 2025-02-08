import { Avatar } from "@mui/material";

export default function AsideNav({
  children,
  userName,
  avatarFileName,
}: {
  children: React.ReactNode;
  userName: string;
  avatarFileName?: string;
}) {
  return (
    <aside className="flex gap-4 flex-col ">
      <div className="flex items-center gap-2 ">
        <Avatar
          src={
            avatarFileName
              ? `https://pro-trainer-app.s3.eu-north-1.amazonaws.com/${avatarFileName}`
              : undefined
          }
          alt="The image selected by the user."
          className="w-20 h-20 border-stone-600 border-2 p-1"
        />
        <h2 className="text-4xl ">{userName}</h2>
      </div>
      <nav className="">
        <ul className="flex  gap-1">{children}</ul>
      </nav>
    </aside>
  );
}
