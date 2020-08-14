import { LitElement, customElement, html, property, css } from 'lit-element';
import { mainStyle } from './app-styles';

@customElement('app-confirmation')
export class reservation extends LitElement {
    @property()
    reservationDetail: any = [];

    restapi_url = 'http://localhost:5000';

    static get styles() {
        return [
            mainStyle,
            css`
        
        div {
          margin: 5px 5px 5px 5px;
        }

      `,
        ];
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
    </div>`;
    }
}
