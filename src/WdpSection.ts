import { css, html, LitElement } from 'lit';

export class WdpSection extends LitElement {
  static styles = css`
    :host {
      background: #f5f4ef;
      display: block;
      padding: 180px 80px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-flow: row-reverse wrap;
    }
    h2 {
      color: #938869;
      font: 700 3rem 'Overpass', sans-serif;
    }
    p {
      color: #484848;
      font: 300 1.5rem 'Overpass', sans-serif;
      max-width: 500px;
      line-height: 2.5rem;
    }
    .preview-image img {
      max-width: 300px;
      margin: 80px 0 0 0;
      filter: drop-shadow(0px 100px 80px rgba(0, 0, 0, 0.07))
        drop-shadow(0px 78.1063px 58.8531px rgba(0, 0, 0, 0.0645911))
        drop-shadow(0px 49.0857px 34.4711px rgba(0, 0, 0, 0.0576747))
        drop-shadow(0px 25.039px 18.2181px rgba(0, 0, 0, 0.049293))
        drop-shadow(0px 10.4907px 8.5438px rgba(0, 0, 0, 0.0390069))
        drop-shadow(0px 2.94178px 2.93998px rgba(0, 0, 0, 0.0254634));
    }
    @media (min-width: 768px) {
      h2 {
        font-size: 6rem;
      }
      .preview-image {
        margin-right: 80px;
      }
      .preview-image img {
        max-width: 500px;
        margin: 0;
      }
    }
    a {
      color: #333;
      text-decoration: underline;
    }
    .highlight {
      color: #70853e;
      font-family: monospace;
      font-weight: 700;
    }
  `;

  render() {
    return html`
      <div class="text-wrapper">
        <h2>λ ~/wdp</h2>
        <p>
          wdp <span class="highlight">(wɒt ʌp)</span> is a command line tool for
          getting a developer news feed in the terminal.
        </p>
        <p>
          install via yarn
          <span class="highlight">(yarn global add wdp)</span> and then run
          <span class="highlight">wdp</span> in your terminal
        </p>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/damoonrashidi/bitalarm"
            >View on github</a
          >
          or
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.npmjs.com/package/wdp"
            >NPM</a
          >
        </p>
      </div>
      <div class="preview-image">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fimages%2Fwdp.png?alt=media"
          alt="WDP Preview"
          loading="lazy"
        />
      </div>
    `;
  }
}
