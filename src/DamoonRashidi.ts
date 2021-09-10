import { LitElement, html, css } from 'lit';

export class DamoonRashidi extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
    }
  `;

  render() {
    return html`
      <section-wrapper color="#fafafa" .height=${30}>
        <app-header></app-header>
      </section-wrapper>
      <section-wrapper color="#1a1a1a" .height=${50}>
        <art-list></art-list>
      </section-wrapper>
      <section-wrapper color="#fafafa">
        <bitalarm-section></bitalarm-section>
      </section-wrapper>
    `;
  }
}
