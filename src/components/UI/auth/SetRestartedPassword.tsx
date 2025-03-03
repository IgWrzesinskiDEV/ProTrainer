import SetRestartedPasswordForm from "./SetRestartedPasswordForm";

export default function SetRestartedPassword() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            New Password
          </h1>
          <p className="text-gray-400 mt-2">
            Set a new secure password for your account
          </p>
        </div>

        <SetRestartedPasswordForm />
      </div>
    </div>
  );
}
