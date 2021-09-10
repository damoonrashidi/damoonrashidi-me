import { LitElement, html, css } from 'lit';
import { property } from 'lit-element';

export class SectionWrapper extends LitElement {
  @property({ type: String })
  color: string;

  @property({ type: Number })
  height: number = 20;

  static styles = css`
    :host {
      display: block;
    }

    :host::after {
      content: ' ';
      display: block;
      width: 100vw;
      height: var(--height);
      position: absolute;
      background: var(--color);
      transform: translateY(calc(var(--height) * -1));
      clip-path: polygon(0 100%, 100% 0, 100% 100%);
    }

    .withMargin {
      margin-bottom: var(--height);
    }
  `;

  constructor() {
    super();
    this.color = '#fff';
    this.style.setProperty('--height', `${this.height}px`);
  }

  updated() {
    this.style.setProperty('--height', `${this.height}px`);
    this.style.setProperty('--color', this.color);
  }

  render() {
    return html`<slot></slot>`;
  }
}
