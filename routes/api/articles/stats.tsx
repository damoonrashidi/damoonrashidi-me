import { Handlers } from "$fresh/server.ts";
import { AnalyticsService } from "@/analytics/analytics.service.ts";
import { PostService } from "@/blog/post.service.ts";

interface Summary {
  slug: string;
  read_count: number;
  referrals: Record<string, number>;
}

export const handler: Handlers = {
  async GET() {
    const slugs = (await PostService.getPosts()).map((post) => post.slug);
    const statistics = await AnalyticsService.getPostStatistics(slugs);

    const data: Summary[] = statistics.map((
      { slug, readCount, referrals },
    ) => ({
      slug,
      read_count: readCount,
      referrals,
    }));

    return Response.json(data);
  },
};
