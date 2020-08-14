import { html, fixture, expect } from '@open-wc/testing';

import {AppTravelOne} from '../src/AppTravelOne.js';
import '../src/app-travel-one.js';

describe('AppTravelOne', () => {
  let element: AppTravelOne;
  beforeEach(async () => {
    element = await fixture(html`
      <app-travel-one></app-travel-one>
    `);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
