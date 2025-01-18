import SetRestartedPasswordForm from "./SetRestartedPasswordForm";
export default function SetRestartedPassword() {
  return (
    <div className="flex h-[60vh] items-center justify-center flex-col  gap-10">
      <div className="flex items-center flex-col gap-2 ">
        <h1 className="text-4xl">New password</h1>
        <p className="text-stone-400 text-sm ">
          Set a new password for your account
        </p>
      </div>

      <SetRestartedPasswordForm />
    </div>
  );
}
