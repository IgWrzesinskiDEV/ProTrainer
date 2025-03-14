import { verifyAuth } from "@/lib/lucia/auth";

import { IUserRole } from "@/lib/models/user.model";

export const revalidate = 0;
export default async function profileLayout({
  trainer,
  client,
}: {
  trainer: React.ReactNode;
  client: React.ReactNode;
}) {
  const { user } = await verifyAuth();
  const { role } = user!;

  return <section>{role === IUserRole.CLIENT ? client : trainer}</section>;
}
