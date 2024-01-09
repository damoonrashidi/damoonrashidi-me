import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { AnalyticsService } from "@/analytics/analytics.service.ts";
import { PostService } from "@/blog/post.service.ts";
import { Post } from "@/blog/post.ts";
import { ArticleLead } from "@/components/articles/lead.tsx";
import { TableOfContents } from "@/components/articles/table-of-contents.tsx";
import { Header } from "@/components/header.tsx";
import { Code } from "@/islands/articles/code.tsx";
import { AngleBetweenIllustration } from "../../islands/articles/flow-fields-methods/angle-to-point.tsx";
import { BuildingALine } from "../../islands/articles/flow-fields-methods/building-line.tsx";
import { CollisionDetectionIllustration } from "../../islands/articles/flow-fields-methods/collision-detection.tsx";
import { CollisionExampleIllustration } from "../../islands/articles/flow-fields-methods/collision-example.tsx";
import { ColorIllustration } from "../../islands/articles/flow-fields-methods/color.tsx";
import { DistanceToPointIllustration } from "../../islands/articles/flow-fields-methods/distance-to-point.tsx";
import { LineVariationIllustration } from "../../islands/articles/flow-fields-methods/line-variation.tsx";
import { NoiseAngleIllustration } from "../../islands/articles/flow-fields-methods/noise-angles.tsx";
import { NoiseLineIllustration } from "../../islands/articles/flow-fields-methods/noise-line.tsx";
import { NoiseIllustration } from "../../islands/articles/flow-fields-methods/noise.tsx";
import { PointMapIllustration } from "../../islands/articles/flow-fields-methods/pointmap.tsx";
import { ZoomingIllustration } from "../../islands/articles/flow-fields-methods/zooming.tsx";

export const handler: Handlers<Post> = {
	async GET(req, ctx) {
		const url = import.meta.url.split("/").pop() as string;
		try {
			const post = await PostService.getPost(url.replace(".tsx", ""));
			AnalyticsService.readPost(post.slug, req.headers.get("Referer"));
			return ctx.render(post as Post);
		} catch {
			return ctx.renderNotFound();
		}
	},
};

