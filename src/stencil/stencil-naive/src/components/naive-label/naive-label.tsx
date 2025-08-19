import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'naive-label',
  shadow: false,
})
export class NaiveLabel {
  render() {
    return (
      <label>
        <slot />
      </label>
    );
  }
}
