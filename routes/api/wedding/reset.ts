import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET() {
    const kv = await Deno.openKv();

    await kv.delete(["weddings", "invites"]);

    return Response.json({ reset: true });
  },
};
