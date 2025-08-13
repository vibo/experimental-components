import { LitElement, css, html } from "lit";

class BarrenPanel extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true, attribute: "data-open" },
    };
  }

  constructor() {
    super();
    this.open = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("barren-panel", BarrenPanel);
