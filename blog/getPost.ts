import { join } from "$std/path/mod.ts";
import { Post, PostStatus } from "@/blog/post.ts";
import { advancedPosts } from "@/posts/advanced/index.ts";
import { extract } from "front_matter";

export async function getPosts(): Promise<Post[]> {
  const simplePosts = Deno.readDir("./posts/simple");
  const promises = [];
  for await (const file of simplePosts) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.push(...advancedPosts);
  posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return posts.filter(
    ({ status }) => status === PostStatus.Published,
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const text = await Deno.readTextFile(join("./posts/simple", `${slug}.md`));
  const { attrs, body } = extract<Post>(text);
  return {
    slug,
    title: attrs.title,
    createdAt: new Date(attrs.createdAt),
    updatedAt: new Date(attrs.updatedAt),
    status: attrs.status === "draft" ? PostStatus.Draft : PostStatus.Published,
    body,
    snippet: attrs.snippet,
  };
}
