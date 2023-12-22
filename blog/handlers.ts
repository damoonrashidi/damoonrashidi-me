import { Handlers } from "$fresh/server.ts";
import { getPost } from "@/blog/getPost.ts";
import { Post } from "@/blog/post.ts";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};
