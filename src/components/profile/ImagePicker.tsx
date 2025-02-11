"use client";

import { useRef, useState } from "react";
import { Avatar } from "@mui/material";
export default function ImagePicker({ name }: { name: string }) {
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
    <div className="flex items-center justify-center flex-col gap-3 mb-3">
      <Avatar
        src={(pickedImage as string) || undefined}
        alt="The image selected by the user."
        className="w-20 h-20 border-stone-600 border-2 p-1"
      />
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
        className="text-center underline text-blue-500"
        type="button"
        onClick={handlePickClick}
      >
        Change avatar
      </button>
    </div>
  );
}