const tableOfContents = [
	{ id: "intro", label: "Brief introduction" },
	{ id: "noise-functions", label: "Noise functions" },
	{ id: "drawing-lines", label: "Drawing lines" },
	{
		id: "noise-function-alternatives",
		label: "Alternatives to noise functions",
	},
	{
		id: "collision-detection",
		label: "Collision detection",
		children: [
			{
				id: "optimizing-collision-detection",
				label: "Optimizing collision detection",
			},
		],
	},
	{ id: "colors", label: "colors" },
	{ id: "conclusion", label: "Conclusion" },
];

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

				<meta name="description" content={post.snippet} />
				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={post.snippet} />
				{post.ogImageUrl ? (
					<meta property="og:image" content={post.ogImageUrl} />
				) : (
					<></>
				)}
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

				<section className="py-8">
					<span className="pb-4 inline-block text-lg">Table of contents</span>
					<TableOfContents items={tableOfContents} />
				</section>

				<h2 id="intro">Brief introduction.</h2>
				<p>
					This article will describe the methods and concepts I used to create
					the series of generated artworks pictured below. I've tried to
					visualize the algorithms and provide some code samples. The code
					samples are written in a Typescript with some simplifications so that
					the code is readable on mobile and to make them more concise and easy
					to follow. The general algorithms can easily be ported to any language
					though, I have for instance done some{" "}
					<a href="https://github.com/damoonrashidi/generative-art">
						implementations using Rust
					</a>
					.
				</p>
				<p>
					As a note, far more talented people than me have written{" "}
					<a href="https://tylerxhobbs.com/essays/2020/flow-fields">
						articles on the subject
					</a>{" "}
					upon which my work is very obviously based. I recommend reading that
					one too!
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

				<h2 id="noise-functions">Noise functions</h2>
				<p>
					The main driving force behind these flow field images is usually a
					noise function. Without regurgitating the{" "}
					<a href="https://en.wikipedia.org/wiki/Perlin_noise">
						wikipedia article
					</a>
					, a noise function is a function that takes a coordinate in 2d space
					(higher dimension noise-functions also exist, but are irrelevant for
					the purpose of this article) and returns a value in the range{" "}
					<code>-1..=1</code> such as points close together return similar, but
					slightly different, values.
				</p>
				<p>
					The interactive illustration below shows how this works by uniformly
					sampling points in a grid and calling the noise function for that
					point. Note that the values have been rounded to one decimal for
					legibility, the actual values have far more precision. Click{" "}
					<code>Regenerate</code> to run the noise function again with a new
					seed to get new noise values.
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
					<code>(1.0, 1.0)</code> and <code>(1.0, 2.0)</code> would produce
					somewhat similar noise values, following the rule that points in close
					proximity yield fairly similar noise values, but they're not close
					enough to each other.
				</p>
				<p>
					To combat this we can force our points to be closer together by just
					dividing our x and y coordinates by some smoothness constant. For
					example, the distance between our two example points was previously{" "}
					<code>1.0</code> for the y-axis, and <code>0.0</code> for the x-axis,
					for a total distance of <code>1.0</code>.
				</p>
				<p>
					If we divide all our x and y values by the constant{" "}
					<code>smoothness = 100</code>
					{"  "}we'd end up with:{" "}
					<code>p1 = (0.01, 0.01), p2 = (0.01, 0.02)</code>, making the distance
					only <code>0.01</code>, but keeping the relation between the points
					the same.
				</p>

				<ZoomingIllustration />

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

				<h2 id="drawing-lines">Drawing lines.</h2>
				<p>
					At this point we know how to navigate the flow field. Pick any point{" "}
					<code>P</code>, read the noise value <code>n</code> for that point and
					increment <code>P.x</code> by <code>cos(n)</code> and <code>P.y</code>{" "}
					by <code>sin(n)</code> as well as some extra pixels that represents
					the distance we want to travel in the direction of the field.
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
  const n = noise(x / smooth, y / smooth);
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
  const n = noise(x / smooth, y / smooth);
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

				<h2 id="experimenting-with-lines">Experimenting with lines.</h2>
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

				<h2 id="noise-function-alternatives">
					Alternatives to noise functions
				</h2>
				<p>So far we've been using a noise function called OpenSimplex.</p>
				<blockquote>
					OpenSimplex noise is an n-dimensional gradient noise function that was
					developed in order to overcome the patent-related issues surrounding
					Simplex noise, while continuing to also avoid the visually-significant
					directional artifacts characteristic of Perlin noise.
					<figcaption>- Kurt Spencer</figcaption>
				</blockquote>
				<p>
					As alluded to in the quote, there are few different noise functions. A
					proper noise function is a bit complicated and out of scope for this
					article, but nothing is stopping us from writing a function that
					returns similar values for a given coordinate, that part can be done
					pretty easily.
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
  width: number,
  height: number,
): number {
  const centerX = width / 2;
  const centerY = height / 2;

  const dx = x - centerX;
  const dy = y - centerY;
  return sqrt(dx ** 2 + dy ** 2);
}`}
				</Code>
				<p>Mouse over the illustration below to set a new focal point</p>

				<DistanceToPointIllustration />

				<p>
					If we instead of returning the distance to <code>focalPoint</code> we
					can return the angle the line has from our point to{"  "}
					and offset our point along the radius (with a slight distortion to the
					y-axis) we can get a nice swirl-like effect.
				</p>

				<Code>
					{`function angleBetween(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
) {
return atan2(y - centerY, x - centerX);
}`}
				</Code>

				<Code>
					{`beginPath();
