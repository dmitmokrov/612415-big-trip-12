import {createTripEventsItemElement} from './trip-events-item.js';

export const createTripDaysItemElement = (trips, index) => {
  const tripDaysItemElement = trips.map((trip) => createTripEventsItemElement(trip)).join(``);
  const date = trips[0].startTime.toLocaleString(`en-US`, {month: `short`, day: `2-digit`});

  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index + 1}</span>
      <time class="day__date" datetime="2019-03-18">${date}</time>
    </div>
    <ul class="trip-events__list">
      ${tripDaysItemElement}
    </ul>
  </li>`;
};
