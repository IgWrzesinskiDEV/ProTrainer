"use client";
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
    <div className="w-full max-w-md">
      <button
        onClick={signInWithGoogle}
        type="button"
        className="relative w-full flex justify-center items-center gap-2 bg-white/10 hover:bg-white/15 
        text-white font-medium rounded-lg py-3 px-6 transition-all duration-300 
        border border-gray-700 hover:border-gray-600 shadow-lg"
      >
        <FcGoogle className="text-2xl" />
        <span>{isLogin ? "Login with Google" : "Sign up with Google"}</span>
      </button>
    </div>
  );
}
