import { Handlers, PageProps } from "$fresh/server.ts";
import { PostService } from "@/blog/post.service.ts";
import { Post } from "@/blog/post.ts";
import { ArticleSummary } from "@/components/articles/summary.tsx";
import { Header } from "@/components/header.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await PostService.getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
      <Header />
      <main class="px-8 pt-16 mx-auto font-display max-w-prose">
        <h1 class="text-5xl pb-8">My thoughts on things.</h1>
        {posts.length === 0 ? <h2>No thoughts yet.</h2> : <></>}
        <div class="mt-8 w-max-prose">
          {posts.map((post) => <ArticleSummary post={post} />)}
        </div>
      </main>
    </>
  );
}
