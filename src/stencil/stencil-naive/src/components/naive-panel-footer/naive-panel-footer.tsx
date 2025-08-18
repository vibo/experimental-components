import { Component, h } from '@stencil/core';

@Component({
  tag: 'naive-panel-footer',
  shadow: false,
})
export class NaivePanelFooter {
  render() {
    return <slot />;
  }
}
