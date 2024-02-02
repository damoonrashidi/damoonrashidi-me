class AnalyticsServiceSingleton {
  async readPost(slug: string, referral: string | undefined | null) {
    const kv = await Deno.openKv();

    const result = kv.atomic().mutate({
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

  async viewPage(page: string, referral: string | undefined | null) {
    const kv = await Deno.openKv();

    const result = kv.atomic().mutate({
      type: "sum",
      key: ["project", page, "view_count"],
      value: new Deno.KvU64(1n),
    });

    if (referral) {
      result.mutate({
        type: "sum",
        key: ["posts", page, "referrals", referral],
        value: new Deno.KvU64(1n),
      });
    }

    await result.commit();
  }
}

export const AnalyticsService = new AnalyticsServiceSingleton();
