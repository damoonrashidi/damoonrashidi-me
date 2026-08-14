# Fresh project

Your new Fresh project is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Database

Persistence is Prisma ORM on top of the Prisma Postgres instance attached to the
app in Deno Deploy. `DATABASE_URL` is injected automatically on Deploy; to run
against a hosted timeline from your machine use tunnel mode:

```
deno run --tunnel -A dev.ts
```

Alternatively copy a connection string from the Deploy dashboard (Databases →
URL) into a `.env` file — see `.env.example`.

| Task                     | What it does                                    |
| ------------------------ | ----------------------------------------------- |
| `deno task migrate`      | Apply pending migrations using the injected env |
| `deno task db:generate`  | Regenerate the client into `generated/prisma`   |
| `deno task db:migrate`   | Create and apply a migration in development     |
| `deno task db:deploy`    | Apply pending migrations using `.env`           |
| `deno task db:studio`    | Browse and edit rows, including wedding invites |
| `deno task db:import-kv` | One-off import of the old Deno KV contents      |

`deno task build` runs `db:generate` first, so the generated client is not
checked in.

Each timeline (production, preview, every git branch) gets its own database, so
each one needs the migrations applied. Rather than doing that by hand, set the
**Pre-Deploy Command** in the app's Settings → App Config to:

```
deno task migrate
```

It runs before a revision starts serving traffic, with the same environment
variables as the app, so every timeline migrates itself on deploy.
