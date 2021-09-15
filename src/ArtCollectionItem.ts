import { css, html, LitElement } from 'lit';
import { property } from 'lit-element';

export class ArtCollectionItem extends LitElement {
  @property({ type: String })
  title: string;

  @property({ type: String })
  description: string;

  @property({ type: String })
  image: string;

  @property({ type: Number })
  createdPieces: number;

  @property({ type: Number })
  soldPieces: number;

  @property({ type: Boolean })
  isOngoing: boolean;

  @property({ type: Boolean })
  soldOut: boolean = false;

  static styles = css`
    :host {
      display: block;
      width: 365px;
      margin: 0 40px;
    }
    @media (min-width: 768px) {
      :host {
        margin: 0 126px;
      }
    }

    h4 {
      font: 300 36px 'Playfair Display', sans-serif;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    p {
      font: 400 24px/1.5em 'Playfair Display', sans-serif;
    }
    .sold {
      font: 400 18px/1.5em sans-serif;
      color: #666;
    }
    .sold-out {
      color: #e74c3c;
      font-weight: bold;
    }
    img {
      border: 6px solid #262626;
      margin: 0 0 42px;
      width: 365px;
      height: 520px;
      background: #eee;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
        10px 76px 80px rgba(0, 0, 0, 0.16),
        0px 34.2165px 37.8605px rgba(0, 0, 0, 0.156182),
        0px 19.7788px 22.4204px rgba(0, 0, 0, 0.147078),
        0px 12.0142px 13.7505px rgba(0, 0, 0, 0.127239),
        0px 6.94312px 7.98618px rgba(0, 0, 0, 0.0753422);
    }
  `;

  constructor() {
    super();
    this.description = '';
    this.image = '';
    this.title = '';
    this.createdPieces = 0;
    this.soldPieces = 0;
    this.isOngoing = false;

    this.soldOut = false;
  }

  updated() {
    this.soldOut = this.soldPieces === this.createdPieces;
  }

  render() {
    return html`
      <img src="${this.image}" alt="${this.title}" loading="lazy" />
      <h4>
        ${this.title}
        <span class="sold ${this.soldOut ? 'sold-out' : ''}">
          ${this.soldOut
            ? 'Sold Out'
            : `${this.soldPieces} / ${this.createdPieces} sold`}
        </span>
      </h4>
      <p>${this.description}</p>
    `;
  }
}
