import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume, createContext, provide } from "@lit/context";

export interface AccordionControlsAPI {
  regionId: string;
  triggerId: string;
  registerRegion: (element: any) => void;
  registerTrigger: (element: any) => void;
  toggle: () => void;
  root?: any;
}

export const accordionControlsContext = createContext<AccordionControlsAPI>(
  "naive-accordion-controls-context"
);

let idTracker = 1;

@customElement("naive-panel")
class NaivePanel extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: "data-styles" })
  public _styles: boolean = true;

  @property({ type: Boolean, reflect: true, attribute: "data-open" })
  public open: boolean = false;

  @provide({ context: accordionControlsContext })
  accordionControls: AccordionControlsAPI = {
    regionId: "regionId" + idTracker++,
    triggerId: "triggerId" + idTracker++,
    registerRegion: (element: any) => {
      console.log("region");

      element.setAttribute("id", this.accordionControls.regionId);
      element.setAttribute("labelledby", this.accordionControls.triggerId);
    },
    registerTrigger: (element: any) => {
      console.log("trigger");

      element.setAttribute("id", this.accordionControls.triggerId);
      element.setAttribute("controls", this.accordionControls.regionId);
    },
    toggle: () => {
      this.open = !this.open;
    },
    root: this,
  };

  static styles = css`
    :host([data-styles]) {
      display: block;
      background-color: var(--panel-background, white);
      border-radius: var(--panel-border-r-t, 4px);
      padding: var(--pt, 16px) var(--pr, 24px) var(--pb, 16px) var(--pl, 24px);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement("naive-panel-header")
class NaivePanelHeader extends LitElement {
  static styles = css`
    :host(naive-panel-header) {
      display: block;
      padding: var(--pt, 16px) var(--pr, 24px) var(--pb, 16px) var(--pl, 24px);
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
      padding: var(--pt, 16px) var(--pr, 24px) var(--pb, 16px) var(--pl, 24px) !important;
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
      padding: var(--pt, 16px) var(--pr, 24px) var(--pb, 16px) var(--pl, 24px) !important;
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

  @property({ type: String, reflect: true, attribute: "label" })
  public _ariaLabel: String = "test";

  @property({ type: Boolean, reflect: true, attribute: "expanded" })
  public _ariaExpanded: boolean = false;

  @property({ type: String, reflect: true, attribute: "controls" })
  public _ariaControls: string = "";

  @property({ type: String, reflect: true, attribute: "id" })
  public _id: string = "";

  private _handleClick() {
    this.controller?.toggle();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.controller?.registerTrigger(this);
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
    return html`<button
      type="button"
      id=${this._id}
      aria-label=${this._ariaLabel}
      aria-expanded=${this._ariaExpanded}
      aria-controls=${this._ariaControls}
      @click=${this._handleClick}
    >
      <slot></slot>
    </button>`;
  }
}

@customElement("naive-accordion-target")
class NaiveAccordionTarget extends LitElement {
  @consume({ context: accordionControlsContext })
  public controller?: AccordionControlsAPI;

  @property({ type: String, reflect: true, attribute: "role" })
  public _role: string = "region";

  @property({ type: String, reflect: true, attribute: "aria-labelledby" })
  public _ariaLabelledby: string = "";

  @property({ type: String, reflect: true, attribute: "id" })
  public _id: string = "";

  static styles = css`
    :host {
      display: none;
      background-color: pink;
    }

    [data-open] :host {
      display: block;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.controller?.registerRegion(this);
  }

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
