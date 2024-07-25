import { Handlers, PageProps } from "$fresh/server.ts";
import { Invite } from "@/routes/wedding/schema.ts";
import { Head } from "$fresh/runtime.ts";
import { InviteForm } from "@/islands/wedding/InviteForm.tsx";

export const handler: Handlers<Invite> = {
  async GET(_req, ctx) {
    const kv = await Deno.openKv();
    const invite = await kv.get<Invite>([
      "wedding",
      "invites",
      ctx.params.invite,
    ]);

    if (!invite.value) {
      return ctx.renderNotFound();
    }

    return ctx.render(invite.value);
  },

  async POST(req, ctx) {
    const kv = await Deno.openKv();
    const invite = await kv.get<Invite>([
      "wedding",
      "invites",
      ctx.params.invite,
    ]);

    if (!invite.value) {
      return Response.json({ success: false });
    }

    const data = await req.formData();

    const i = Number(data.get("index"));

    if (Number.isNaN(i)) {
      return Response.json({ success: false });
    }

    invite.value.guests[i].willAttend = data.get(`willAttend`) as "yes" | "no";
    invite.value.guests[i].foodPreferences = data.get(`food`)?.toString() ?? "";
    invite.value.guests[i].willSpeak =
      data.get(`willSpeak`)?.toString() === "on";
    invite.value.guests[i].bio = data.get(`bio`)?.toString() ?? "";

    await kv.set(["wedding", "invites", ctx.params.invite], invite.value);

    return Response.json({ success: true });
  },
};

export default function InvitePage({ data: invite }: PageProps<Invite>) {
  return (
    <>
      <Head>
        <title>{invite.displayName}</title>
      </Head>
      <link rel="stylesheet" href="/pages/wedding/wedding.css" />
      <div className="max-w-prose px-8 m-auto py-16 font-display ">
        <div>
          <h2 className="text-center">{invite.displayName}</h2>
          <p>
            Vi skulle bli väldigt glada om ni vill dela den första dagen av vårt
            äktenskap med oss. Fyll i formuläret nedan för att låta oss veta om
            ni har möjlighet att komma, om ni har några specifika matpreferenser
            eller om ni vill hålla ett tal.
          </p>
          <p>OSA gärna så snart som möjligt, men senast 21 Augusti.</p>
          <p>
            Om ni vill kan ni även fylla i ett inlägg till gästboken för att de
            andra gästerna ska få veta vilka ni är.
          </p>
          <p className="font-display">
            Besök{" "}
            <a href="/wedding" className="text-[#111]">
              Informationssidan
            </a>{" "}
            för detaljer om bröllopet, eller läs om de andra gästerna i{" "}
            <a href="/wedding/guestbook" className="text-[#111]">
              Gästboken
            </a>
            .
          </p>
        </div>
        {invite.guests.map((guest, i) => (
          <InviteForm guest={guest} i={i} />
        ))}
      </div>
    </>
  );
}
