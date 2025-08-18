import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'naive-accordion-trigger',
  shadow: false,
})
export class NaiveAccordionTrigger {
  @Element() el: HTMLElement;

  @Prop() context: any = {};

  @Event({
    eventName: 'naive-accordion/trigger',
    bubbles: true,
    composed: true,
  })
  register: EventEmitter<any>;

  componentWillLoad() {
    this.register.emit(this.el);
  }

  render() {
    return (
      <button type="button" id={this.context.triggerId} aria-expanded={this.context.open ? 'true' : 'false'} aria-controls={this.context.regionId} onClick={this.context.toggle}>
        {' '}
        <slot />
      </button>
    );
  }
}
