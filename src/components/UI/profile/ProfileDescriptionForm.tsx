import AuthButton from "../auth/AuthButton";
import Input from "../Input";
export default function ProfileDescriptionForm() {
  return (
    <form action="" className="flex items-center justify-center flex-col gap-6">
      <Input label="full Name" name="fullName" type="text" />
      <Input label="Bio" name="bio" type="text" />

      <AuthButton type="submit" className="w-1/5">
        Save
      </AuthButton>
    </form>
  );
}
