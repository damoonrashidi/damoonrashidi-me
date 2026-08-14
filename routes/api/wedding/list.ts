import { Handlers } from "$fresh/server.ts";
import { Guest } from "@/routes/wedding/schema.ts";
import { InviteService } from "@/wedding/invite.service.ts";

export const handler: Handlers = {
  async GET() {
    const invites = await InviteService.list();

    const urls: Record<string, string> = {};
    const acceptList: Guest[] = [];
    const noList: Guest[] = [];
    let guestCount = 0;

    for (const { url, invite } of invites) {
      urls[url] = invite.displayName;
      guestCount += invite.guests.length;
      acceptList.push(
        ...invite.guests.filter((guest) => guest.willAttend === "yes"),
      );
      noList.push(
        ...invite.guests.filter((guest) => guest.willAttend === "no"),
      );
    }

    return Response.json({
      urls,
      count: guestCount,
      acceptCount: acceptList.length,
      acceptList,
      noList,
    });
  },
};
