import { Handlers } from "$fresh/server.ts";
import { PostService } from "@/blog/postService.ts";

export const handler: Handlers = {
  async GET() {
    const service = new PostService();

    const slugs = (await service.getPosts()).map(({ slug }) => slug);

    const kv = await Deno.openKv();
    const entries = kv.list<string>({ prefix: ["posts"] });
    const trash = [];
    for await (const entry of entries) {
      if (!entry.key.some((key) => slugs.includes(String(key)))) {
        trash.push(entry.key);
        await kv.delete(entry.key);
      }
    }
    return Response.json(trash);
  },
};
