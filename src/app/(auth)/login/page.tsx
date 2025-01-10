import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center flex-col mt-20 gap-1">
      <h1 className="text-4xl">Welcome back!</h1>
      <p className="text-stone-400 text-sm mb-10">Log in to your account</p>

      <form action="" className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="px-3 py-2 rounded-lg text-xl focus:outline-none text-background"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="px-3 py-2 rounded-lg text-xl focus:outline-none text-background"
          />
        </div>
        <button>Login</button>
      </form>
      <p>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}
