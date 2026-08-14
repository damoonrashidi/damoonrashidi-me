import { Handlers } from "$fresh/server.ts";
import { InviteService } from "@/wedding/invite.service.ts";

/**
 * Wipes every invite. The KV version was a no-op (it deleted a single
 * mistyped key), whereas `deleteMany` really does drop the table, so this
 * needs a shared secret before it will do anything.
 */
export const handler: Handlers = {
  async POST(req) {
    const token = Deno.env.get("WEDDING_ADMIN_TOKEN");

    if (!token || req.headers.get("authorization") !== `Bearer ${token}`) {
      return Response.json({ reset: false }, { status: 401 });
    }

    const deleted = await InviteService.deleteAll();

    return Response.json({ reset: true, deleted });
  },
};
