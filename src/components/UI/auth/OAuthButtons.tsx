"use client";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

import { createGoogleAuthorizationURL } from "@/actions/oauth.actions";

import { toast } from "react-toastify";
export default function OAuthButtons({ isLogin }: { isLogin: boolean }) {
  async function signInWithGoogle() {
    const resData = await createGoogleAuthorizationURL();
    if (resData.error) {
      toast.error(resData.error, {
        autoClose: 3000,
        isLoading: false,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        progressClassName: "bg-blue-500",
      });
    } else if (resData.success) {
      window.location.href = resData.data;
    }
  }

  return (
    <div className="flex items-center justify-center flex-col gap-7 w-1/6">
      <Button
        onClick={signInWithGoogle}
        className="relative flex justify-center items-center border-2 border-stone-400 w-full bg-background text-white font-medium rounded-md  shadow-xl py-2"
      >
        <FcGoogle className="text-2xl absolute left-5  h-full" />
        {isLogin ? "Login with Google" : "Sign up with Google"}
      </Button>
    </div>
  );
}
