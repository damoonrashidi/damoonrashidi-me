import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/header.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost } from "@/blog/getPost.ts";
import { Post } from "@/blog/post.ts";
import { NoiseIllustration } from "@/islands/blog/flow-fields/noise.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const url = import.meta.url.split("/").pop() as string;
    const post = await getPost(url.replace(".tsx", ""));
    return ctx.render(post as Post);
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

          <h2>Noise functions</h2>
          <p>
            Without regurgitating the wikipedia article, a noise function is a
            function that takes a coordinate in 2d space (higher dimension
            noise-functions also exist, but not for the purpose of this article)
            and returns a value in the range <code>-1..=1</code>{" "}
            such as points close together return similar values, but slightly
            different values.
          </p>
          <p>The illustration below illustrates this.</p>
          <NoiseIllustration />
        </div>
      </article>
    </>
  );
}
