import { Handlers, PageProps } from "$fresh/server.ts";
import { Invite } from "@/routes/wedding/schema.ts";

export const handler: Handlers<Invite> = {
  async GET(_req, ctx) {
    const kv = await Deno.openKv();
    const invite = await kv.get(["wedding", "invites", ctx.params.invite]);

    if (!invite.value) {
      return ctx.renderNotFound();
    }

    return ctx.render(invite.value as Invite);
  },

  async POST(req, ctx) {
    const kv = await Deno.openKv();
    const invite = await kv.get<Invite>([
      "wedding",
      "invites",
      ctx.params.invite,
    ]);

    if (!invite.value) {
      return ctx.renderNotFound();
    }

    const data = await req.formData();

    invite.value.guests.forEach((guest, i) => {
      guest.willAttend = data.get(`guest-${i}-willAttend`)?.toString() === "on";
      guest.foodPreferences = data.get(`guest-${i}-food`)?.toString() ?? "";
      guest.willSpeak = data.get(`guest-${i}-willSpeak`)?.toString() === "on";
      guest.bio = data.get(`guest-${i}-bio`)?.toString() ?? "";
    });

    console.table(invite.value.guests);

    await kv.set(["wedding", "invites", ctx.params.invite], invite.value);

    return Response.redirect(req.url, 301);
  },
};

export default function InvitePage({ data: invite }: PageProps<Invite>) {
  return (
    <>
      <div className="max-w-prose px-8 m-auto py-16 font-display ">
        <div className="text-center">
          <h2>{invite.displayName}</h2>
          <p>
            Vi skulle bli väldigt glada om ni vill dela den första dagen av vårt
            äktenskap med oss. Fyll i formuläret nedan för att låta oss veta om
            ni har möjlighet att komma, om ni har några specifika matpreferenser
            eller om ni vill hålla ett tal.
          </p>
          <p>
            Om ni vill kan ni även fylla i ett inlägg till gästboken för att de
            andra gästerna ska få veta vilka ni är.
          </p>
          <p>
            Mer information om tider och platser finns på{" "}
            <a href="/wedding" target="_blank">
              informationssidan
            </a>
            .
          </p>
        </div>
        <form method="post" action="?" className="my-16">
          {invite.guests.map((guest, i) => {
            const id = `guest-${i}`;
            return (
              <div className="py-4 flex flex-col gap-2">
                <h4 className="mb-2">{guest.name}</h4>
                <div className="flex gap-2 align-center">
                  <input
                    type="checkbox"
                    id={`${id}-attend`}
                    checked={guest.willAttend}
                    name={`${id}-willAttend`}
                  />
                  <label htmlFor={`${id}-attend`}>Jag kommer gärna.</label>
                </div>
                <div className="flex gap-2 align-center">
                  <input
                    type="checkbox"
                    name={`${id}-willSpeak`}
                    id={`${id}-willSpeak`}
                    checked={guest.willSpeak}
                  />
                  <label htmlFor={`${id}-willSpeak`}>
                    Jag önskar att få hålla tal.
                  </label>
                </div>
                <input
                  type="text"
                  name={`${id}-food`}
                  value={guest.foodPreferences}
                  placeholder="Matpreferenser"
                  className="border rounded-md border-subtle p-2"
                />
                <textarea
                  name={`${id}-bio`}
                  placeholder="Berätta om dig själv"
                  className="border rounded-md border-subtle p-2"
                  value={guest.bio}
                />
                <span className="text-subtle">
                  * Texten om dig själv är publik och kan ses av andra gäster
                </span>
              </div>
            );
          })}
          <button type="submit" className="border rounded-md px-4 py-2">
            Svara
          </button>
        </form>
      </div>
    </>
  );
}
