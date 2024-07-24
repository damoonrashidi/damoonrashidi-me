import { Invite } from "@/routes/wedding/schema.ts";
import { useState } from "preact/hooks";

export const InviteFinder = ({
  invites,
}: {
  invites: { url: string; invite: Invite }[];
}) => {
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="max-w-prose m-auto pt-4 pb-16">
        <input
          placeholder="Ditt namn"
          value={query}
          className="rounded-sm px-4 py-2 border font-display text-xl w-full border-[#aaa]"
          onInput={(event) => setQuery(event.currentTarget.value.toLowerCase())}
        />
        {invites
          .filter(
            ({ invite }) =>
              query.length > 1 &&
              invite.guests.some((guest) =>
                guest.name.toLowerCase().match(query),
              ),
          )
          .map(({ url, invite }) => {
            return (
              <div
                key={url}
                className="rounded-md border border-[#eee] p-8 my-4 font-display cursor-pointer"
                onClick={() => {
                  globalThis.location.href = `/wedding/${url}`;
                }}
              >
                <a
                  href={`/wedding/${url}`}
                  className="text-lg text-[#111] mb-2 inline-block"
                >
                  {invite.displayName}
                </a>
                {invite.guests.length > 1 && (
                  <ul>
                    {invite.guests.map(({ name }) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};
