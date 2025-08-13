class HeadlessPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.createElement("template");
    template.innerHTML = `<slot></slot>`;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("headless-panel", HeadlessPanel);
