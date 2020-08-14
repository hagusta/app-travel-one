import { Router } from '@vaadin/router';
import './app-landing';
import './app-reservation';

const outlet = document.querySelector('output');
const router = new Router(outlet);
//const reserveDetail = new Array();
//addEventListener("reservation-clicked"
//  , (e: any) => { reserveDetail.push(e.detail); alert(`reservation-clicked: ${JSON.stringify(reserveDetail)}`); });


const renderReservation = (context: any, command: any) => {

  const reserveDetail: any = window.localStorage.getItem(context.params.reservationCode) || '{}'
  //console.log(context.params.reservationCode, reserveDetail)
  const view = command.component('app-reservation')
  view.reservationDetail = reserveDetail
  return view
}

const renderConfirmation = (context: any, command: any) => {
  const reserveDetail: any = window.localStorage.getItem(context.params.reservationCode) || '{}'
  //console.log(context.params.reservationCode, reserveDetail)
  const view = command.component('app-confirmation')
  view.reservationDetail = reserveDetail
  return view
}

router.setRoutes([
  {
    path: '/',
    component: 'mwc-landing',
  },
  {
    path: '/reservation/:reservationCode',
    action: renderReservation
    //component: 'app-reservation'
  },
  {
    path: '/reservation/confirm/:reservationCode',
    action: renderConfirmation
  },

]);
