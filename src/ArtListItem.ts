import { css, html, LitElement } from 'lit';
import { property } from 'lit-element';

export class ArtListItem extends LitElement {
  @property({ type: String })
  title: string;

  @property({ type: String })
  description: string;

  @property({ type: String })
  image: string;

  static styles = css`
    :host {
      display: block;
      width: 365px;
    }

    h4 {
      font-family: 'Kaisei HarunoUmi', sans-serif;
      font-size: 32px;
      font-weight: 200;
      margin: 16px 0;
    }
    p {
      font-family: 'Kaisei HarunoUmi', sans-serif;
      font-size: 16px;
      line-height: 2em;
      max-width: 800px;
      font-weight: 200;
      padding-right: 24px;
    }
  `;

  constructor() {
    super();
    this.description = '';
    this.image = '';
    this.title = '';
  }

  render() {
    return html`
      <img src="${this.image}" alt="${this.title}" loading="lazy" />
      <h4>${this.title}</h4>
      <p>${this.description}</p>
    `;
  }
}
