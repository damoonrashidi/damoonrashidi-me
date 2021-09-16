import { css, html, LitElement } from 'lit';
import { router } from 'lit-element-router';

export class ArtPage extends router(LitElement) {
  static styles = css`
    :host {
      min-height: 100vh;
    }
  `;

  route: string = '';

  params: Record<string, unknown> = {};

  query: Record<string, unknown> = {};

  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
    };
  }

  router(
    route: string,
    params: Record<string, unknown>,
    query: Record<string, unknown>
  ) {
    this.route = route;
    this.query = query;
    this.params = params;

    console.log(route, query, params);
  }

  render() {
    console.log(this.route);
    console.log(this.params);
    console.log(this.query);

    return html`Hello ${this.params.collection}`;
  }
}
