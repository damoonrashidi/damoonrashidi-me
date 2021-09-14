import { css, html, LitElement } from 'lit';

export interface Art {
  title: string;
  description: string;
  image: string;
}

export interface Collection {
  title: string;
  description: string;
  art: Art[];
  thumbnail: string;
}

export class ArtList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 80px 0;
    }

    .text-wrapper {
      padding: 80px;
    }
    h2 {
      font-family: 'Playfair Display', sans-serif;
      font-size: 64px;
      font-weight: 200;
    }
    p {
      font-family: 'Playfair Display', sans-serif;
      font-size: 36px;
      line-height: 1.5em;
      max-width: 1000px;
      font-weight: 200;
    }
    .art-list-wrapper {
      overflow-x: auto;
      display: flex;
      flex-wrap: nowrap;
      padding: 0 120px 0 80px;
    }
    .art-list-wrapper > art-list-item {
      margin-right: 64px;
    }
  `;

  collection: Collection[] = [
    {
      title: 'Forces',
      description: 'An exploration in flow fields with different behaviors.',
      thumbnail: './assets/forces-base.webp',
      art: [],
    },
    {
      title: 'Disrupted Arrival',
      description:
        'A series exploring ink like textures, flows and disruptions',
      thumbnail: './assets/arrival-base.webp',
      art: [],
    },
    {
      title: 'Seasons',
      description:
        'Four variations of the same rules. Each variation represents a season.',
      thumbnail: './assets/seasons-base.webp',
      art: [],
    },
    {
      title: 'Grid',
      description:
        'A series of images exploring random noise structured and grouped into columns. Two contrast variations',
      thumbnail: './assets/grid-base.webp',
      art: [],
    },
  ];

  updated() {
    const list = this.shadowRoot?.querySelector('.art-list-wrapper')!;
    list.scrollLeft = 530;
  }

  render() {
    return html`
      <div class="text-wrapper">
        <h2>Generative Art.</h2>
        <p>
          My generative art experiments. Each piece was created either entierly
          algorithmically or a base image was created by hand and then fed to
          the machine to finish the product.
        </p>
      </div>
      <div class="art-list-wrapper">
        ${this.collection.map(
          art =>
            html`<art-list-item
              .title=${art.title}
              .image=${art.thumbnail}
              .description=${art.description}
            ></art-list-item>`
        )}
      </div>
    `;
  }
}
