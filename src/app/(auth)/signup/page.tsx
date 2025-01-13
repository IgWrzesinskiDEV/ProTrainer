import Link from "next/link";
import Input from "@/components/UI/auth/Input";
export default function SignupPage() {
  return (
    <div className="flex h-screen items-center flex-col  gap-1">
      <h1 className="text-4xl">Sign up</h1>
      <p className="text-stone-400 text-sm mb-10">
        Create account to get started!{" "}
      </p>

      <form action="" className="flex flex-col gap-10">
        <Input label="username" type="text" />
        <Input label="email" type="text" />
        <Input label="password" type="password" />

        <button className=" py-2 text-xl bg-blue-500 rounded-lg w-1/2 mx-auto ">
          Sign up
        </button>
      </form>
      <p className="text-sm mt-4 font-extralight">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 font-normal">
          Log in
        </Link>
      </p>
    </div>
  );
}
