import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "$gfm";
import { getPost } from "@/blog/getPost.ts";
import { Post } from "@/blog/post.ts";

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
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <article>
        <div>
          <h1>{post.title}</h1>
          <p>
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
