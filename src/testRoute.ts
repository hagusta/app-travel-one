import { LitElement, html, customElement } from 'lit-element';

@customElement('app-test-route')
export class appTestReoute extends LitElement {

    render() {
        return html`<div>
        <a href="/">home</a>
        <button
          @click="${
            (e: any) => { window.location.href = 'tests/tests1' }
            }"
        >
          Test
        </button>
      </div>
      `
    }
}