import { Handlers } from "$fresh/server.ts";
import { PostService } from "@/blog/postService.ts";

export const handler: Handlers = {
  async GET() {
    const service = new PostService();
    const posts = await service.getPosts();
    const slugs = posts.map((post) => post.slug);
    const kv = await Deno.openKv();
    const keys = slugs.map((slug) => ["posts", slug, "read_count"]);
    const pairs = await kv.getMany<bigint[]>(keys);
    const data: Record<string, number> = {};
    for (const pair of pairs) {
      data[String(pair.key.filter((part) => slugs.includes(String(part))))] =
        Number(
          pair.value ?? 0,
        );
    }
    return Response.json(data);
  },
};
