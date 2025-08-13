const styles = new CSSStyleSheet();
styles.replaceSync(`
  :host {
    display: block;
    padding: var(--pt, 16px) var(--pr, 24px) var(--pb, 16px) var(--pl, 24px);
  }
`);

class HeadlessPanelStyled extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [styles];
    }

    const template = document.createElement("template");
    template.innerHTML = `<slot></slot>`;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("headless-panel-styled", HeadlessPanelStyled);
