import {createTripDaysItemElement} from './trip-days-item.js';

const sortArrByDays = (arr) => {
  const days = new Set();
  const sortedDays = [];

  for (const item of arr) {
    days.add(item.startTime.toLocaleString(`en-US`, {month: `short`, day: `2-digit`}));
  }

  for (const day of days) {
    sortedDays.push(arr.filter((item) => item.startTime.toLocaleString(`en-US`, {month: `short`, day: `2-digit`}) === day));
  }

  return sortedDays;
};

export const createTripDaysElement = (trips) => {
  const tripDaysElement = sortArrByDays(trips).map((dayTrips, index) => createTripDaysItemElement(dayTrips, index)).join(``);

  return `<ul class="trip-days">
    ${tripDaysElement}
  </ul>`;
};
