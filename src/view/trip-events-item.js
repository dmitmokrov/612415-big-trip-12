const getFormatNumber = (num) => num.toString().padStart(2, `0`);
const getFormatTime = (time) => time.toLocaleString(`en-US`, {hour12: false, hour: `2-digit`, minute: `2-digit`});

const getTripDuration = (start, end) => {
  const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  const minutes = getFormatNumber(durationInMinutes % 60);
  if (durationInMinutes > 1440) {
    const days = getFormatNumber(Math.floor(durationInMinutes / (1440)));
    const hours = getFormatNumber(Math.floor((durationInMinutes % 1440) / 60));
    return `${days}D ${hours}H ${minutes}m`;
  } else if (durationInMinutes > 60) {
    const hours = getFormatNumber(Math.floor(durationInMinutes / 60));
    return `${hours}H ${minutes}m`;
  }
  return `${minutes}m`;
};

const createOffersItemElement = (offer) => {
  const {title, price} = offer;

  return `<li class="event__offer">
  <span class="event__offer-title">${title}</span>
  &plus;
  &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`;
};

const createOffersElement = (offers) => {
  const offersElement = offers.map((offer) => createOffersItemElement(offer)).join(``);
  return offersElement;
};

export const createTripEventsItemElement = (trip) => {
  const {type, destination, price, startTime, endTime, offers} = trip;
  const duration = getTripDuration(startTime, endTime);
  const preposition = (type === `Check-in` || type === `Sightseeing` || type === `Restaurant`) ? `in` : `to`;
  const formattedStartTime = getFormatTime(startTime);
  const formattedEndTime = getFormatTime(endTime);
  const offersElement = createOffersElement(offers);

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${preposition} ${destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${formattedStartTime}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${formattedEndTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersElement}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
