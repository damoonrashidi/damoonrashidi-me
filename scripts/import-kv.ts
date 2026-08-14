/**
 * One-off migration: copies the old Deno KV contents into Postgres.
 *
 *   deno task db:import-kv                 # reads the default local KV store
 *   deno task db:import-kv <kv-url-or-path>
 *
 * Counters are written with `set`, not `increment`, so the script is
 * idempotent and can be re-run safely.
 */
import { Invite } from "@/routes/wedding/schema.ts";
import { prisma } from "@/db.ts";

const kv = await Deno.openKv(Deno.args[0]);

let posts = 0;
let pages = 0;
let referrals = 0;
let invites = 0;

for await (const entry of kv.list({ prefix: ["posts"] })) {
  const [, slug, kind, source] = entry.key as string[];

  if (kind === "read_count") {
    const readCount = Number(entry.value);
    await prisma.postStat.upsert({
      where: { slug },
      create: { slug, readCount },
      update: { readCount },
    });
    posts++;
  } else if (kind === "referrals" && source) {
    const count = Number(entry.value);
    await prisma.referral.upsert({
      where: { slug_source: { slug, source } },
      create: { slug, source, count },
      update: { count },
    });
    referrals++;
  }
}

for await (const entry of kv.list({ prefix: ["project"] })) {
  const [, page, kind] = entry.key as string[];

  if (kind === "view_count") {
    const viewCount = Number(entry.value);
    await prisma.pageStat.upsert({
      where: { page },
      create: { page, viewCount },
      update: { viewCount },
    });
    pages++;
  }
}

for await (
  const entry of kv.list<Invite>({ prefix: ["wedding", "invites"] })
) {
  const slug = String(entry.key.at(-1));
  const { displayName, guests } = entry.value;

  const rows = guests.map((guest, position) => ({
    position,
    name: guest.name,
    willAttend: guest.willAttend,
    foodPreferences: guest.foodPreferences,
    bio: guest.bio,
    willSpeak: guest.willSpeak,
  }));

  // Guests have no stable id in KV, so replace the set wholesale.
  await prisma.$transaction([
    prisma.invite.upsert({
      where: { slug },
      create: { slug, displayName },
      update: { displayName },
    }),
    prisma.guest.deleteMany({ where: { inviteSlug: slug } }),
    prisma.guest.createMany({
      data: rows.map((row) => ({ ...row, inviteSlug: slug })),
    }),
  ]);
  invites++;
}

kv.close();
await prisma.$disconnect();

console.log(
  `Imported ${posts} post counters, ${pages} page counters, ` +
    `${referrals} referrals and ${invites} invites.`,
);
