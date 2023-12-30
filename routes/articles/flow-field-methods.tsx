import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost } from "@/blog/getPost.ts";
import { Post } from "@/blog/post.ts";
import { ArticleLead } from "@/components/articles/lead.tsx";
import { Header } from "@/components/header.tsx";
import { Code } from "@/islands/articles/code.tsx";
import { AngleBetweenIllustration } from "@/islands/articles/flow-fields/angle-to-point.tsx";
import { BuildingALine } from "@/islands/articles/flow-fields/building-line.tsx";
import { NoiseAngleIllustration } from "@/islands/articles/flow-fields/noise-angles.tsx";
import { NoiseLineIllustration } from "@/islands/articles/flow-fields/noise-line.tsx";
import { NoiseIllustration } from "@/islands/articles/flow-fields/noise.tsx";
import { DistanceToPointIllustration } from "../../islands/articles/flow-fields/distance-to-point.tsx";
import { LineVariationIllustration } from "../../islands/articles/flow-fields/line-variation.tsx";

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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/ros-pine-dawn.min.css"
        />

        <link
          rel="stylesheet"
          media="(prefers-color-scheme: dark)"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/ros-pine.min.css"
        />

        <meta
          name="description"
          content={post.snippet}
        />
      </Head>
      <Header />
      <article className="max-w-prose m-auto font-display p-8 sm:p-0">
        <ArticleLead post={post} />
        <blockquote>
          If you feel that this article is too wordy skip all the text and play
          with the illustrations, they get more and more fun as the articles
          rambles on!
          <figcaption>-- Me</figcaption>
        </blockquote>

        <p>
          This article will describe the methods and concepts I used to create
          the series of generated artworks pictured below. I've tried to
          visualize the algorithms and provide some code samples. The code
          samples are written in a Typescript, with some non-typescripty APIs
          thrown in to make them more concise and easy to follow. The general
          algorithms can easily be ported to any language though.
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
            src="/articles/flow-field-methods/example-1.webp"
            alt="Flow field example one"
            width={300}
            height={475}
          />
          <img
            src="/articles/flow-field-methods/example-2.webp"
            alt="Flow field example two"
            width={300}
            height={475}
          />
          <img
            src="/articles/flow-field-methods/example-3.webp"
            alt="Flow field example three"
            width={300}
            height={475}
          />
        </div>
        <h2>Noise functions</h2>
        <p>
          The main driving force behind these flow field images is usually a
          noise function. Without regurgitating the{" "}
          <a href="https://en.wikipedia.org/wiki/Perlin_noise">
            wikipedia article
          </a>, a noise function is a function that takes a coordinate in 2d
          space (higher dimension noise-functions also exist, but are irrelevant
          for the purpose of this article) and returns a value in the range{" "}
          <code>-1..=1</code>{" "}
          such as points close together return similar, but slightly different,
          values.
        </p>
        <p>
          The interactive illustration below shows how this works by uniformly
          sampling points in a grid and calling the noise function for that
          point. Note that the values have been rounded to one decimal for
          legibility, the actual values have far more precision. Click{" "}
          <code>Regenerate</code>{" "}
          to run the noise function again with a new seed to get new noise
          values.
        </p>
        <NoiseIllustration />
        <p>
          And here is the code that generated the image above, abbreviated for
          clarity.
        </p>
        <Code>
          {`for (let y = 0; y < 40; y++) {
  for (let x = 0; x < 40; x++) {
    const n = noise(x, y);
    drawText(n.toString(), x, y);
  }
}`}
        </Code>
        <p>
          To make it a bit easier to digest, we can visualize this in a more
          effective manner by translating the noise values into degrees and draw
          lines from a starting position and a few pixels following the degree
          of the noise value.
        </p>
        <NoiseAngleIllustration />
        <Code>
          {`for (let y = 0; y < maxHeight; y += 20) {
  for (let x = 0; x < maxWidth; x += 20) {
    const n = noise(x, y);
    const stepSize = 10;
    beginPath();
    moveTo(x, y);
    lineTo(
      x + cos(n) * stepSize,
      y + sin(n) * stepSize,
    );
    closePath();
    stroke();
  }
}`}
        </Code>
        <p>
          This doesn't look like much currently. It would appear that lines are
          fairly disjointed and go off in seemingly random directions. Not at
          all the smooth effect we're going for.
        </p>
        <p>
          It turns out that noise functions are pretty sensitive. You'd think
          that the points
          <code>(1.0, 1.0)</code> and <code>(1.0, 2.0)</code>{" "}
          would produce somewhat similar noise values, following the rule that
          points in close proximity yield fairly similar noise values, but
          they're not close enough to each other.
        </p>
        <p>
          To combat this we can force our points to be closer together by just
          dividing our x and y coordinates by some smoothness constant. For
          example, the distance between our two example points was previously
          {" "}
          <code>1.0</code> for the y-axis, and <code>0.0</code>{" "}
          for the x-axis, for a total distance of <code>1.0</code>.
        </p>
        <p>
          If we divide all our x and y values by the constant{" "}
          <code>smoothness = 100</code>{"  "}we'd end up with:{" "}
          <code>p1 = (0.01, 0.01), p2 = (0.01, 0.02)</code>, making the distance
          only{" "}
          <code>0.01</code>, but keeping the relation between the points the
          same.
        </p>
        <p>The only change we need to make to our code is the following:</p>
        <Code>
          {`const smoothness = 100;
const n = noise(x / smoothness, y / smoothness);`}
        </Code>

        <p>
          You can think of it as shrinking our domain to better fit the noise
          values. Or zooming in on the noise function if that helps.
        </p>

        <NoiseAngleIllustration showSmoothening />

        <p>
          As we can see by dragging the smoothness value up, closer to 100 in
          this case, the lines start to smooth out and patterns start to emerge.
        </p>

        <h2>Drawing lines.</h2>
        <p>
          At this point we know how to navigate the flow field. Pick any point
          {" "}
          <code>P</code>, read the noise value <code>n</code>{" "}
          for that point and increment <code>P.x</code> by <code>cos(n)</code>
          {" "}
          and <code>P.y</code> by <code>sin(n)</code>{" "}
          as well as some extra pixels that represents the distance we want to
          travel in the direction of the field.
        </p>
        <p>
          We did this in the previous examples by sampling points in a grid and
          and having a fixed line length. To approximate the effect illustrated
          in the images at the beginning of this article a bit better another
          implementation is necessary. First we need to pick a random point on
          the canvas and then ride the flow field until we get out of bounds.
        </p>
        <Code>
          {`const stepSize = 10;
let x = 0;
let y = random(0..height);
while (bounds.contains(x,y)) {
  const n = noise(x / smoothness, y / smoothness);
  x += cos(n) * stepSize;
  y += sin(n) * stepSize;
  const radius = 5;
  circle(x, y, radius);
  fill();
}`}
        </Code>
        <BuildingALine />

        <p>
          Going from the above example to drawing an actual line should now be
          trivial. Start at any given point on the canvas an instantiate your
          line, move through the field just as before, but instead of drawing a
          new point at the given position add it to the points for the line.
          Stop the loop when the line has reached the end of the canvas and
          finally draw the line.
        </p>
        <Code>
          {`const stepSize = 10;
let x = random(0..width);
let y = random(0..height);
beginPath();
moveTo(x,y);
while (bounds.contains(x,y)) {
  const n = noise(x / smoothness, y / smoothness);
  x += cos(n) * stepSize;
  y += sin(n) * stepSize;
  lineTo(x,y);
}
closePath();
stroke();`}
        </Code>
        <p>
          Mouse over the illustration below to create new lines from your mouse
          position.
        </p>
        <NoiseLineIllustration />

        <h2>Experimenting with lines.</h2>
        <p>
          So far not a lot of variance has been achieved. All results, no matter
          what the seed of the noise function is, will yield somewhat similar
          images. There are a few ways to combat this, one way is by warping the
          noise value a bit, resulting in lines exaggerating their turns, this
          is done by simply multiplying the noise value by some constant before
          applying the <code>cos()</code> and <code>sin()</code> functions.
        </p>
        <Code>
          {`const warp = 2.2;
const n = noise(x, y);
x += cos(n * warp) * stepSize;
y += sin(n * warp) * stepSize;`}
        </Code>
        <p>
          Another way is by varying the length of the steps each line takes
          between each step as it progresses through the field. Shorter steps
          yield much smoother curves while longer steps will make the lines a
          lot more jagged.
        </p>
        <Code>
          {`const jaggedStepSize = 100;
const n = noise(x, y);
x += cos(n) * jaggedStepSize;
y += sin(n) * jaggedStepSize;`}
        </Code>
        <LineVariationIllustration />
        <h2>Alternatives to noise functions</h2>
        <p>So far we've been using a noise function called OpenSimplex.</p>
        <blockquote>
          OpenSimplex noise is an n-dimensional gradient noise function that was
          developed in order to overcome the patent-related issues surrounding
          Simplex noise, while continuing to also avoid the visually-significant
          directional artifacts characteristic of Perlin noise.
          <figcaption>
            - Kurt Spencer
          </figcaption>
        </blockquote>
        <p>
          As alluded to in the quote, there are few different ones whose
          objective is to produce similar, but not identical, values for similar
          coordinates. But nothing is stopping us from writing our own. A proper
          noise function is a bit complicated and out of scope for this article,
          but just writing a function that returns similar values for a given
          coordinate is pretty simple.
        </p>
        <p>
          These home grown functions won't yield as random seeming results as a
          noise function but they will let us control the final output much
          more. They will also let us be much more creative in trying new things
          out now that we can draw lines that reliably follow a path.
        </p>
        <p>
          An easy first test we can do is simply taking a coordinate and return
          it's distance to another point that we'll call the{" "}
          <code>focalPoint</code>, just to see what would happen. This function
          would satisfy the rule that points close together yield similar
          values, making our lines nice and smooth.
        </p>

        <Code>
          {`function distanceToCenter(
  x: number,
  y: number,
  destinationX: number,
  destinationY: number,
): number {
  const centerX = destinationX / 2;
  const centerY = destinationY / 2;

  const dx = x - centerX;
  const dy = y - centerY;
  return Math.sqrt(dx ** 2 + dy ** 2);
}`}
        </Code>
        <p>Mouse over the illustration below to set a new focal point</p>

        <DistanceToPointIllustration />

        <p>
          If we instead of returning the distance to <code>focalPoint</code>
          {" "}
          we can return the angle the line has from our point to{"  "}
          and offset our point along the radius (with a slight distortion to the
          y-axis) we can get a nice swirl-like effect.
        </p>

        <AngleBetweenIllustration />

        <h2>Collision Detection</h2>
        <p>
          In my opinion, the real fun doesn't really begin until we start
          looking at having the lines interact with each other.
        </p>

        <h2>Colors</h2>
        <p>
          The theme for this article seems to converge to _"there are a lot of
          different ways to do something"_
        </p>
      </article>
    </>
  );
}
