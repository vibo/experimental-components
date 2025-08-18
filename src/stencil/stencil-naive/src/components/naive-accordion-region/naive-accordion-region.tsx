import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'naive-accordion-region',
  shadow: false,
})
export class NaiveAccordionRegion {
  @Element() el: HTMLElement;

  @Prop() context: any = {};

  @Event({
    eventName: 'naive-accordion/region',
    bubbles: true,
    composed: true,
  })
  register: EventEmitter<any>;

  componentWillLoad() {
    this.register.emit(this.el);
  }

  render() {
    console.log('region', this.context);
    return (
      <Host role="region" id={this.context.regionId} aria-labelledby={this.context.triggerId}>
        <slot />
      </Host>
    );
  }
}
