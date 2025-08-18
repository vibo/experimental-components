import { Component, h } from '@stencil/core';

@Component({
  tag: 'naive-panel',
  shadow: false,
})
export class NaivePanel {
  render() {
    return <slot />;
  }
}
