import { css, html, LitElement } from 'lit';

export class BitalarmSection extends LitElement {
  static styles = css`
    :host {
      background: #1a1a1a;
      display: block;
      padding: 80px;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    h2 {
      color: #fff;
      font: 700 6rem 'Oswald', sans-serif;
    }
    p {
      color: #c5c5c5;
      font: 300 1.5rem 'Oswald', sans-serif;
      max-width: 500px;
      line-height: 2.5rem;
    }
    a {
      color: #fff;
      text-decoration: none;
    }
    img {
      mix-blend-mode: difference;
      transform: translateY(188px);
    }
  `;

  render() {
    return html`
      <div class="text-wrapper">
        <h2>BITALARM</h2>
        <p>
          BITALARM is a cross platform mobile application written in Flutter to
          help you keep track of your cryptocurrency investments with a focus on
          privacy.
        </p>
        <p>
          The application is open source and none of the information (wallet
          addresses, holdings or anything else) ever leave the device and there
          are no analytics included in the application.
        </p>
        <p>
          <a target="_blank" href="https://github.com/damoonrashidi/bitalarm"
            >View on github</a
          >
        </p>
      </div>
      <div class="preview-image">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fimages%2Fbitalarm.svg?alt=media"
          alt="Bitalarm Preview"
        />
      </div>
    `;
  }
}
