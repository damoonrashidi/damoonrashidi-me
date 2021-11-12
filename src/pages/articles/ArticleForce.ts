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
    p {
      font-family: 'Playfair Display', sans-serif;
      font-size: 18px;
      line-height: 1.5em;
      font-weight: 200;
    }
    .image-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    }
    .image-wrapper img {
      max-width: 400px;
      margin: 40px auto;
      display: block;
    }
    .code {
      font-family: 'Fira Code', monospace;
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

      <div class="image-wrapper">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Farticles%2Fflow-field-methods%2Fflow-lines.png?alt=media"
          alt="Flow field in digits"
        />
      </div>

      <p>
        You can also, conceptually, zoom in and out by manipulating the X and Y
        values that are inputted into the noise function.
      </p>

      <p>
        Personally I like to use a simple set of rules to determine when a line
        ends. I either enable collision detection, meaning that a line ends when
        it collides with another line or the edge of the canvas. Other ways to
        end a line could be setting a max traverse length for each line, or
        picking a line length from a set of predetermined line lengths. Or
        having the line end when <span class="code">Math.random() > 0.97</span>.
        It could be whatever you want!
      </p>

      <h3>A note on collision detection</h3>

      <p>
        I'd like to preface this by saying that I have done absolutely no
        research on this topic, how to optimize it, or if there are better ways
        to do it. But I like to convince myself that this is art and the code
        doesn't need to be good. Having said all that, this is how I did
        collision detection to have each line avoid hitting all other lines.
      </p>

      <p>The lines are made up by circles with the radius</p>
    `;
  }
}
