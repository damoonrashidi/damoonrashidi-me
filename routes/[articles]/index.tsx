import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts } from "@/blog/getPost.ts";
import { Post } from "@/blog/post.ts";
import { Header } from "@/components/header.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    if (posts.length === 0) {
      return ctx.renderNotFound();
    }
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
      <Header />
      <main class="max-w-screen-md px-4 pt-16 mx-auto">
        <h1 class="text-5xl font-bold">Blog</h1>
        <div class="mt-8">
          {posts.map((post) => (
            <div key={post.slug}>
              {post.title}
              <a href={`/blog/${post.slug}`}>Read</a>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
