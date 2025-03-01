"use client";

import { useRef, useState } from "react";
import { Avatar } from "@mui/material";
export default function ImagePicker({
  name,
  avatarFileName,
}: {
  name: string;
  avatarFileName?: string;
}) {
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>();
  const imageInput = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    imageInput.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <>
      <div className="relative mb-4">
        <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
          <Avatar
            src={
              (pickedImage as string) ||
              `https://pro-trainer-app.s3.eu-north-1.amazonaws.com/${avatarFileName}` ||
              undefined
            }
            className="h-full w-full text-gray-300 bg-[#4B5563] "
          />
        </div>
        <button
          type="button"
          onClick={handlePickClick}
          className="absolute bottom-0 right-0 bg-[#2673e8] hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>
      <input
        className="hidden"
        type="file"
        id={name}
        accept="image/png, image/jpeg"
        name={name}
        ref={imageInput}
        onChange={handleImageChange}
      />
      <button
        className="text-[#2673e8] hover:text-blue-400 text-sm font-medium mb-6"
        type="button"
        onClick={handlePickClick}
      >
        Change avatar
      </button>
    </>
  );
}
