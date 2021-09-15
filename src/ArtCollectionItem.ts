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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 365px;
      margin: 0 40px;
    }
    @media (min-width: 768px) {
      :host {
        margin: 0 126px;
      }
    }

    .description {
      height: 200px;
    }
    h3 {
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
      color: #c63d2e;
      font-weight: bold;
    }
    .image-holder {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 620px;
    }
    img {
      border: 6px solid #262626;
      margin: 0 0 42px;
      background: #eee;
      width: 365px;
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
      <div class="image-holder">
        <img src="${this.image}" alt="${this.title}" loading="lazy" />
      </div>
      <div class="description">
        <h3>
          ${this.title}
          <span class="sold ${this.soldOut ? 'sold-out' : ''}">
            ${this.soldOut
              ? 'Sold Out'
              : `${this.soldPieces} / ${this.createdPieces} sold`}
          </span>
        </h3>
        <p>${this.description}</p>
      </div>
    `;
  }
}
