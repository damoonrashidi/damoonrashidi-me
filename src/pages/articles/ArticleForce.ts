import { css, html, LitElement } from 'lit';

export class ArticleFlowFieldMethods extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 80px;
    }
    h2,
    h3 {
      font-family: 'Playfair Display', sans-serif;
      font-size: 36px;
      font-weight: 700;
    }
    h3 {
      font-size: 28px;
    }
    p,
    code {
      font-family: 'Playfair Display', sans-serif;
      font-size: 18px;
      line-height: 1.5em;
      font-weight: 200;
    }
    pre {
      background: #111;
      color: #eee;
      overflow-x: auto;
      padding: 0 31px;
    }
    code,
    .code {
      font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
      font-size: 14px;
    }
    .image-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
    .image-wrapper img {
      max-width: 90%;
      margin: 40px auto;
      display: block;

      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
        10px 76px 80px rgba(0, 0, 0, 0.16),
        0px 34.2165px 37.8605px rgba(0, 0, 0, 0.156182),
        0px 19.7788px 22.4204px rgba(0, 0, 0, 0.147078),
        0px 12.0142px 13.7505px rgba(0, 0, 0, 0.127239),
        0px 6.94312px 7.98618px rgba(0, 0, 0, 0.0753422);
    }

    @media (min-width: 768px) {
      h2 {
        font-size: 64px;
      }
      h3 {
        font-size: 52px;
      }
      p {
        font-size: 28px;
      }
      code,
      .code {
        font-size: 22px;
        font-weight: 500;x
      }
      .image-wrapper {
        grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      }
      .image-wrapper img {
        max-width: 400px;
      }
    }
  `;

  render() {
    return html`
      <h2>What I've learned about flow fields so far</h2>
      <p>
        This article will describe the method and concepts I used to create the
        series of generated art works pictured below. The algorithm, and code
        examples, that will be provided can however generate a great set of
        variations of flow field images.
      </p>

      <div class="image-wrapper">
        <a
          href="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fwildfire.png?alt=media"
          target="_blank"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fwildfire.png?alt=media"
            alt="Wildfire"
          />
        </a>

        <a
          target="_blank"
          href="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fterritories.png?alt=media"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fterritories.png?alt=media"
            alt="Regions"
        /></a>

        <a
          href="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fsands.png?alt=media"
          target="_blank"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fsands.png?alt=media"
            alt="Regions"
        /></a>
      </div>

      <p>
        The main driving force behind a flow field is usually a noise function,
        most typically it's something like
        <a
          href="https://en.wikipedia.org/wiki/Simplex_noise"
          target="_blank"
          rel="nofollow noreferrer"
        >
          simplex noise</a
        >. Without regurgitating the wikipedia article, the simplex (and perlin
        noise also for that matter) noise function returns a value between -1
        and 1 for any given point in a 2D (or 3+D) space such as the value for a
        given point is similar to the value of the surrounding points, only with
        a small variation.
        <span class="code">const noiseValue = noise(x, y)</span> for reference.
      </p>

      <p>The images below attempt to illustrate this.</p>

      <div class="image-wrapper">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-numerical.png?alt=media"
          alt="Flow field in digits"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow.png?alt=media"
          alt="Flow field"
        />
      </div>

      <p>
        Right off the bat you can see how this might be useful for constructing
        flow fields. If you start by picking any random point and checking the
        noise value for that point you can then move a step to the direction of
        the next point and so on. Doing that would yield the following effect if
        you use something like 1000 lines with random starting positions.
      </p>

      <p>
        Moving the dot is achieved by incrementing the dots x-position by
        <span class="code">Math.cos(noiseValue)</span> and the y-position by
        <span class="code">Math.sin(noiseValue)</span>, or you can flip the cos
        and sin functions to and see what happens! Or throw in
        <span class="code">tan(x), sin(y)</span>, whatever is in your heart, try
        it out and see what happens.
      </p>

      <div class="image-wrapper">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-lines.png?alt=media"
          alt="Flow Field Result"
        />
      </div>

      <p>
        You can also affect the result by manipulating the noise value that is
        fed to the cosine and sine functions, playing around with using
        <span class="code">Math.cos(noiseValue / 2.2)</span> will yield
        something entirely different than just
        <span class="code">Math.cos(noiseValue)</span>.
      </p>

      <p>
        Personally I like to use a simple set of rules to determine when a line
        ends. I either enable collision detection, meaning that a line ends when
        it collides with another line or the edge of the canvas. Other ways to
        end a line could be setting a max traverse length for each line, or
        picking a line length from a set of predetermined line lengths. Or
        having the line end when <span class="code">Math.random() > 0.99</span>.
        It could be whatever you want!
      </p>

      <h3>Different noise functions</h3>

      <p>
        I'm a software developer by trade, not a mathematician, so I'm not going
        to go into detail about how to write a good noise function, because I
        don't know how. I do however know how to write a function that takes an
        x and a y value and returns value between -1 and 1.
      </p>

      <p>
        Here are a few examples of easy noise functions. The first one goes by
        the distance from x to the center of the image, and the same for y, and
        then returns the
        <span class="code">Math.sqrt(distanceX ** 2 + distanceY **2)</span>. The
        second one is the exact same function, but instead of feeding the
        <span class="code">x</span> and <span class="code">y</span> values to
        the noise function straight up I divide them by... let's say 400, (<span
          class="code"
          >swirlyNoise(x / 400, y / 400)</span
        >), this smooths out the resulting value and gives a pleasing swirling
        motion.
      </p>
      <p>
        Finally, the third one calculates the angle between the the point
        <span class="code">[x,y]</span> and
        <span class="code">[imageCenterX, imageCenterY]</span> and returns that
        times <span class="code">PI</span>. Again, I'm not good at math, im just
        taking some values out of thin air and playing around with them. I
        strongly suggest doing the same and discovering what effects you
        achieve, what works and what doesn't.
      </p>

      <div class="image-wrapper">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-harsh-swirl.png?alt=media"
          alt="swirl"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-buggy-swirl.png?alt=media"
          alt="swirl modified"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-to-center.png?alt=media"
          alt="swirl modified"
        />
      </div>

      <h3>A note on collision detection</h3>

      <p>
        I'd like to preface this by saying that I have done absolutely no
        research on this topic, how to optimize it, or if there are better ways
        to do it. But I like to convince myself that this is art and the code
        doesn't need to be good. Having said all that, this is how I did
        collision detection to have each line avoid hitting all other lines.
      </p>

      <p>
        Since we're not really drawing lines but rather overlapping points to
        achieve a line effect we can easily see if our line is about to collide
        with another line. We just have to see if the circle we are about to
        draw is going to overlap with any other circle we've previously drawn,
        except for the ones in the current line.
      </p>

      <p>
        Checking if two circles are overlapping is easily done by taking the
        position of the two circles, figuring out the distance between them, and
        then seeing if the distance is less than the sum of the two circles'
        radii. The distance can of course be done with pythagoras theorem so the
        entire check is no more than
      </p>

      <pre><code>
