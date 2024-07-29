import { PageProps, Handlers } from "$fresh/server.ts";
import { Invite } from "@/routes/wedding/schema.ts";

interface GuestbookEntry {
  name: string;
  entry: string;
}

export const handler: Handlers<GuestbookEntry[]> = {
  async GET(_, ctx) {
    const kv = await Deno.openKv();

    const inviteIterator = kv.list<Invite>({ prefix: ["wedding", "invites"] });
    const invites: Invite[] = [];

    for await (const invite of inviteIterator) {
      invites.push(invite.value);
    }

    const guestbookEntries = invites
      .flatMap((invite) => invite.guests)
      .filter((guest) => guest.willAttend === "yes" && guest.bio.length > 0)
      .toSorted((a, b) => a.name.localeCompare(b.name))
      .map((guest) => ({
        name: guest.name,
        entry: guest.bio,
      }));

    return ctx.render(guestbookEntries);
  },
};

export default function Guestbook(props: PageProps<GuestbookEntry[]>) {
  return (
    <div className="m-auto max-w-prose p-8 font-display">
      <h2 className="mb-2">Gästbok</h2>
      <p>
        Om man vill lära känna de andra gästerna innan bröllopet. Mer
        information finns på <a href="/wedding/">informationssidan</a>.
      </p>
      <div className="bg-[#aaa] h-[1px] mb-4" />
      {props.data.map(({ name, entry }) => (
        <div>
          <h3 className="mb-2">{name}</h3>
          <p className="pb-4">{entry}</p>
        </div>
      ))}
    </div>
  );
}
