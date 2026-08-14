import { prisma } from "@/db.ts";
import { Guest, Invite } from "@/routes/wedding/schema.ts";

type InviteRow = { slug: string; displayName: string; guests: GuestRow[] };
type GuestRow = {
  name: string;
  willAttend: "yes" | "no" | "unknown";
  foodPreferences: string;
  bio: string;
  willSpeak: boolean;
};

const withGuests = {
  include: { guests: { orderBy: { position: "asc" } } },
} as const;

function toInvite({ displayName, guests }: InviteRow): Invite {
  return {
    displayName,
    guests: guests.map((guest): Guest => ({
      name: guest.name,
      willAttend: guest.willAttend,
      foodPreferences: guest.foodPreferences,
      bio: guest.bio,
      willSpeak: guest.willSpeak,
    })),
  };
}

class InviteServiceSingleton {
  async get(slug: string): Promise<Invite | null> {
    const invite = await prisma.invite.findUnique({
      where: { slug },
      ...withGuests,
    });

    return invite ? toInvite(invite) : null;
  }

  async list(): Promise<Array<{ url: string; invite: Invite }>> {
    const invites = await prisma.invite.findMany({
      orderBy: { slug: "asc" },
      ...withGuests,
    });

    return invites.map((invite) => ({
      url: invite.slug,
      invite: toInvite(invite),
    }));
  }

  /**
   * Updates a single guest by its position within the invite, which is the
   * index the RSVP form posts back.
   */
  async updateGuest(
    slug: string,
    position: number,
    answers: Omit<Guest, "name">,
  ): Promise<boolean> {
    const result = await prisma.guest.updateMany({
      where: { inviteSlug: slug, position },
      data: answers,
    });

    return result.count > 0;
  }

  async deleteAll(): Promise<number> {
    const { count } = await prisma.invite.deleteMany();
    return count;
  }
}

export const InviteService = new InviteServiceSingleton();
