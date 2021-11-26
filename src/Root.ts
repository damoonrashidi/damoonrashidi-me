import { LitElement, html, css } from 'lit';
import { property } from 'lit-element';
import { router } from 'lit-element-router';

@router
export class AppRoot extends LitElement {
  @property({ type: String })
  route: string = '';

  @property({ type: Object })
  params: Record<string, string> = {};

  static styles = css`
    :host {
      min-height: 100vh;
    }
  `;

  static get routes() {
    return [
      {
        name: 'home',
        pattern: '',
      },
      {
        name: 'art-grid',
        pattern: 'art/grid',
      },
      {
        name: 'art-seasons',
        pattern: 'art/seasons',
      },
      {
        name: 'art-arrival',
        pattern: 'art/disrupted-arrival',
      },
      {
        name: 'art-forces',
        pattern: 'art/forces',
      },
      {
        name: 'art-forces',
        pattern: 'art/forces',
      },
      {
        name: 'flow-field-methods',
        pattern: 'articles/flow-field-methods',
      },
      {
        name: 'not-found',
        pattern: '*',
      },
    ];
  }

  router(route: string, params: Record<string, string>) {
    this.route = route;
    this.params = params;
    AppRoot.setTitle(route);
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
  }

  static setTitle(route: string) {
    switch (route) {
      case 'art-grid':
        document.title = 'Damoon Rashidi - Grid';
        break;
      case 'art-seasons':
        document.title = 'Damoon Rashidi - Seasons';
        break;
      case 'art-arrival':
        document.title = 'Damoon Rashidi - Arrival';
        break;
      case 'art-forces':
        document.title = 'Damoon Rashidi - Forces';
        break;
      case 'art-genesis':
        document.title = 'Damoon Rashidi - Genesis';
        break;
      case 'flow-field-methods':
        document.title = `What I've learned about flow fields so far`;
        break;
      default:
        document.title = 'Damoon Rashidi - Code and Art';
        break;
    }
  }

  render() {
    return html`
      <app-header></app-header>

      <app-main active-route=${this.route}>
        <app-home route="home"></app-home>
        <app-art-grid route="art-grid"></app-art-grid>
        <app-art-seasons route="art-seasons"></app-art-seasons>
        <app-art-arrival route="art-arrival"></app-art-arrival>
        <app-art-forces route="art-forces"></app-art-forces>
        <app-article-flow-fields
          route="flow-field-methods"
        ></app-article-flow-fields>
      </app-main>
    `;
  }
}
