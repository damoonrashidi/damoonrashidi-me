import { css, html, LitElement } from 'lit';
import { navigator } from 'lit-element-router';
import { ArtCollection, artCollections } from '../../art-collections.js';

export class ArtList extends navigator(LitElement) {
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
      font-size: 36px;
      font-weight: 700;
    }
    p {
      font-family: 'Playfair Display', sans-serif;
      font-size: 24px;
      line-height: 1.5em;
      max-width: 1000px;
      font-weight: 200;
    }
    @media (min-width: 768px) {
      h2 {
        font-size: 64px;
      }
      p {
        font-size: 36px;
      }
    }

    .art-list-wrapper {
      overflow-x: auto;
      display: flex;
      flex-wrap: nowrap;
      padding: 0 120px 120px 80px;
    }
    .art-list-wrapper art-collection-item {
      cursor: pointer;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        color: #eee;
      }
    }
  `;

  collection = artCollections;

  updated() {
    const wrapper = this.shadowRoot?.querySelector('.art-list-wrapper')!;
    setTimeout(() => {
      if (window.innerWidth < 768) {
        wrapper.scrollLeft = 400;
      } else {
        wrapper.scrollLeft = 530;
      }
    });
  }

  navigateToCollection(collection: ArtCollection) {
    this.navigate(`/art/${collection.id}`);
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
          collection =>
            html`<art-collection-item
              .title=${collection.title}
              .image=${collection.thumbnail}
              .description=${collection.description}
              .createdPieces=${collection.createdPieces}
              .soldPieces=${collection.soldPieces}
              .isOngoing=${collection.isOngoing}
              .url=${collection.openSeaUrl}
              @click=${() => {
                this.navigateToCollection(collection);
              }}
            ></art-collection-item>`
        )}
      </div>
    `;
  }
}
