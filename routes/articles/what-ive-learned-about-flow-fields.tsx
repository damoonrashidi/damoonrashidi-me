import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/header.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "@/blog/post.ts";
import { NoiseIllustration } from "@/islands/blog/flow-fields/noise.tsx";
import post from "@/posts/advanced/what-ive-learned-about-flow-fields.tsx";

export const handler: Handlers<Post> = {
  GET(_req, ctx) {
    return ctx.render(post);
  },
};

export default function PostPage({ data: post }: PageProps<Post>) {
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
          <p>
            This article will describe the methods and concepts I used to create
            the series of generated artworks pictured below, as well as I
            understand them. I've also tried to visualise the the algorithms,
            provide code examples, as well as provide some code examples. As a
            note, far more talented people than me have written{" "}
            <a href="https://tylerxhobbs.com/essays/2020/flow-fields">
              articles on the subject
            </a>{" "}
            which I strongly suggest reading.
          </p>

          <NoiseIllustration />
        </div>
      </article>
    </>
  );
}
