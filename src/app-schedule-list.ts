import './app-search.js';
import { LitElement, html, customElement } from 'lit-element';
//import { appSearchBlock } from './app-search.js';

@customElement('mwc-schedule-list')
class scheduleList extends LitElement {
  render() {
    return html`
      <mwc-search-block></mwc-search-block>
      <div></div>
    `;
  }
}
