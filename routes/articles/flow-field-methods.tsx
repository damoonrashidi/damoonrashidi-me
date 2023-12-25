import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost } from "@/blog/getPost.ts";
import { Post } from "@/blog/post.ts";
import { Header } from "@/components/header.tsx";
import { Code } from "@/islands/blog/code.tsx";
import { NoiseAngleIllustration } from "@/islands/blog/flow-fields/noise-angles.tsx";
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
        <style type="text/css">
          @media (prefers-color-scheme: dark) {}
        </style>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/ros-pine.min.css"
        />

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
            understand them. I've also tried to visualise the the algorithms and
            provide some code examples.
          </p>
          <p>
            As a note, far more talented people than me have written{" "}
            <a href="https://tylerxhobbs.com/essays/2020/flow-fields">
              articles on the subject
            </a>{" "}
            which I strongly suggest reading.
          </p>
          <div className="flex w-full items-center justify-center flex-wrap lg:flex-nowrap gap-4 pb-12 py-4 ">
            <img
              src="/articles/flow-field-methods/example-1.png"
              width={300}
              height={475}
            />
            <img
              src="/articles/flow-field-methods/example-2.png"
              width={300}
              height={475}
            />
            <img
              src="/articles/flow-field-methods/example-3.png"
              width={300}
              height={475}
            />
          </div>
          <h2>Noise functions</h2>
          <p>
            Without regurgitating the{" "}
            <a href="https://en.wikipedia.org/wiki/Perlin_noise">
              wikipedia article
            </a>, a noise function is a function that takes a coordinate in 2d
            space (higher dimension noise-functions also exist, but not for the
            purpose of this article) and returns a value in the range{" "}
            <code>-1..=1</code>{" "}
            such as points close together return similar values, but slightly
            different values.
          </p>
          <p>The interactive illustration below shows how this works.</p>
          <NoiseIllustration />
          <p>
            And here is the code that generated the image above, abbreviated for
            clarity.
          </p>
          <Code language="typescript">
            {`for (let y = 0; y < 40; y++) {
  for (let x = 0; x < 40; x++) {
    const n = noise(x, y);
    canvas.drawText(n.toString(), x, y);
  }
}`}
          </Code>
          <p>
            To make it a bit easier to digest, we can visualise this in a more
            effective manner by translating the noise values into degrees and
            draw lines from a starting position and a few pixels following the
            degree of the noise value.
          </p>
          <NoiseAngleIllustration />
          <Code language="typescript">
            {`for (let y = 0; y < maxHeight; y += 20) {
  for (let x = 0; x < maxWidth; x += 20) {
    const n = noise(x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.cos(n) * 10,
      y + Math.sin(n) * 10,
    );
    ctx.closePath();
    ctx.stroke();
  }
}`}
          </Code>
          <p>
            This doesn't look like much currently. It would appear that lines
            are fairly disjointed and lines go off in seemingly random
            directions. Not at all the smooth effect we're going for.
          </p>
          <p>
            It turns out that noise functions are fairly sensative, you'd think
            that the points
            <code>(1.0, 1.0)</code> and <code>(1.0, 2.0)</code>{" "}
            would produce somewhat simlar noise values, following the rule that
            points in close proximity would yield fairly similar noise values.
          </p>
          <p>
            To combat this we can force our points to be close together by just
            dividing our x and y coordinates by some constant. For instance, the
            distance between our two example points was previously{" "}
            <code>1.0</code> for the y-axis, and <code>0.0</code>{" "}
            for the x-axis, for a total distance of <code>1.0</code>.
          </p>
          <p>
            Lets say that we have a constant{" "}
            <code>c = 100</code>. If we divide all our x and y values by that
            constant <code>c</code> we'd end up with something like:{" "}
            <code>p1 = (0.01, 0.01), p2 = (0.01, 0.02)</code>, making the
            distance only{" "}
            <code>0.01</code>, but keeping the relation between the points the
            same.
          </p>
          <p>The only change we need to make to our code is the following:</p>
          <Code language="typescript">{"const n = noise(x/100, y/100);"}</Code>
          <NoiseAngleIllustration showSmoothening />

          <p>
            As we can see by dragging the c-value up, closer to 100 in this
            case, the lines start to smooth out and patterns start to emerge.
          </p>

          <h2>Drawing lines.</h2>
        </div>
      </article>
    </>
  );
}
