import type { Handlers, PageProps } from "$fresh/server.ts";
import { Invite } from "@/routes/wedding/schema.ts";
import { InviteFinder } from "@/islands/wedding/InviteFinder.tsx";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers<{ url: string; invite: Invite }[]> = {
  async GET(_req, ctx) {
    const kv = await Deno.openKv();
    const inviteIterator = kv.list<Invite>({ prefix: ["wedding", "invites"] });
    const invites: Array<{ url: string; invite: Invite }> = [];

    for await (const invite of inviteIterator) {
      invites.push({ url: invite.key.at(-1) as string, invite: invite.value });
    }

    return ctx.render(invites);
  },
};

export default function Osa({
  data,
}: PageProps<{ url: string; invite: Invite }[]>) {
  return (
    <>
      <Head>
        <title>Anna &amp; Damoon</title>
      </Head>
      <link rel="stylesheet" href="/pages/wedding/wedding.css" />{" "}
      <div className="max-w-prose m-auto p-8">
        <h2 className="font-display">Hitta din inbjudan</h2>
        <p className="font-display">
          Mer information om tider och logistik finns på{" "}
          <a href="/wedding">informationssidan</a>
        </p>
        <InviteFinder invites={data} />
      </div>
    </>
  );
}
