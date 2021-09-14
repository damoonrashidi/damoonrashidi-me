import { LitElement, html, css } from 'lit';

export class DamoonRashidi extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <section-wrapper color="#1a1a1a" .height=${50}>
        <art-list></art-list>
      </section-wrapper>
      <section-wrapper color="#111">
        <bitalarm-section></bitalarm-section>
      </section-wrapper>
    `;
  }
}
