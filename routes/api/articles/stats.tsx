import { Handlers } from "$fresh/server.ts";
import { PostService } from "@/blog/post.service.ts";

interface Summary {
  slug: string;
  read_count: number;
  referrals: Record<string, number>;
}

export const handler: Handlers = {
  async GET() {
    const data: Summary[] = [];

    const kv = await Deno.openKv();
    const slugs = (await PostService.getPosts()).map((post) => post.slug);

    for (const slug of slugs) {
      const readCount = await kv.get(["posts", slug, "read_count"]);
      const summary: Summary = {
        slug,
        read_count: Number(readCount.value),
        referrals: {},
      };

      const refs = kv.list({ prefix: ["posts", slug, "referrals"] });
      for await (const ref of refs) {
        const referral = String(ref.key[ref.key.length - 1]);
        summary.referrals = {
          ...summary.referrals,
          [referral]: Number(ref.value),
        };
      }
      data.push(summary);
    }

    return Response.json(data);
  },
};
