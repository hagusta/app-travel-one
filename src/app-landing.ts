import './app-search.js';
import { LitElement, html, customElement, property, css } from 'lit-element';
import '../../node_modules/@polymer/paper-card/paper-card.js';
import '@material/mwc-button';
import { mainStyle } from './app-styles';

@customElement('mwc-landing')
class appLanding extends LitElement {
  @property()
  searchResult: any;

  @property()
  searchParams: any;

  resources_url = 'http://localhost:8282';
  restapi_url = 'http://localhost:5000';

  static get styles() {
    return [
      mainStyle,
      css`
        mwc-button {
          --mdc-theme-primary: var(--search-block-theme-primary);
          --mdc-theme-on-primary: var(--search-block-theme-on-primary);
          --mdc-theme-secondary: var(--search-block-theme-primary);
          --mdc-theme-on-secondary: var(--search-block-theme-on-primary);
        }

        paper-card {
          width: 100%;
          max-width: 850px;
          margin: 15px auto 15px auto;
        }

        mwc-landing {
          align-content: center;
          margin: auto;
        }

        @media (max-width: 768px) {
          paper-card {
            width: 100%;
          }
        }

        .card-content {
          padding: 10px;
          float: left;
        }

        .card-content img {
          margin: auto;
          width: 100px;
          height: 100px;
        }

        .column {
          padding-left: 2%;
          float: left;
          width: 44%;
        }

        .card-actions {
          float: none;
        }

        .card-actions a:link {
          text-decoration: none;
        }
      `,
    ];
  }

  cards(obj: any) {
    return html` <paper-card
      heading=${obj.name}
      alt=${obj.name}
      id=${obj.uuid}
    >
      <div class="card-content">
        <div id="left" class="column">
          <img src=${this.resources_url + '/resource/kapal.' + obj.id + '.jpg'} />
        </div>
        <div id="right" class="column">
          <div>
            <p>From: ${obj.from}</p>
            <p>To: ${obj.to}</p>
          </div>
          <div>
            <p>Time: ${obj.time}</p>
          </div>
          <div>
            <p>
              Description: ${obj.description}
            </p>
          </div>
        </div>
      </div>
      <div class="card-actions">
        <mwc-button
          raised
          @click=${(e: any) => { this._clickReservation(obj) }}
          >Reserve</mwc-button
        >
      </div>
    </paper-card>`;
  }

  constructor() {
    super();
  }

  async _get_search(e: any) {
    this.searchParams = e.detail
    const url = Object.keys(e.detail)
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(e.detail[k]);
      })
      .join('&');
    const restapi_url = this.restapi_url + '/schedule?' + url;
    this.searchResult = await fetch(restapi_url).then(res => res.json());
  }

  _clickReservation(obj: any) {

    const href = 'reservation/' + obj.uuid
    const _detail_ = {
      "uuid": obj.uuid,
      "from": obj.from,
      "to": obj.to,
      "date": obj.date,
      "time": obj.time,
      "description": obj.description,
      "vasselId": obj.id,
      "fare": obj.fare,
      "seats": this.searchParams.passanger
    }
    //let reservationClicked = new CustomEvent("reservation-clicked",
    //  {
    //    detail: _detail_
    //   ,
    //    bubbles: true,
    //    composed: true
    //  });
    //this.dispatchEvent(reservationClicked);
    //console.log(window.opener)
    //window.parent ? hdnVal = obj.uuid : '';
    window.localStorage.setItem(obj.uuid, JSON.stringify(_detail_))
    window.location.href = 'reservation/' + obj.uuid
  }

  render() {
    return html`
      <body>
        <mwc-search-block id="query-block"
          @searchClicked=${(e: any) => this._get_search(e)}
        ></mwc-search-block>
        <div class="search-results" >   
        ${this.searchResult
        ? this.searchResult.map((obj: any, idx: number) => {
          //console.log(obj);
          return this.cards(obj)
        })
        : ''}
        </div>
      </body>
    `;
  }
}
