import AbstractView from './abstract.js';

const getTripCost = (trips) => {
  if (!trips) {
    return 0;
  }

  return trips.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price) + currentValue.offers.reduce((acc, curValue) => acc + curValue.price, 0), 0);
};

const createTripCostElement = (trips) => {
  const cost = getTripCost(trips);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class TripCost extends AbstractView {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripCostElement(this._trips);
  }
}
