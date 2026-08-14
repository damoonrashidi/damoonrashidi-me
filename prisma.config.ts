import process from "node:process";

/**
 * Deliberately does not import `defineConfig` from "prisma/config": that would
 * make the Prisma CLI a dependency of the project, and @prisma/client lists it
 * as an optional peer, which drags the CLI (plus c12 and ohash) into the
 * deployed module graph. The CLI is invoked as `npm:prisma` from tasks instead.
 */
export default {
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
};
