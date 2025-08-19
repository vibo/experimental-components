import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'naive-input',
  shadow: false,
})
export class NaiveInput {
  render() {
    return <input />;
  }
}
