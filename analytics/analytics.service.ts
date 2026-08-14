import { prisma } from "@/db.ts";

export interface PostStatistic {
  slug: string;
  readCount: number;
  referrals: Record<string, number>;
}

/**
 * Counters are written fire-and-forget from route handlers, so a database
 * hiccup must never take a page down with it.
 */
function swallow(operation: Promise<unknown>): Promise<void> {
  return operation.then(() => {}).catch((error) => {
    console.error("analytics write failed", error);
  });
}

function countReferral(slug: string, source: string) {
  return prisma.referral.upsert({
    where: { slug_source: { slug, source } },
    create: { slug, source, count: 1 },
    update: { count: { increment: 1 } },
  });
}

class AnalyticsServiceSingleton {
  readPost(slug: string, referral: string | undefined | null): Promise<void> {
    return swallow(prisma.$transaction([
      prisma.postStat.upsert({
        where: { slug },
        create: { slug, readCount: 1 },
        update: { readCount: { increment: 1 } },
      }),
      ...(referral ? [countReferral(slug, referral)] : []),
    ]));
  }

  viewPage(page: string, referral: string | undefined | null): Promise<void> {
    return swallow(prisma.$transaction([
      prisma.pageStat.upsert({
        where: { page },
        create: { page, viewCount: 1 },
        update: { viewCount: { increment: 1 } },
      }),
      ...(referral ? [countReferral(page, referral)] : []),
    ]));
  }

  /**
   * Read counts and referrals for the given slugs, in the order they were
   * asked for. Slugs that have never been read come back with zero counts.
   */
  async getPostStatistics(slugs: string[]): Promise<PostStatistic[]> {
    const [stats, referrals] = await Promise.all([
      prisma.postStat.findMany({ where: { slug: { in: slugs } } }),
      prisma.referral.findMany({ where: { slug: { in: slugs } } }),
    ]);

    const readCounts = new Map(stats.map(({ slug, readCount }) => [
      slug,
      readCount,
    ]));

    return slugs.map((slug) => ({
      slug,
      readCount: readCounts.get(slug) ?? 0,
      referrals: Object.fromEntries(
        referrals
          .filter((referral) => referral.slug === slug)
          .map(({ source, count }) => [source, count]),
      ),
    }));
  }
}

export const AnalyticsService = new AnalyticsServiceSingleton();
