import { Guest } from "@/routes/wedding/schema.ts";
import { useState } from "preact/hooks";

export const InviteForm = ({ guest, i }: { guest: Guest; i: number }) => {
  const id = `guest-${i}`;
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.target as HTMLFormElement);

    await fetch("?", {
      method: "post",
      body: formData,
    });

    setSubmitted(true);
  };

  return (
    <>
      {!submitted && (
        <form method="post" action="?" onSubmit={onSubmit} className="my-16">
          <div className="py-4 flex flex-col gap-2">
            <h4 className="mb-2">{guest.name}</h4>
            <input type="hidden" value={i} name="index" />
            <div className="flex gap-2 align-center">
              <input
                type="radio"
                id={`${id}-attend-yes`}
                value="yes"
                checked={guest.willAttend === "yes"}
                name={`willAttend`}
              />
              <label htmlFor={`${id}-attend-yes`}>Jag kommer gärna.</label>

              <input
                type="radio"
                id={`${id}-attend-no`}
                value="no"
                checked={guest.willAttend === "no"}
                name={`willAttend`}
              />
              <label htmlFor={`${id}-attend-no`}>Jag kan inte komma.</label>
            </div>
            <div className="flex gap-2 align-center">
              <input
                type="checkbox"
                name={`willSpeak`}
                id={`${id}-willSpeak`}
                checked={guest.willSpeak}
              />
              <label htmlFor={`${id}-willSpeak`}>
                Jag önskar att få hålla tal.
              </label>
            </div>
            <input
              type="text"
              name={`food`}
              value={guest.foodPreferences}
              placeholder="Matpreferenser"
              className="border rounded-md border-subtle p-2"
            />
            <textarea
              name={`bio`}
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
      )}
      {submitted && (
        <div className="p-8 rounded-lg flex items-center justify-center h-[380px] bg-[#eee] mb-16">
          Tack för ditt svar {guest.name}!
        </div>
      )}
    </>
  );
};
