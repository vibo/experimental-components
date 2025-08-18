import { Component, h, Listen, Prop, Watch } from '@stencil/core';

let _regionId = 0;
let _triggerId = 0;

@Component({
  tag: 'naive-accordion',
  shadow: false,
})
export class NaiveAccordion {
  @Prop({ reflect: true, attribute: 'data-accordion-open', mutable: true })
  public open: boolean = false;

  @Watch('open')
  private onOpenChange() {
    if (this._trigger) {
      this._trigger.context = this._context;
    }
    if (this._region) {
      this._region.context = this._context;
    }
  }

  private _region;
  private _trigger;
  private _context = {
    open: false,
    regionId: `accordionRegion${_regionId++}`,
    triggerId: `accordionTrigger${_triggerId++}`,
    toggle: () => {
      this.open = !this.open;
      this._context = {
        ...this._context,
        open: this.open,
      };
      if (this._trigger) {
        this._trigger.context = this._context;
      }
      if (this._region) {
        this._region.context = this._context;
      }
    },
  };

  @Listen('naive-accordion/trigger')
  registerTrigger(event: CustomEvent<any>) {
    this._trigger = event.detail;
    this._trigger.context = this._context;
  }

  @Listen('naive-accordion/region')
  registerRegion(event: CustomEvent<any>) {
    this._region = event.detail;
    this._region.context = this._context;
  }

  render() {
    return <slot />;
  }
}