moveTo(x, y);
for (let i = 0; i < lineLength; i++) {
  const dist = distance(x, y, cx, cy)
  const angle = angleBetween(x, y, cx, cy);

  x = cx + cos(angle + 0.01) * (dist - 0.1);
  y = cy + sin(angle + 0.015) * (dist - 0.15);
  lineTo(x, y);
}
stroke();`}
				</Code>

				<AngleBetweenIllustration />

				<h2 id="collision-detection">Collision Detection</h2>
				<p>
					In my opinion, the real fun doesn't really begin until we start
					looking at having the lines interact with each other. Instead of
					stopping when we reach the end of the canvas or we've reached the max
					line length we can instead stop when this line would collide with
					another line.
				</p>

				<p>
					Hover the illustration (or slide your finger over it) to add lines of
					varying width.
				</p>
				<CollisionDetectionIllustration />

				<p>
					Now, a lot can be said about collision detection and how to make it
					performant. I'll show only one method and a small optimization to keep
					the solution somewhat performant.
				</p>

				<p>
					Checking the{" "}
					<a href="https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection">
						intersection of two straight lines
					</a>{" "}
					isn't too bad and can be done in O(1) time. Our lines aren't straight
					however so we'll have to be a bit more clever. If we go back to the
					beginning of how we drew the line, it started with stepping through
					the noise field and adding a point for each step. If we made that
					point into a circle by giving it same radius as the line and kept
					track of each circle, not just in the line but in all lines it's a lot
					easier to check if the circle we are about to draw overlaps any other
					circle.
				</p>

				<p>
					Checking if two circles overlap is only a matter of checking if the
					sum of their radii is smaller than the distance between their origo.
				</p>
				<Code>
					{`interface Circle {
  x: number;
  y: number;
  r: number;
}

type Point = [number, number];

function distance(
  [x1, y1]: Point,
  [x2, y2]: Point,
) {
  return sqrt((x1 - x2) ** 2, (y1 - y2) ** 2);
}

function overlap(
  a: Circle,
  b: Circle,
): boolean {
  const d = distance([a.x, a.y], [b.x, b.y]);
  return d < a.r + b.r;
}`}
				</Code>

				<p>
					Here is another illustration that highlights when two non-linear lines
					meet using this method. Play with the illustration to move the
					colliding line.
				</p>

				<CollisionExampleIllustration />

				<Code>
					{`const previousPoints = [];
