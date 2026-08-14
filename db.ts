import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client.ts";

const connectionString = Deno.env.get("DATABASE_URL");

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Deno Deploy injects it for the attached Prisma " +
      "Postgres database; locally use `deno run --tunnel` or a .env file.",
  );
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });
