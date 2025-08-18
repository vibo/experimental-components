import { Component, h } from '@stencil/core';

@Component({
  tag: 'naive-panel-content',
  shadow: false,
})
export class NaivePanelContent {
  render() {
    return <slot />;
  }
}
