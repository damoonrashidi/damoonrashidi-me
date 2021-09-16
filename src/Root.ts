import { LitElement, html, css } from 'lit';
import { router } from 'lit-element-router';

@router
export class AppRoot extends LitElement {
  route: string = '';

  static styles = css`
    :host {
      min-height: 100vh;
    }
  `;

  static get properties() {
    return {
      route: { type: String },
    };
  }

  static get routes() {
    return [
      {
        name: 'home',
        pattern: '',
      },
      {
        name: 'art',
        pattern: 'art/:collection',
      },
      {
        name: 'not-found',
        pattern: '*',
      },
    ];
  }

  router(route: string) {
    this.route = route;
  }

  render() {
    return html`
      <app-header></app-header>
      <app-main active-route=${this.route}>
        <app-home route="home"></app-home>
        <app-art route="art">Art</app-art>
      </app-main>
    `;
  }
}
