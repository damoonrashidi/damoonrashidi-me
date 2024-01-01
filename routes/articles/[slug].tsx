import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "$gfm";
import { Post } from "@/blog/post.ts";
import { PostService } from "@/blog/postService.ts";
import { ArticleLead } from "@/components/articles/lead.tsx";
import { Header } from "@/components/header.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const postService = new PostService();
    const post = await postService.getPost(ctx.params.slug);
    if (post === null) {
      return ctx.renderNotFound();
    }
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={post.snippet}
        />
      </Head>
      <Header />
      <article className="max-w-prose m-auto font-display p-12 sm:p-8">
        <ArticleLead post={post} />
        <section
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.body) }}
        />
      </article>
    </>
  );
}
