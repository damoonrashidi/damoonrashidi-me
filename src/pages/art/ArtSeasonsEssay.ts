import { css, html, LitElement } from 'lit';
import { artCollections } from '../../art-collections.js';

export class ArtSeasonsEssay extends LitElement {
  collection = artCollections.find(collection => collection.id === 'seasons')!;

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
          image="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Foriginal%2Fseasons%2Fwinter.png?alt=media"
          xOffset="0"
          yOffset="-400px"
        ></app-art-preview>
      </div>

      <p>
        Seasons was my first generative art series. It uses the <a href="https://tylerxhobbs.com/essays/2020/flow-fields">flow fields technique</a> described by Tyler Hobbs. Each piece represents a season of the year, using different colors. turbulence and stroke lengths.
      </p>

      <div class="image-grid">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fseasons%2Fspring.webp?alt=media" alt="Spring">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fseasons%2Fsummer.webp?alt=media" alt="Summer">
      </div>

      <p>
        First, a <a href="https://en.wikipedia.org/wiki/Perlin_noise">noise function</a> was picked for each season. Secondly a <span class="highlight">point</span> inside the drawable area was and  picked and a line was drawn along the flow field unitl the point was outside the drawable area or if it collided with another line.
      </p>

      <p>
        A color palette was created for each season and lines pick one of the colors from the respective palette at random.  
  </p>

      <p>
        A point could also be <span class="highlight">long</span> allowing it to go outside the drawable area by a few points to create a more lively image.
      </p>

      <div class="image-grid">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fseasons%2Fautumn.webp?alt=media" alt="Autumn">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fseasons%2Fwinter.webp?alt=media" alt="Winter">
      </div>
    `;
  }
}
