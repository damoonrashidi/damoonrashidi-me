import { LitElement, html, css } from 'lit';

export class AppFooter extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #111;
      padding: 200px 0;
    }
    h2 {
      font: 900 64px 'Playfair Display', sans-serif;
    }
  `;

  render() {
    return html` <h2>That's it.</h2> `;
  }
}
