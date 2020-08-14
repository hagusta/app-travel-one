import { html, css, LitElement, customElement, property } from 'lit-element';
import { searchParams, ISearchParams } from './app-models.js';
import { getLocations } from './app-data.js';

import '@material/mwc-button';
import '@material/mwc-fab';
import '@material/mwc-textfield';
import '@material/mwc-formfield';
import '@material/mwc-checkbox';
import './mwc-combo';
import { mainStyle } from './app-styles';

export interface ImwcMenu extends HTMLElement {
  open: boolean;
}

@customElement('mwc-search-block')
export class appSearchBlock extends LitElement {
  @property({ reflect: true })
  searchParams: any;

  @property()
  dteReturnVisible: any;

  @property()
  txtFromMenuVisible: any;

  @property()
  ports: any;

  @property()
  isFromTxtOpen: any;

  search_url = 'http://localhost:5000';

  constructor() {
    super();
    this.searchParams = new searchParams();
    this.searchParams.passanger = 1;
    this.dteReturnVisible = false;
    this.ports = [];
    this.get_from();
    this.txtFromMenuVisible = false;
    this.isFromTxtOpen = false;
    this.addEventListener;
  }

  static get styles() {
    {
      return [
        mainStyle,
        css`
          .search-block {
            display: block;
            max-width: 850px;
            margin: auto;
            padding: 0;
            border: 1px solid #04c5f5;
            background: #fff;
            align-content: center;
            position: relative;
          }

          .txtFrom,
          .txt-to {
            width: 20em;
          }

          #id-dte-return-hidden {
            visibility: hidden;
          }

          #id-dte-return-visible {
            visibility: visible;
          }

          .dte-return,
          .dte-depart {
            width: 12em;
          }

          .num-passanger {
            width: 6em;
          }

          .input {
            padding: 0.5em;
          }

          .hide-window b {
            position: absolute;
            z-index: 3;
            padding: 5px;
            top: 5px;
            right: 5px;
          }

          mwc-button,
          mwc-fab,
          mwc-textfield,
          mwc-checkbox {
            --mdc-theme-primary: var(--search-block-theme-primary);
            --mdc-theme-on-primary: var(--search-block-theme-on-primary);
            --mdc-theme-secondary: var(--search-block-theme-primary);
            --mdc-theme-on-secondary: var(--search-block-theme-on-primary);
          }

          mwc-button {
            width: 10em;
          }

          mwc-fab {
            width: 5em;
          }

          .row-1 {
            display: flex;
            justify-content: space-between;
          }

          .row-2 {
            display: flex;
            justify-content: space-between;
          }

          @media (max-width: 768px) {
            .row-1,
            .row-2 {
              display: block;
            }
          }
        `,
      ];
    }
  }

  _switchClicked(e: any) {
    console.log(e);
  }

  _searchSchedule(e: any) {
    this.dispatchEvent(
      new CustomEvent('searchClicked', { detail: this.searchParams })
    );
    //console.log(e);
  }

  _fromChanged(e: any, value: string) {
    //console.log(value);
    this.searchParams.from = value;
    //console.log(this.searchParams);
    //console.log(value, this.searchParams?.from);
  }

  _toChanged(e: any, value: string) {
    this.searchParams.to = value;
    //console.log(this.searchParams);
  }

  _dtDepartChanged(e: any, value: any) {
    this.searchParams.embarkDate = value;
    //console.log(this.searchParams);
  }

  _chkReturnChecked() {
    //console.log(this.dteReturnVisible);
    if (this.dteReturnVisible) {
      this.dteReturnVisible = false;
    } else {
      this.dteReturnVisible = true;
    }
    //console.log(this.dteReturnVisible);
  }

  _dtReturnChanged(e: any, value: any) {
    this.searchParams.embarkDate = value;
    //console.log(this.searchParams);
  }

  _setPassenger(e: any, value: Number) {
    this.searchParams.passanger = value;
    //console.log(this.searchParams);
  }

  _validate(params: any) {
    console.log(params);
  }

  async get_from() {
    const search_url = this.search_url + '/ports?';
    this.ports = await fetch(search_url).then(res => res.json());
  }

  _itemClicked(obj: any) {
    console.log(document.getElementById(obj));
    //document.getElementById(obj.id).value = obj.name;
  }

  render() {
    //console.log(this._ports.length);
    return html`
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block"
      />
      <div class="search-block" style="position:relative;">
        <div class="row-1">
          <div class="input txtFrom">
            <mwc-combo-text
              id="fromText"
              label="from"
              .selections=${this.ports}
              @optionSelected=${(e: any) => {
        this._fromChanged(e, e.detail);
      }}
            ></mwc-combo-text>
          </div>
          <div class="input btn-switch-dest">
            <mwc-fab
              mini
              icon="code"
              @click=${(e: any) => {
        this._switchClicked(e);
      }}
            ></mwc-fab>
          </div>
          <div class="input txt-to">
            <mwc-combo-text
              id="toText"
              label="to"
              .selections=${this.ports}
              @optionSelected=${(e: any) => {
        this._toChanged(e, e.detail);
      }}
            ></mwc-combo-text>
          </div>
          <div class="hide-window">
            <b class="close">X</b>
          </div>
        </div>
        <div class="row-2">
          <div class="input dte-depart">
            <mwc-textfield
              outlined
              type="date"
              label="Depart"
              class="dte-depart"
              @change=${(e: any) => {
        this._dtDepartChanged(e, e.srcElement.value);
      }}
            ></mwc-textfield>
          </div>
          <div class="input chk-withReturn">
            <mwc-formfield label="Return">
              <mwc-checkbox
                @change=${() => this._chkReturnChecked()}
              ></mwc-checkbox>
            </mwc-formfield>
          </div>
          <div
            class="input dte-return"
            id=${this.dteReturnVisible
        ? 'id-dte-return-visible'
        : 'id-dte-return-hidden'}
          >
            <mwc-textfield
              outlined
              type="date"
              label="Return"
              class="dte-return"
              @change=${(e: any) => {
        this._dtReturnChanged(e, e.srcElement.value);
      }}
            ></mwc-textfield>
          </div>
          <div class="input num-passanger">
            <mwc-textfield
              outlined
              label="passanger"
              type="number"
              class="num-of-passanger"
              min="1"
              value="1"
              class="num-passanger"
              @change=${(e: any) => {
        this._setPassenger(e, e.srcElement.value);
      }}
            ></mwc-textfield>
          </div>
          <div class="input btn-searchSchedule">
            <mwc-button
              raised
              label="Search"
              @click=${(e: any) => {
        this._searchSchedule(e);
      }}
              icon="search"
            >
            </mwc-button>
          </div>
        </div>
      </div>
    `;
  }
}
