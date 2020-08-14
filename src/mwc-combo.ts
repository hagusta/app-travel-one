import { html, LitElement, customElement, property, css } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-list';
import { StringifyOptions } from 'querystring';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { mainStyle } from './app-styles';

@customElement('mwc-combo-text')
export class comboText extends LitElement {
  @property({ type: Array }) selections: any[] = [];

  @property()
  optionLabel: any;

  @property()
  label: any;

  @property({ type: Array })
  _selections = [];

  _filter: string = '';

  @property()
  value: string = '';

  constructor() {
    super();
  }

  static get styles() {
    return [
      mainStyle,
      css`
        #combo {
          width: 300px;
          margin: 0;
          border: 0;
        }

        mwc-textfield {
          width: 300px;
          --mdc-theme-primary: var(--search-block-theme-primary);
          --mdc-theme-on-primary: var(--search-block-theme-on-primary);
          --mdc-theme-secondary: var(--search-block-theme-primary);
          --mdc-theme-on-secondary: var(--search-block-theme-on-primary);
        }

        mwc-list-item {
          border-left: 2px solid var(--search-block-theme-primary);
          border-right: 2px solid var(--search-block-theme-primary);
          border-top: 2px solid var(--search-block-theme-primary);
          position: relative;
        }

        mwc-list-item:last-of-type {
          border-bottom: 2px solid var(--search-block-theme-primary);
        }
      `,
    ];
  }

  _filterOptions(obj: any) {
    this._filter = obj.srcElement.value;
    if (this._filter != '') {
      const x: any = [];
      this.selections.forEach((i: any) => {
        i.toLowerCase().indexOf(this._filter.toLowerCase()) > -1
          ? x.push(i)
          : '';
      });
      this._selections = x.slice(0, 10);
    } else {
      this._selections = [];
    }
  }

  _leaveTextField() {
    //this._selections = [];
  }

  _optionSelected(obj: any) {
    this.value = this._selections[obj.optionId];
    const event = new CustomEvent('optionSelected', {
      bubbles: true,
      detail: this.value,
    });
    this.dispatchEvent(event);
    this._selections = [];
    //console.log(event);
  }

  listItem(str: any) {
    const idx = str.toLowerCase().indexOf(this._filter);
    const l = this._filter.length;
    //console.log(str, idx, l);
    return html`${str.substr(0, idx)}<strong>${str.substr(
      idx,
      l
    )}</strong>${str.substr(idx + l)}`;
  }

  render() {
    //console.log(this._selections.length);
    return html`<form autocomplete="off">
      <div id="combo" style="position:relative">
        <mwc-textfield
          outlined
          value=${this.value}
          label=${this.label}
          @input=${this._filterOptions}
          @focusout=${this._leaveTextField}
        >
        </mwc-textfield>
        ${this._selections.length > 0
          ? html` <mwc-list>
              ${Object.keys(this._selections).map((k: any) => {
                return html`<mwc-list-item
                  @click=${(e: any) => {
                    this._optionSelected({ event: e, optionId: k });
                  }}
                  id=${k}
                >
                  ${this.listItem(this._selections[k])}
                </mwc-list-item>`;
              })}
            </mwc-list>`
          : ''}
      </div>
    </form>`;
  }
}
