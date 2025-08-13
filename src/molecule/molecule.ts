import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("atom-form-control")
class AtomFormControl extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement("atom-label")
class AtomLabel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<label><slot></slot></label>`;
  }
}

@customElement("atom-input")
class AtomInput extends LitElement {
  @property({ type: String, reflect: true })
  public value: string = "";

  static styles = css`
    :host {
      display: block;
    }

    input {
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
    }
  `;

  render() {
    return html`<input .value=${this.value} />`;
  }
}

@customElement("atom-hint")
class AtomValidation extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement("molecule-input")
class MoleculeInput extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: "data-open" })
  public open: boolean = false;

  @property({ type: String, reflect: true })
  public label: string = "";

  @property({ type: String, reflect: true })
  public value: string = "";

  @property({ type: String, reflect: true })
  public error: string = "";

  static styles = css`
    :host {
      display: block;
    }
  `;

  // Not always feasible
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  render() {
    return html`
      <atom-form-control>
        <atom-label>${this.label}</atom-label>
        <atom-input .value=${this.value}></atom-input>
        ${this.error &&
        html`<atom-hint style="color: red;">${this.error}</atom-hint>`}
      </atom-form-control>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "molecule-input": MoleculeInput;
    "atom-form-control": AtomFormControl;
    "atom-label": AtomLabel;
    "atom-input": AtomInput;
    "atom-hint": AtomValidation;
  }
}
