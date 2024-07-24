import { Handlers } from "$fresh/server.ts";
import { Invite } from "@/routes/wedding/schema.ts";

export const handler: Handlers = {
  async GET() {
    const kv = await Deno.openKv();

    const inviteIterator = kv.list({ prefix: ["wedding", "invites"] });

    for await (const invite of inviteIterator) {
      kv.delete(invite.key);
    }

    const invites: Record<string, Invite> = {
      firali: {
        displayName: "Mamma & Pappa (och parpar)",
        guests: [
          {
            name: "Firouzeh Badiee",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Ali Rashidi",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Parpar Badiee",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      mop: {
        displayName: "Mamma & Pappa",
        guests: [
          {
            name: "Ann Margaret Dahlström",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Mats Dahlström",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      firooz: {
        displayName: "Firooz Badiee",
        guests: [
          {
            name: "Firooz Badiee",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      fasaid: {
        displayName: "Fariba & Said",
        guests: [
          {
            name: "Fariba Badiee",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Said Afshar",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      faramarz: {
        displayName: "Faramarz Badiee",
        guests: [
          {
            name: "Faramarz Badiee",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      danjos: {
        displayName: "Danial & Josefin",
        guests: [
          {
            name: "Danial Rashidi",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Josefin Ragnarsson",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      luni: {
        displayName: "Nicklas & Lucille",
        guests: [
          {
            name: "Nicklas Nordenmark",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Lucile Nordenmark",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      bemi: {
        displayName: "Mikael & Beatrice",
        guests: [
          {
            name: "Mikael Karlström",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Beatrice Briesch",
            willAttend: "unknown",
            foodPreferences: "Vegan",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      stenat: {
        displayName: "Stefan & Natalie",
        guests: [
          {
            name: "Stefan Danneil",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Natalie Danneil",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      cagen: {
        displayName: "Carl & Genet",
        guests: [
          {
            name: "Carl Forsgren",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Genet Tadesse",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      antjul: {
        displayName: "Anton & Julia",
        guests: [
          {
            name: "Anton Gaddefors",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Julia Keranovic",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      belin: {
        displayName: "Ben & Elin",
        guests: [
          {
            name: "Ben Wolfgang McAdam",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Elin McAdam",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      anida: {
        displayName: "Anton & Ida",
        guests: [
          {
            name: "Anton Bjertin",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Ida Glenne",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      jenik: {
        displayName: "Besnik & Jenny",
        guests: [
          {
            name: "Besnik Gashi",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Jenny Jeppsson",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      viktor: {
        displayName: "Viktor Gaddefors",
        guests: [
          {
            name: "Viktor Gaddefors",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      golnaz: {
        displayName: "Kierulf Afshar",
        guests: [
          {
            name: "Golnaz Kierulf Afshar",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Johan Kierulf Afshar",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      peyman: {
        displayName: "Peyman Afshar",
        guests: [
          {
            name: "Peyman Afshar",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      sara: {
        displayName: "Sara Dahlström",
        guests: [
          {
            name: "Sara Dahlström",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      tils: {
        displayName: "Tilde & Sam",
        guests: [
          {
            name: "Tilde Bergman",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Sam Meskanen",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      marthen: {
        displayName: "Mårthen Bergman",
        guests: [
          {
            name: "Mårthen Bergman",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      bergman: {
        displayName: "Karin & Thomas",
        guests: [
          {
            name: "Karin Bergman",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Thomas Bergman",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      emoffer: {
        displayName: "Emma & Christoffer",
        guests: [
          {
            name: "Emma Karlsson",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Christoffer Toyler",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      amelinez: {
        displayName: "Inez & Amelia",
        guests: [
          {
            name: "Inez Ekblad",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Amelia Johansson",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      sandra: {
        displayName: "Sandra Skilberg",
        guests: [
          {
            name: "Sandra Skilberg",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Jonas Bäsk",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      marco: {
        displayName: "Marco Del Canale",
        guests: [
          {
            name: "Marco Del Canale",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      love: {
        displayName: "Love Ekberg",
        guests: [
          {
            name: "Love Ekberg",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      christopher: {
        displayName: "Christopher Agersand",
        guests: [
          {
            name: "Christopher Agersand",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      fellibelli: {
        displayName: "Isabelle & Felix",
        guests: [
          {
            name: "Isabelle Gilezan",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Felix Nilsson",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      chalbjor: {
        displayName: "Charlotte & Björn",
        guests: [
          {
            name: "Charlotte Lagersten",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Björn Lagersten",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      carro: {
        displayName: "Carolina Lagersten",
        guests: [
          {
            name: "Carolina Lagersten",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      sophia: {
        displayName: "Sophia Lagersten",
        guests: [
          {
            name: "Sophia Lagersten",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      dorfred: {
        displayName: "Dorothea & Fredrik",
        guests: [
          {
            name: "Dorothea Neumann",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Fredrik Söderstedt",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      steph: {
        displayName: "Stephanie Neumann",
        guests: [
          {
            name: "Stephanie Neumann",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      olle: {
        displayName: "Olle Wennberg",
        guests: [
          {
            name: "Olle Wennberg",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      wiltrud: {
        displayName: "Wiltrud Neumann",
        guests: [
          {
            name: "Wiltrud Neumann",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      bobkar: {
        displayName: "Bobo & Karin",
        guests: [
          {
            name: "Bobo Dahlström",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Karin Dahlström",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      johan: {
        displayName: "Johan Dahlström",
        guests: [
          {
            name: "Johan Dahlström",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      miksab: {
        displayName: "Mikael & Sabina",
        guests: [
          {
            name: "Mikael Dahlström",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Sabina Dahlin",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      salgus: {
        displayName: "Familjen Salazar Gustavsson",
        guests: [
          {
            name: "Julia Salazar Gustavsson",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Joakim Salazar Gustavsson",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Gabriella Salazar Gustavsson",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
          {
            name: "Isabelle Salazar Gustavsson",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      tilde: {
        displayName: "Tilde Avelin",
        guests: [
          {
            name: "Tilde Avelin",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      erik: {
        displayName: "Erik Tagiev",
        guests: [
          {
            name: "Erik Tagiev",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
      ingela: {
        displayName: "Ingela Seger",
        guests: [
          {
            name: "Ingela Seger",
            willAttend: "unknown",
            foodPreferences: "",
            bio: "",
            willSpeak: false,
          },
        ],
      },
    };

    for (const [key, invite] of Object.entries(invites)) {
      console.log(`seeding ${key} with ${invite.displayName}`);
      await kv.set(["wedding", "invites", key], invite);
    }

    return Response.json({ seeded: true });
  },
};
