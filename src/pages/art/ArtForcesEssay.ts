import { css, html, LitElement } from 'lit';
import { artCollections } from '../../art-collections.js';

export class ArtForcesEssay extends LitElement {
  collection = artCollections.find(collection => collection.id === 'forces')!;

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
  `;

  render() {
    return html`
      <h2>${this.collection.title}</h2>

      <p>View all the ${this.collection.createdPieces} created pieces on <a href=${this.collection.openSeaUrl} rel="noopener nofollow" target="_blank">OpenSea.</p>

      <div class="full-width-image">
        <app-art-preview
          image="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Foriginal%2Fforces%2Fforces-12.png?alt=media"
          xOffset="0"
          yOffset="-400px"
        ></app-art-preview>
      </div>

      <p>
        My most elaborate series. Each piece has settings like <span class="highlight">allowEdgeOverflow</span>, <span class="highlight">linePadding</span>, <span class="highlight">colorScheme</span>, <span class="highlight">density</span>, <span class="highlight">strokeWeights</span>, <span class="highlight">maxLineLength</span> <span class="highlight">Collision detection</span> and a few more.
      </p>

      <div class="image-grid">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fforces%2Fforces-10.webp?alt=media" alt="Forces 10">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fforces%2Fforces-11.webp?alt=media" alt="Forces 11">
      </div>

      <p>
        The slowest part of the generation was the collission detection. Each line was created using several circles painted over eachother and to avoid checking to see if one circle intersected with a circle in any of the other lines I divided the painting into a grid of sub squares.
      </p>

      <p>After painting each line I added each circle in the line to it's respective subsquare and instead checked only against circles in the same subsquare</p>
      
      
      <p>
        For each line a generic function for a lot of the properties was created and passed a <span class="highlight">paintingConfiguration</span> that determined how to draw the line, what colors to use, what the paintings bounding box is and so on.
      </p>

      <div class="image-grid">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fforces%2Fforces-13.webp?alt=media" alt="Forces 13">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fforces%2Fforces-7.webp?alt=media" alt="Forces7">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fforces%2Fforces-12.webp?alt=media" alt="Forces 12 - Day at the beach">
      </div>
    `;
  }
}
