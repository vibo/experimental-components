import { Component, h } from '@stencil/core';

@Component({
  tag: 'naive-panel-header',
  shadow: false,
})
export class NaivePanelHeader {
  render() {
    return <slot />;
  }
}