function drawLine(x: number, y: number) {
  beginPath();
  moveTo(x,y);
  const lineWidth = 4;
  const pointsForLine = [];
  while (canvas.contains(x,y)) {
    const n = noise(x / smooth, y / smooth) * warp;
    x += cos(n) * step;
    y += sin(n) * step;

    if (previousPoints.some(
      point => distance([x,y],point)) < lineWidth
    ) {
      break;
    }
    pointsForLine.push([x,y]);
    lineTo(x,y);
  }
  previousPoints.push(...pointsForLine);
  stroke();
}
`}
				</Code>

				<h3 id="optimizing-collision-detection">Optimizing it slightly.</h3>
				<p>
					These example illustrations are fairly small so we haven't ran into
					any performance issues when checking if our line collides with any
					other line... yet. When trying to make a larger image however, in a
					print-friendly size for instance, we'd end up with a lot of lines with
					a lot of points that we could potentially collide with, meaning that
					for every new point we add we must check collisions against all other
					points. This stacks up fast and will make your render times a lot
					longer than desired. A way to mitigate this is to only check against
					points that are close enough for us to collide with.
				</p>

				<p>
					The simplest way of doing that is by dividing our canvas up into a
					grid of boxes and whenever we are about to add a new point check which
					box it would go in, and then only check against collisions with points
					in that box.
				</p>

				<p>
					Time for another illustration. This time, move your finger or mouse
					cursor around to see which points belong to the same box.
				</p>

				<PointMapIllustration />

				<p>
					Now, with 100 boxes (10 across, 10 down) and if the points are
					distributed uniformly on the canvas, we end up doing 1/100
					<sup>th</sup> as many checks that we did previously, increasing
					rendering performance by quite a bit! One thing to note however, is
					that if our boxes would be too small to reliably hold points with the
					radius of our lines then we'd start to get overlapping lines at the
					edges. This would also happen if a points origo was at the very edge
					of a box, causing its body to spill outside the boxes area. We could
					fix that by checking surrounding boxes for collisions as well, but
					that would mean we'd check another eight boxes besides the current
					one, increasing the search space a bit, but the result would be more
					exact.
				</p>

				<p>
					A final optimisation we can do with this technique is that if our step
					size (the distance between each point in each line) is sufficiently
					small we could skip checking a few points in the box, since if our
					circle overlaps with one of the circles there's a high chance that it
					overlaps with some other circles as well. Now this might yield a less
					accurate result, but accuracy is not necessarly the end goal. Some
					small overlaps for a few lines might introduce some visually pleasing
					artifacts. Usually those kinds of details are{" "}
					<em>happy little accidents</em>.
				</p>

				<Code>
					{`function overlapsAny(
  circle: Circle,
  box: Circle[],
): boolean {
  for (let i = 0; i < box.length; i += 7) {
    const d = distance(box[i], circle);
    const r = box[i].r + circle.r;
    if (d < r) {
      return true;
    }
  }
  return false;
}`}
				</Code>
				<p>
					Here we check against every 7<sup>th</sup> circle in a box hoping to
					get a hit if there is one. The constant <code>7</code> might be too
					high in some cases, or could be increased even more, it all depends on
					the step size for the lines and can be tweaked to get a good balance
					between render times and correctness.
				</p>

				<h2 id="colors">Finally, Colors.</h2>
				<p>
					The theme for this article is converging to{" "}
					<em>"you can achieve a lot of variation with some tweaks"</em>. That's
					true for applying colors to these images as well. So far things in
					this article have been pretty monochrome to focus on the underlying
					techniques of how to achieve the overarching look.
				</p>
				<p>
					The easiest way to get some color in there is to create a palette with
					a few different colors and picking at random when creating a new line.
				</p>

				<Code>
					{`const palette = [
  "#eb6f92",
  "#f6c177",
  "#ea9a97",
  "#3e8fb0",
  "#9ccfd8",
];

const color = palette[floor(random() * palette.length)];
drawLine(x,y,color);`}
				</Code>

				<ColorIllustration mode="by-line" />

				<p>
					Another coloring method is by coloring each line by the angle of the
					noise function where the line started. This will yield a gradient like
					coloring across larger images.
				</p>

				<Code>
					{`const n = noise(x / 120, y / 120) * warp;
const hue = n % 255;
const color = \`hsl(\${hue}deg, 70%, 50%)\`;`}
				</Code>

				<ColorIllustration mode="angle" />

				<p>
					Finally, my favorite method is by subdividing the canvas into a set of
					regions, either by some{" "}
					<a href="https://en.wikipedia.org/wiki/Composition_with_Red_Blue_and_Yellow">
						Piet Mondrian Composition style
					</a>
					, or recursively splitting the canvas into more and more refined
					polygons. After the canvas has been divided I assign each region a
					color and whenever a line spawns assign it the color of the region it
					spawned in.
				</p>
				<p>
					This method creates a nice effect where things don't look as
					disjointed and more like streams of paint flowing into other buckets
					of paint.
				</p>

				<ColorIllustration mode="region" />

				<h2 id="conclusion">Conclusion</h2>
				<p>
					Even though this article got quite long, it only scratches the surface
					of all the variants that can be achieved using the fundamental
					techniques described. I highly recommend trying things out and
					experimenting, swapping a <code>cos()</code> for a <code>sin()</code>{" "}
					somewhere, or maybe even a <code>tan()</code> if you're crazy.
				</p>
				<p>
					Try subdividing the canvas into subregions who all have their own
					rules, or maybe dive deeper into noise functions. Or have a small
					border around the canvas and let some small percent of the lines
					escape it. Why use lines at all? Why not circles or squares or blobs?
				</p>
				<p>Thanks for sticking in there this long, hope it was helpful.</p>
			</article>
		</>
	);
}
