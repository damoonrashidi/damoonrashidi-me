import { css, html, LitElement } from 'lit';
import { artCollections } from '../../art-collections.js';

export class ArtGridEssay extends LitElement {
  collection = artCollections.find(collection => collection.id === 'grid')!;

  static styles = css`
    :host {
      min-height: 100vh;
    }

    h2 {
      font-family: 'Playfair Display', sans-serif;
      font-size: 64px;
      font-weight: 300;
      padding: 40px 80px;
    }
    p {
      font-family: 'Playfair Display', sans-serif;
      padding: 20px;
      font-size: 24px;
      width: 940px;
      max-width: 80%;
      margin: 0 auto;
    }
    .full-width-image {
      width: 100vw;
      height: 400px;
      margin: 64px 0;
    }
    .image-grid {
      margin: 64px auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    .image-grid app-art-preview,
    .image-grid img {
      margin: 16px;
      border: 6px solid #000;
      filter: drop-shadow(0px 100px 80px rgba(0, 0, 0, 0.07))
        drop-shadow(0px 41.451px 30.3476px rgba(0, 0, 0, 0.0696589))
        drop-shadow(0px 20.5919px 10.9585px rgba(0, 0, 0, 0.0665554))
        drop-shadow(0px 10.9644px 5.33782px rgba(0, 0, 0, 0.0601605))
        drop-shadow(0px 5.83335px 3.20228px rgba(0, 0, 0, 0.0495397))
        drop-shadow(0px 2.58612px 1.69914px rgba(0, 0, 0, 0.0326067));
    }
    .highlight {
      font-family: monospace;
      font-weight: bold;
    }
    @media (prefers-color-scheme: dark) {
      :host {
        color: #eee;
      }
    }
  `;

  render() {
    return html`
      <h2>Grid</h2>

      <p>View all the ${this.collection.createdPieces} created pieces on <a href=${this.collection.openSeaUrl} rel="noopener nofollow" target="_blank">OpenSea.</p>

      <div class="full-width-image">
        <app-art-preview
          image="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fdisplay%2Fgrid%2Fgrid-2.png?alt=media"
          xOffset="0"
          yOffset="-400px"
        ></app-art-preview>
      </div>

      <p>
        Grid was my second generative series, it started out as an exploration
        of creating different macro patterns using random noised structured into
        columns.
      </p>

      <div class="image-grid">
      <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgrid%2Fgrid-1.webp?alt=media" alt="Grid 1">
      <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgrid%2Fgrid-4.webp?alt=media" alt="Grid 4">
      </div>

      <p>
        First, column widths were determined with the image width as an input. The floor and ceiling were random steps between a percentage of the full image width. Secondly, for each column, a segment was created with the height using the same method but using the image height as input. Segements then started filling the column until it hit the column height.
      </p>

      <p>
        Each segment was then filled with randomly placed pixels with a density using the segment dimension as the input.
      </p>

      <p>
        Each segemnt also had a chance of being <span class="highlight">long</span>, and the <span class="highlight">long</span> segments mutated the pixel density to be lower.
      </p>

      <div class="image-grid">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgrid%2Fgrid-2.webp?alt=media" alt="Grid 2">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgrid%2Fgrid-5.webp?alt=media" alt="Grid 5">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fgrid%2Fgrid-8.webp?alt=media" alt="Grid 8">
      </div>
    `;
  }
}
