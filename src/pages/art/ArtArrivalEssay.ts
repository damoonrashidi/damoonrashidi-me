import { css, html, LitElement } from 'lit';
import { artCollections } from '../../art-collections.js';

export class ArtArrivalEssay extends LitElement {
  collection = artCollections.find(
    collection => collection.id === 'disrupted-arrival'
  )!;

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
          image="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Foriginal%2Fdisrupted-arrival%2FARRIVAL-2.png?alt=media"
          xOffset="0"
          yOffset="-400px"
        ></app-art-preview>
      </div>

      <p>
        My most experimental series to date. <span class="highlight">Disrupted Arrival</span> started out as a study in creating ink like textures that then devolved into a series of interconnected lines disrupted by areas of chaos.
      </p>

      <div class="image-grid">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fdisrupted-arrival%2FARRIVAL-2.webp?alt=media" alt="Disrupted Arrival 2">
      </div>

      
      <p>
        The ink like textures started like the image below and were then warped and overlapped using different layering techniques, and some random math determined where the disruptions would occur.
      </p>

      <div class="image-grid">
        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fimages%2Fink.png?alt=media" alt="ink study">
      </div>

      <div class="image-grid">
      <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fdisrupted-arrival%2FARRIVAL-1.webp?alt=media" alt="Disrupted Arrival 1">

        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fdisrupted-arrival%2FARRIVAL-3.webp?alt=media" alt="Disrupted Arrival 3">

        <img src="https://firebasestorage.googleapis.com/v0/b/website-e57e8.appspot.com/o/assets%2Fart%2Fthumb%2Fdisrupted-arrival%2FARRIVAL-4.webp?alt=media" alt="Disrupted Arrival 4">
      </div>
    `;
  }
}
