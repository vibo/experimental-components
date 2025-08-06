import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume, createContext, provide } from "@lit/context";

export interface AccordionControlsAPI {
  toggle: () => void;
  root?: any;
}

export const accordionControlsContext = createContext<AccordionControlsAPI>(
  "naive-accordion-controls-context"
);

@customElement("naive-panel")
class NaivePanel extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: "data-open" })
  public open: boolean = false;

  @provide({ context: accordionControlsContext })
  accordionControls: AccordionControlsAPI = {
    toggle: () => {
      this.open = !this.open;
    },
    root: this,
  };

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement("naive-panel-header")
class NaivePanelHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement("naive-panel-content")
class NaivePanelContent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement("naive-panel-footer")
class NaivePanelFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement("naive-accordion-trigger")
class NaiveAccordionTrigger extends LitElement {
  @consume({ context: accordionControlsContext })
  public controller?: AccordionControlsAPI;

  private _handleClick() {
    this.controller?.toggle();
  }

  static styles = css`
    button {
      display: block;
      outline: none;
      border: none;
      margin: 0;
      padding: 0;
      width: 100%;

      appearance: button;
      text-align: left;
      background-color: inherit;
    }
  `;

  render() {
    return html`<button type="button" @click=${this._handleClick}>
      <slot></slot>
    </button>`;
  }
}

@customElement("naive-accordion-target")
class NaiveAccordionTarget extends LitElement {
  static styles = css`
    :host {
      display: none;
      background-color: pink;
    }

    [data-open] :host {
      display: block;
    }
  `;

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "naive-panel": NaivePanel;
    "naive-panel-header": NaivePanelHeader;
    "naive-panel-content": NaivePanelContent;
    "naive-panel-footer": NaivePanelFooter;
    "naive-accordion-trigger": NaiveAccordionTrigger;
    "naive-accordion-target": NaiveAccordionTarget;
  }
}
