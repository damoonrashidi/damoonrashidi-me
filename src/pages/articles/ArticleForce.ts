import { css, html, LitElement } from 'lit';
import { navigator } from 'lit-element-router';

export class ArticleFlowFieldMethods extends navigator(LitElement) {
  static styles = css`
    :host {
      display: block;
      padding: 40px;
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
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
        10px 76px 80px rgba(0, 0, 0, 0.16),
        0px 34.2165px 37.8605px rgba(0, 0, 0, 0.156182),
        0px 19.7788px 22.4204px rgba(0, 0, 0, 0.147078),
        0px 12.0142px 13.7505px rgba(0, 0, 0, 0.127239),
        0px 6.94312px 7.98618px rgba(0, 0, 0, 0.0753422);
    }
    code,
    .code {
      font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
      font-size: 14px;
    }
    .code {
      background: #eee;
      color: #111;
      display: inline-block;
      padding: 0 8px;
      border-radius: 4px;
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
      :host {
        padding: 80px;
      }
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
        font-weight: 500;
      }
      .image-wrapper {
        grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      }
      .image-wrapper img {
        max-width: 400px;
      }
    }
    @media (prefers-color-scheme: dark) {
      :host {
        color: #eee;
      }
      .code {
        background: #222;
        color: #eee;
      }
    }
  `;

