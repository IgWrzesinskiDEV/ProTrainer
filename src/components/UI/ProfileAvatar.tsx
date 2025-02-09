import { Avatar } from "@mui/material";
export default function ProfileAvatar({
  className,
  fileName,
}: {
  className: string;
  fileName?: string;
}) {
  return (
    <Avatar
      src={
        fileName
          ? `https://pro-trainer-app.s3.eu-north-1.amazonaws.com/${fileName}`
          : undefined
      }
      alt="The image selected by the user."
      className={className}
    />
  );
}
