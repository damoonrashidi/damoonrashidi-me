import { join } from "$std/path/mod.ts";
import { Post } from "@/blog/post.ts";
import { extract } from "front_matter";

export async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
  const { attrs, body } = extract<Post>(text);
  return {
    slug,
    title: attrs.title,
    createdAt: new Date(attrs.createdAt),
    updatedAt: new Date(attrs.updatedAt),
    body,
    snippet: attrs.snippet,
  };
}
