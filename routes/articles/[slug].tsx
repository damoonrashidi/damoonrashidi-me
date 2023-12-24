import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "$gfm";
import { getPost } from "@/blog/getPost.ts";
import { Post } from "@/blog/post.ts";
import { Header } from "@/components/header.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <title>{post.title}</title>
        <meta
          name="description"
          content={post.snippet}
        />
      </Head>
      <Header />
      <article className="max-w-prose m-auto font-display p-8 sm:p-0">
        <div>
          <h1 className="text-4xl">{post.title}</h1>
          <p className="pt-4">
            {Intl.DateTimeFormat("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(post.createdAt)}
          </p>
        </div>
        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.body) }}
        />
      </article>
    </>
  );
}
