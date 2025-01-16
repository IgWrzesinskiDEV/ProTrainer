import { verifyAuth } from "@/lib/lucia/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const result = await verifyAuth();
  console.log(result, "result");
  if (!result.user) {
    return redirect("/auth/login");
  }

  return <div>profile: </div>;
}
