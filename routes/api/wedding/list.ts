import { Handlers } from "$fresh/server.ts";
import { Guest, Invite } from "@/routes/wedding/schema.ts";

export const handler: Handlers = {
  async GET() {
    const kv = await Deno.openKv();

    const inviteIterator = kv.list<Invite>({ prefix: ["wedding", "invites"] });

    const urls: Record<string, string> = {};
    const invites: Invite[] = [];
    let guestCount = 0;
    const accepted: Guest[] = [];

    for await (const invite of inviteIterator) {
      invites.push(invite.value as Invite);
      urls[String(invite.key.at(-1))] = invite.value.displayName;
      guestCount += invite.value.guests.length;
      accepted.push(...invite.value.guests.filter((guest) => guest.willAttend));
    }

    return Response.json({ urls, count: guestCount, accepted });
  },
};
