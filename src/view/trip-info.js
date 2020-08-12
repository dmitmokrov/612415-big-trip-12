import {getFormatDate} from '../utils.js';

export const createTripInfoElement = (trips) => {
  const firstLocation = trips[0];
  const lastLocation = trips[trips.length - 1];
  const dates = `${getFormatDate(firstLocation.startTime)}&nbsp;&mdash;&nbsp;${getFormatDate(lastLocation.startTime)}`;
  const uniqueLocations = [...new Set(trips.map((trip) => trip.destination))];
  const title = (uniqueLocations.length > 3) ? `${firstLocation.destination} &mdash;...&mdash; ${lastLocation.destination}` : uniqueLocations.join(`-`);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>
  </section>`;
};