interface Circle {
  x: number;
  y: number;
  radius: number;
}

function distance(
  a: Circle,
  b: Circle
): number {
  const x = Math.abs(a.x - b.x);
  const y = Math.abs(a.y - b.y);

  return Math.sqrt(x ** 2 + y ** 2);
}


function collidesWithAnyCircle(
  circle: Circle,
  circles: Circle[]
): boolean {
  for(const match of circles){
    const radiiSum = circle.radius + match.radius;
    if (distance(circle, match) &lt; radiiSum) {
      return true;
    }
  }
  return false;
}
        </code></pre>

      <h3>Limiting the search space</h3>

      <p>
        When playing around with different techniques and formats I usually do
        things in about 2k x 2k pixels which looks good on a monitor but doesn't
        work well for print. If I'd like to print an output in a reasonable size
        (like 50cm x 70cm) it needs to be at least like 4k x 7.2k px to look
        sharp. This means adding more stuff to fill the space (obviously).
        Meaning we'd have to fill the canvas with exponentially more circles.
      </p>

      <p>
        A lot of time can be saved by searching only the circles that are close
        to the circle that is currently being evaluated.
        <a href="https://en.wikipedia.org/wiki/Quadtree" target="_blank"
          >Quadtrees</a
        >
        are one way of doing this, but I went for an easier method by overlaying
        a grid over the entire canvas, and then mapping a position to cell in
        the grid. The relation of the circle size relative to the size of the
        cells in the grid is important. If a circle is too big to reliably fit
        in inside a cell it might collide with a circle in the next cell. This
        isn't a huge problem for me though, since I'm often not looking for
        perfection in the output, a few imperfections might even be favorable,
        so experimenting with different values for the cell size is also fun.
      </p>

      <div class="image-wrapper">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fgrid.png?alt=media"
          alt="grid"
        />

        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fgrid-populated.png?alt=media"
          alt="grid"
        />
      </div>

      <p>
        It's now much easier to instead of checking against every circle, just
        check against the circles in the cell that the current circle belongs
        to.
      </p>

      <h2>Colors</h2>

      <p>
        Keeping with the theme of the rest of the article, there are a lot of
        fun ways of working with colors in flow fields. You can select a
        different color for each line, or color by the starting noise value for
        the line, or have the line pick the color by a region on the screen (All
        depticed below)
      </p>

      <div class="image-wrapper">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fcolor-by-line.png?alt=media"
          alt="grid"
        />

        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fcolor-by-depth.png?alt=media"
          alt="grid"
        />

        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fcolor-by-region.png?alt=media"
          alt="grid"
        />
      </div>
    `;
  }
}
