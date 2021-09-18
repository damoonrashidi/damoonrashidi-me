import { css, html, LitElement } from 'lit';
import { property } from 'lit-element';

export class ArtPreview extends LitElement {
  @property({ type: String })
  image: string = '';

  @property({ type: String })
  type: 'cover' | 'contain' | 'fit' = 'cover';

  @property({ type: String })
  yOffset: string = '0px';

  @property({ type: String })
  xOffset: string = '0px';

  static styles = css`
    :host {
      display: block;
      background-image: var(--image);
      background-repeat: no-repeat;
      background-position: var(--xOffset) var(--yOffset);
      width: 100%;
      height: 100%;
      background-size: var(--type);
    }
  `;

  updated() {
    this.style.setProperty('--image', `url(${this.image})`);
    this.style.setProperty('--yOffset', `${this.yOffset}`);
    this.style.setProperty('--xOffset', `${this.xOffset}`);
    this.style.setProperty('--type', `${this.type}`);
  }

  render() {
    return html` <div class="art-preview"></div> `;
  }
}
