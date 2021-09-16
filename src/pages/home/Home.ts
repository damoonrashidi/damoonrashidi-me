import { css, html, LitElement } from 'lit';

export class AppHome extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
    }
  `;

  render() {
    return html`
      <section-wrapper color="#1a1a1a" .height=${50}>
        <art-list></art-list>
      </section-wrapper>
      <section-wrapper color="#111">
        <bitalarm-section></bitalarm-section>
      </section-wrapper>
      <section-wrapper color="#F5F4EF">
        <wdp-section></wdp-section>
      </section-wrapper>
      <app-footer></app-footer>
    `;
  }
}
