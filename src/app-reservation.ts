import { LitElement, customElement, html, property, css } from 'lit-element';
import '@material/mwc-button';
import { mainStyle } from './app-styles';

@customElement('app-reservation')
export class reservation extends LitElement {
  @property()
  reservationDetail: any = [];

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
        
        div {
          margin: 5px 5px 5px 5px;
        }

      `,
    ];
  }

  firstUpdated() { }

  _cancelReservation(e: any) { }

  async _confirmReservation(e: any) {
    //console.log('_confirmReservation');
    const rawResponse = await fetch(this.restapi_url + '/reservation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.reservationDetail)
    }).then(function (response) { return response }, function (error) { return error });
    const content = rawResponse;

    console.log(content);
    window.location.href = 'reservation/confirmation/' + this.reservationDetail.uuid
      ;

  }

  render() {
    const res = JSON.parse(this.reservationDetail)
    return html`<div class="container">
      <div>
        <p class="reserveId">Reservation code: ${res.uuid}</p>
        <p class="from">From: ${res.from}</p>
        <p class="to">To: ${res.to}</p>
        <p class="date">Date: ${res.date}</p>
        <p class="time">Time: ${res.time}</p>
        <p class="noPassanger"># Passenger: ${res.seats}</p>
        <p fare="fare">Total fare: ${res.fare}</p>
      </div>
      <div class="action">
        <div class="cancel">
          <mwc-button
            id="cancleId"
            label="Cancel"
            raised
            @click=${this._cancelReservation}
            ></mwc-button
          >
        </div>
        <div class="confirm">
          <mwc-button
            id="confirmId"
            label="Confirm"
            raised
            @click=${this._confirmReservation}
            ></mwc-button
          >
        </div>
      </div>
    </div>`;
  }
}
