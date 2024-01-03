import { join } from "$std/path/mod.ts";
import { Post, PostStatus } from "@/blog/post.ts";
import { extract } from "front_matter";

export class PostService {
  async getPosts(): Promise<Post[]> {
    const files = Deno.readDir("./posts");
    const promises = [];
    for await (const file of files) {
      const slug = file.name.replace(".md", "");
      promises.push(this.getPost(slug));
    }
    const posts = await Promise.all(promises) as Post[];
    posts.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    return posts.filter(
      ({ status }) => status === PostStatus.Published,
    );
  }

  async getPost(slug: string): Promise<Post> {
    const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
    const { attrs, body } = extract<Post>(text);
    return {
      slug,
      title: attrs.title,
      createdAt: new Date(attrs.createdAt),
      updatedAt: new Date(attrs.updatedAt),
      status: attrs.status === "draft"
        ? PostStatus.Draft
        : PostStatus.Published,
      body,
      snippet: attrs.snippet,
      ogImageUrl: attrs.ogImageUrl,
    };
  }

  async incrementReadCount(slug: string): Promise<void> {
    const kv = await Deno.openKv();
    await kv.atomic()
      .mutate({
        type: "sum",
        key: ["posts", slug, "read_count"],
        value: new Deno.KvU64(1n),
      })
      .commit();
  }
}
