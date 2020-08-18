import AbstractView from './abstract.js';
import {getFormatDate} from '../utils.js';

const createTripDaysItemElement = (day, index) => {
  const date = getFormatDate(day);

  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index + 1}</span>
      <time class="day__date" datetime="2019-03-18">${date}</time>
    </div>
    <ul class="trip-events__list"></ul>
  </li>`;
};

export default class Day extends AbstractView {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createTripDaysItemElement(this._day, this._index);
  }
}
