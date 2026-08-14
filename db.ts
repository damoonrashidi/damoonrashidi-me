import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client.ts";

let client: PrismaClient | undefined;

function connect(): PrismaClient {
  const connectionString = Deno.env.get("DATABASE_URL");

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Deno Deploy injects it for the attached Prisma " +
        "Postgres database; locally use `deno run --tunnel` or a .env file.",
    );
  }

  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

/**
 * The client is created on first use rather than on import: `deno task build`
 * loads every route to generate the manifest, and the build environment has no
 * database credentials.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, property) {
    client ??= connect();
    const value = Reflect.get(client, property);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
