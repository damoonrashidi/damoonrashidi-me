import { Handlers, PageProps } from "$fresh/server.ts";
import { Invite } from "@/routes/wedding/schema.ts";
import { Head } from "$fresh/runtime.ts";

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
      return ctx.renderNotFound();
    }

    const data = await req.formData();

    const i = Number(data.get("index"));

    if (Number.isNaN(i)) {
      return ctx.renderNotFound();
    }

    invite.value.guests[i].willAttend = data.get(`guest-${i}-willAttend`) as
      | "yes"
      | "no";
    invite.value.guests[i].foodPreferences =
      data.get(`guest-${i}-food`)?.toString() ?? "";
    invite.value.guests[i].willSpeak =
      data.get(`guest-${i}-willSpeak`)?.toString() === "on";
    invite.value.guests[i].bio = data.get(`guest-${i}-bio`)?.toString() ?? "";

    await kv.set(["wedding", "invites", ctx.params.invite], invite.value);

    return Response.redirect(req.url + "success", 301);
  },
};

export default function InvitePage({
  data: invite,
  ...props
}: PageProps<Invite>) {
  const isSuccessPostback = props.url.searchParams.get("success") !== null;

  return (
    <>
      <Head>
        <title>{invite.displayName}</title>
      </Head>
      <link rel="stylesheet" href="/pages/wedding/wedding.css" />{" "}
      {isSuccessPostback && (
        <div className="fixed top-8 right-8 w-[200px] p-4 rounded-md bg-[#31f03a99] backdrop-blur-md text-[#fff]">
          Ditt svar har blivit sparat!
        </div>
      )}
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
        {invite.guests.map((guest, i) => {
          const id = `guest-${i}`;
          return (
            <form method="post" action="?" className="my-16">
              <div className="py-4 flex flex-col gap-2">
                <h4 className="mb-2">{guest.name}</h4>
                <input type="hidden" value={i} name="index" />
                <div className="flex gap-2 align-center">
                  <input
                    type="radio"
                    id={`${id}-attend-yes`}
                    value="yes"
                    checked={guest.willAttend === "yes"}
                    name={`${id}-willAttend`}
                  />
                  <label htmlFor={`${id}-attend-yes`}>Jag kommer gärna.</label>

                  <input
                    type="radio"
                    id={`${id}-attend-no`}
                    value="no"
                    checked={guest.willAttend === "no"}
                    name={`${id}-willAttend`}
                  />
                  <label htmlFor={`${id}-attend-no`}>Jag kan inte komma.</label>
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
              <button type="submit" className="border rounded-md px-4 py-2">
                Svara
              </button>
            </form>
          );
        })}
      </div>
    </>
  );
}
