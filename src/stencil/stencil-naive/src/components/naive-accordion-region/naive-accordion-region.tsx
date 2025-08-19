import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'naive-accordion-region',
  shadow: false,
})
export class NaiveAccordionRegion {
  @Element() el: HTMLElement;

  @Prop() context: any = {};

  @Event({
    eventName: 'naive-accordion/register',
    bubbles: true,
    composed: true,
  })
  register: EventEmitter<any>;

  componentWillLoad() {
    this.register.emit({
      type: 'region',
      el: this.el,
    });
  }

  render() {
    return (
      <Host role="region" id={this.context.regionId} aria-labelledby={this.context.triggerId}>
        <slot />
      </Host>
    );
  }
}
