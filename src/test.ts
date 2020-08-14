import './out-tsc/src/mwc-combo';
import { customElement, LitElement, html, property } from 'lit-element';

class appLandingTest extends LitElement {
  @property({ type: Array })
  ports: Array<string>;

  constructor() {
    super();
    //this.get_from();
    this.ports = [];
    this.get_from();
  }

  async get_from() {
    const search_url = 'http://localhost:5000/ports?';
    this.ports = await fetch(search_url).then(res => res.json());
    //console.log(this.ports.slice(0, 10));
  }

  render() {
    return html`<div class="row-1">
      <div>
        <mwc-combo-text id="blah" label="blah" .selections="${this.ports}">
        </mwc-combo-text>
      </div>
    </div>`;
  }
}
customElements.define('mwc-landing-test', appLandingTest);
