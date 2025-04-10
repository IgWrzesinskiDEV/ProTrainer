// app/api/pusher/auth/route.ts

import { pusherAuthAction } from "@/actions/chat/pusherAuth.action";

export async function POST(req: Request) {
  const form = await req.formData();
  const socket_id = form.get("socket_id") as string;
  const channel_name = form.get("channel_name") as string;

  if (!socket_id || !channel_name)
    return new Response("Missing params", { status: 400 });

  const { status, body } = await pusherAuthAction(socket_id, channel_name);

  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
