import { LitElement, html, css } from 'lit';

export class AppHeader extends LitElement {
  static styles = css`
    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    :host {
      background-color: #1c1c1c;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .info-text {
      font-family: 'Oswald', sans-serif;
      color: #fafafa;
      margin: 0 32px;
      text-transform: uppercase;
    }
    h1 {
      font-size: 70px;
    }
    h3 {
      font-weight: 200;
      font-size: 40px;
    }
  `;

  render() {
    return html`
      <div class="info-text">
        <h1>Damoon Rashidi</h1>
        <h3>Code, art & Projects.</h3>
      </div>
    `;
  }
}
