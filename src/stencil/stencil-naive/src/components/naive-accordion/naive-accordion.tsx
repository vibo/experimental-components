import { Component, h, Listen, Prop } from '@stencil/core';

let _regionId = 0;
let _triggerId = 0;

@Component({
  tag: 'naive-accordion',
  shadow: false,
})
export class NaiveAccordion {
  @Prop({ reflect: true, attribute: 'data-accordion-open', mutable: true })
  public open: boolean = false;

  private _region;
  private _trigger;

  get _context() {
    return {
      open: this.open,
      regionId: `accordionRegion${_regionId}`,
      triggerId: `accordionTrigger${_triggerId}`,
      toggle: () => {
        this.open = !this.open;
      },
    };
  }

  componentDidRender() {
    if (this._trigger) {
      this._trigger.context = this._context;
    }
    if (this._region) {
      this._region.context = this._context;
    }
  }

  @Listen('naive-accordion/register')
  registerTrigger(event: CustomEvent<any>) {
    event.stopPropagation();
    const { type, el } = event.detail;

    el.context = this._context;
    if (type === 'trigger') {
      this._trigger = el;
    } else {
      this._region = el;
    }
  }

  render() {
    return <slot />;
  }
}
