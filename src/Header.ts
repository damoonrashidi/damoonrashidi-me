import { LitElement, html, css } from 'lit';

export class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Oswald', sans-serif;
      color: #111;
      padding: 100px 80px;
    }
    h4 {
      font: 900 24px 'Overpass', sans-serif;
      max-width: 100px;
    }
    .socials {
      width: 150px;
    }
    .socials {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .socials li {
      list-style-type: none;
    }
    a > img {
      text-decoration: none;
      outline: none;
    }
  `;

  render() {
    return html`
      <h4>DAMOON RASHIDI.</h4>
      <ul class="socials">
        <li>
          <a href="https://twitter.com/damoon_rashidi" target="_blank"
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fimages%2Ftwitter.png?alt=media"
              alt="Twitter Icon"
          /></a>
        </li>
        <li>
          <a href="https://instagram.com/damoon__rashidi" target="_blank"
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fimages%2Finstagram.png?alt=media"
              alt="Instagram Icon"
          /></a>
        </li>
        <li>
          <a href="https://opensea.io/damoonrashidi" target="_blank"
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fimages%2Fopensea.png?alt=media"
              alt="OpenSea Icon"
          /></a>
        </li>
      </ul>
    `;
  }
}
