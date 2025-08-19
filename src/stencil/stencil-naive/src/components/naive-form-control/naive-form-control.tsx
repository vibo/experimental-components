import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'naive-form-control',
  shadow: false,
})
export class NaiveFormControl {
  render() {
    return <slot />;
  }
}
