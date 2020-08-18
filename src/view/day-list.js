import AbstractView from './abstract.js';

const createTripDaysElement = () => (
  `<ul class="trip-days"></ul>`
);

export default class DayList extends AbstractView {
  getTemplate() {
    return createTripDaysElement();
  }
}
