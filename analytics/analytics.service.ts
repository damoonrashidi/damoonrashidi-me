class AnalyticsServiceSingleton {
  constructor() {
  }

  async readPost(slug: string, referral: string | undefined | null) {
    const kv = await Deno.openKv();

    const result = kv.atomic()
      .mutate({
        type: "sum",
        key: ["posts", slug, "read_count"],
        value: new Deno.KvU64(1n),
      });

    if (referral) {
      result.mutate({
        type: "sum",
        key: ["posts", slug, "referrals", referral],
        value: new Deno.KvU64(1n),
      });
    }

    await result.commit();
  }
}

export const AnalyticsService = new AnalyticsServiceSingleton();
