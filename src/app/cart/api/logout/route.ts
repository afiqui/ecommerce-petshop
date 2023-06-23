import { destroySession } from "@/hooks/session";

export async function GET(request: Request) {
  destroySession();
  return new Response(null, { status: 200 });
}