  render() {
    return html`
      <h3>What I've learned about flow fields so far</h3>
      <p>
        This article will describe the method and concepts I used to create the
        series of generated art works pictured below, as I understand them. The
        algorithm, and code examples, that will be provided can however generate
        a great set of variations of flow field images. As a note, far more
        talented people than me have written
        <a
          href="https://tylerxhobbs.com/essays/2020/flow-fields"
          target="_blank"
          >articles on the subject</a
        >
        which I strongly suggest reading.
      </p>

      <div class="image-wrapper">
        <a
          href="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fwildfire.png?alt=media"
          target="_blank"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fwildfire.png?alt=media"
            loading="lazy"
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
            loading="lazy"
        /></a>

        <a
          href="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fsands.png?alt=media"
          target="_blank"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fsands.png?alt=media"
            alt="Sands"
            loading="lazy"
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
        >. Without regurgitating the wikipedia article, the simplex noise (and
        perlin noise also for that matter) function returns a value between -1
        and 1 for any given point in a 2D (or 3+D) space. The value for a given
        point will be similar to the value of the surrounding points, only with
        a small variation.
        <span class="code">const noiseValue = noise(x, y)</span> for reference.
      </p>

      <p>The images below attempt to illustrate this.</p>

      <div class="image-wrapper">
        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-numerical.png?alt=media"
          alt="Flow field in digits"
        />
        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow.png?alt=media"
          alt="Flow field"
        />
      </div>

      <p>
        You can see how this might be useful for constructing flow fields. If
        you start by picking any random point and checking the noise value for
        that point you can then move a step to the direction of the noise value.
        Once at the new point you repeat the process with the noise value of the
        new current position of <span class="code">[x,y]</span>. Doing that with
        1000 random starting points would yield the flowy effect pictured below.
      </p>

      <div class="image-wrapper">
        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-lines.png?alt=media"
          alt="Flow Field Result"
        />
      </div>

      <p>
        Moving the dot is achieved by incrementing the dots x-position by
        <span class="code">Math.cos(noiseValue)</span> and the y-position by
        <span class="code">Math.sin(noiseValue)</span>, or you can flip the cos
        and sin functions to and see what happens! Or throw in
        <span class="code">tan(x), sin(y)</span>, whatever is in your heart!
      </p>

      <p>
        You can also increase the travel distance by multiplying the cosine and
        sine values by some constant.
        <span class="code">Math.sin(noiseValue) * 2</span>. The smoothness of
        the noise value could also be affected by manipulating the noise value
        that is fed to the cosine and sine functions, playing around with using
        <span class="code">Math.cos(noiseValue / 2.2)</span> will yield
        something entirely different than just
        <span class="code">Math.cos(noiseValue)</span>.
      </p>

      <h3>Different noise functions</h3>

      <p>
        I'm a software developer by trade, not a mathematician, so I'm not going
        to go into detail about how to write a good noise function, because I
        don't know how. I do however know how to write a function that takes an
        <span class="code">x</span> and a <span class="code">y</span> value and
        returns similar values for similar <span class="code">x</span> and
        <span class="code">y</span> values.
      </p>

      <p>
        The first one pictured below, <span class="code">swirl</span>, takes the
        the distance from <span class="code">x</span> to the center of the
        image, and the same for <span class="code">y</span>, and then returns
        the hypotenuse for that imagined triangle. The second image is the exact
        same function but instead of feeding the <span class="code">x</span> and
        <span class="code">y</span> values to the noise function as they are I
        divide them by an arbitrary number, (<span class="code"
          >swirl(x / 400, y / 400)</span
        >), this smooths out the resulting value and gives a pleasing swirling
        motion. Differently sized divisors will yield different results.
      </p>

      <div class="image-wrapper">
        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-harsh-swirl.png?alt=media"
          alt="swirl"
        />
        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-buggy-swirl.png?alt=media"
          alt="swirl modified"
        />
      </div>

      <p>
        The second one, <span class="code">toCenter</span> calculates the angle
        between the the point <span class="code">[x,y]</span> and
        <span class="code">[imageCenterX, imageCenterY]</span> and returns that
        times <span class="code">PI</span>. Again, I'm not good at math, I'm
        just taking some values that I'd imagine would make sense to someone who
        is good at math and playing around with them.
      </p>

      <div class="image-wrapper">
        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-to-center.png?alt=media"
          alt="swirl modified"
        />
      </div>

      <pre><code>
function swirl(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  const centerX = width / 2;
  const centerY = height / 2;
  const distanceX = Math.abs(centerX - x);
  const distanceY = Math.abs(centerY - y);
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

  return distance;
}

function toCenter(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  const centerX = width / 2;
  const centerY = height / 2;

  const angle = Math.atan2(x - centerX, y - centerY);

  return angle * Math.PI;
}
</code></pre>

      <h3>Ending the lines</h3>

      <p>
        Deciding on when to end the line also greatly affects the final result.
        Personally I like to use a combination of techniques like collision
        detection, max line length, and a random chance to end the line.
      </p>

      <p>
        The max line length could either be a constant that is the same for all
        lines, yielding a more uniform result, or you can set a list of
        <span class="code">maxLineLengths</span> and picking one randomly for
        each line. Maybe even picking the longer ones if the line starts closer
        to the top, or the further away from the center of the image the line
        starts, or so on.
      </p>

      <h3>A note on collision detection</h3>

      <p>
        I'd like to preface this by saying that I have done absolutely no
        research on this topic, how to optimize it, or if there are better ways
        to do it. I do like to convince myself, however, that this is art and
        the code doesn't need to be good. Having said all that, this is how I
        did collision detection to have each line avoid hitting any other lines.
      </p>

      <p>
        Since we're not really drawing lines but rather overlapping points with
        radius <span class="code">R</span> to achieve a line effect we can
        easily see if our line is about to collide with another line. We just
        have to see if the circle we are about to draw is going to overlap with
        any other circle we've previously drawn, except for the ones in the
        current line.
      </p>

      <p>
        Checking if two circles are overlapping is easily done by taking the
        position of the two circles, figuring out the distance between them, and
        then seeing if the distance is less than the sum of the two circles'
        radii. The distance can of course be done with pythagoras theorem so the
        entire check is no more than:
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
        A lot of time can be saved by searching for collisions with only the
        circles that are close to the circle that is currently being evaluated.
        <a href="https://en.wikipedia.org/wiki/Quadtree" target="_blank"
          >Quadtrees</a
        >
        are one way of doing this, but I went for an easier method by overlaying
        a grid over the entire canvas, and then mapping a position to a cell in
        the grid. The relation of the circle size relative to the size of the
        cells in the grid is important. If a circle is too big to reliably fit
        in inside a cell it might collide with a circle in a close by cell.
      </p>

      <div class="image-wrapper">
        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fgrid-populated.png?alt=media"
          alt="grid"
        />
      </div>

      <p>
        This isn't a huge problem for me though, since I'm often not looking for
        perfection in the output, a few imperfections might even be favorable,
        so experimenting with different values for the cell size is also fun. If
        you'd want to be more precise you could also check against collisions in
        the surrounding cells, if a circles center is at the very edge of a cell
        and the circle body spills out into nearby cells. This would increase
        the search space by a factor of nine though.
      </p>

      <p>
        One hacky thing I did was also to check only against every Nth circle in
        the cell to save some render time. Since circles are inserted into the
        cell in order, meaning any circle is probably
        <strong>very</strong> close to it's neighbors, it means that we don't
        really need to check if a circle collides with <strong>any</strong>
        other circle, just a few of them. The higher the N value the more chance
        of a collision or small overlap at the end of a line, but you gain a lot
        in terms of render time. Again, the result doesn't always have to be
        pixel perfect. Something like the code below would be a faster
        obviously, and in a lot of cases work just as well.
      </p>

      <pre><code>
//Check only every 7th circle in this cell to save time
for(let i = 0; i &lt; circlesInCell.length; i += 7) {
  const match = circlesInCell[i];
  const radiiSum = circle.radius + match.radius;
  if (distance(circle, match) &lt; radiiSum) {
    return true;
  }
}
return false;

</code></pre>

      <h3>Colors and variations</h3>

      <p>
        Keeping with the theme of the rest of the article, there are a lot of
        fun ways of working with colors in flow fields. You can select a
        different color for each line, or color by the starting noise value for
        the line, or have the line pick the color by the region of the canvas it
        spawned (All depticed below).
      </p>

      <div class="image-wrapper">
        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fcolor-by-line.png?alt=media"
          alt="grid"
        />

        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fcolor-by-depth.png?alt=media"
          alt="grid"
        />

        <img
          loading="lazy"
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fcolor-by-region.png?alt=media"
          alt="grid"
        />
      </div>

      <h3>Closing notes</h3>
      <p>
        I hope that this article has provided at least some insight that other
        articles on the topic didn't, since there really is a lot of variation
        that can be achieved when playing with flow fields. For my
        <a href="/art/forces">Forces series</a> each generated piece used a
        configuration that followed the interface below, and a lot more
        parameters can of course be added to create even greater variaty.
      </p>

      <pre><code>
export interface ForceConfiguration {
  
  // A list of colors
  colorScheme: lib.Palette;

  // Allow lines to flow into eachother
  collisionDetection: boolean;

  // DEPTH | REGION | RANDOM_FROM_PALETTE
  colorMethod: ColorMethod; 

  // DISC | SQUARE | ...
  shape: ForceShape; 

  // How much of the canvas should be covered in lines
  density: number; 
  
  // Canvas size in pixels
  dimensions: {
    width: number;
    height: number;
  };
  
  // What circle radii are allowed for lines
  strokeWeights: number[]; 

  // How close to the edge of the canvas are the lines allowed
  edgePadding: number; 

  // Allow some lines to go beyond the allowed area?
  allowEdgeOverflow: boolean;

  // for each circle in a line, how much bigger should the next circle be? default 0
  brushGrowthRate: number;

  // minimum amount of space around each line
  linePadding: number;

  // step size for dot in a line, to achieve the dotted effect in the first images
  resolution: number;

  // CIRCLES | SQUARE, ... 
  brushType: BrushType;

  // Math.cos(x) * noiseWarp
  noiseWarp: number;

  // Math.cos(x / noiseFactor)
  noiseFactor: number;

  // Seed for the noise function
  seed: number;

  // Default is Infinity
  maxLineLength: number;
}
</code></pre>
    `;
  }
}
