import Link from "next/link";
import Input from "@/components/UI/auth/Input";
import { ComponentProps } from "react";
import { FcGoogle } from "react-icons/fc";

interface AuthProps extends ComponentProps<"div"> {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthProps) {
  return (
    <div className="flex h-screen items-center flex-col  gap-10">
      <div className="flex items-center flex-col gap-1 ">
        <h1 className="text-4xl">{isLogin ? "Log in" : "Sign up"}</h1>
        <p className="text-stone-400 text-sm ">
          {isLogin
            ? "Log in to your account"
            : "Create account to get started!"}
        </p>
      </div>
      <button className="relative flex justify-center items-center border-2 border-stone-400 bg-background text-white font-medium rounded-md w-1/6 shadow-xl py-2">
        <FcGoogle className="text-2xl absolute left-5  h-full" />
        {isLogin ? "Login with Google" : "Sign up with Google"}
      </button>
      <div className="flex items-center justify-around gap-2 w-1/6">
        <div className="h-[1px] opacity-20  bg-stone-200 rounded-lg flex-1 mx-1" />
        <p className="text-stone-400 text-sm">Or with email</p>
        <div className="h-[1px] opacity-20  bg-stone-200 flex-1 rounded-lg mx-1" />
      </div>
      <form action="" className="flex flex-col gap-6 w-1/6">
        {!isLogin && <Input label="username" type="text" />}
        <Input label="email" type="text" />
        <Input label="password" type="password" />
        <button className=" py-2 text-xl bg-blue-500 rounded-lg w-full mx-auto ">
          {isLogin ? "Log in" : "Sign up"}
        </button>
      </form>
      <p className="text-sm mt-4 font-extralight">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          href={`/${isLogin ? "signup" : "login"}`}
          className="text-blue-400 font-normal"
        >
          {isLogin ? "Sign up" : "Log in"}
        </Link>
      </p>
    </div>
  );
}
