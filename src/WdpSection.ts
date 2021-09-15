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
      flex-wrap: wrap;
      flex-flow: row-reverse;
    }
    h2 {
      color: #bcb18f;
      font: 700 6rem 'Overpass', sans-serif;
    }
    p {
      color: #484848;
      font: 300 1.5rem 'Overpass', sans-serif;
      max-width: 500px;
      line-height: 2.5rem;
    }
    a {
      color: #333;
      text-decoration: none;
    }
    .highlight {
      color: #e79b9b;
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
          <a target="_blank" href="https://github.com/damoonrashidi/bitalarm"
            >View on github</a
          >

          <a target="_blank" href="https://www.npmjs.com/package/wdp"
            >View on NPM</a
          >
        </p>
      </div>
      <div class="preview-image">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fimages%2Fwdp.png?alt=media"
          alt="WDP Preview"
        />
      </div>
    `;
  }
}
