import {getRandomInteger} from '../utils.js';

const TRIP_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`, `London`, `Paris`];
const TRIPS_COUNT = 7;

const descriptionText = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `, `Cras aliquet varius magna, non porta ligula feugiat eget. `, `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. `, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `, `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. `, `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];

const offers = [
  {
    title: `Order Uber`,
    price: 20,
    isChecked: Boolean(getRandomInteger(0, 1))
  },
  {
    title: `Switch to comfort class`,
    price: 100,
    isChecked: Boolean(getRandomInteger(0, 1))
  },
  {
    title: `Choose seats`,
    price: 5,
    isChecked: Boolean(getRandomInteger(0, 1))
  },
  {
    title: `Travel by train`,
    price: 40,
    isChecked: Boolean(getRandomInteger(0, 1))
  },
  {
    title: `Add meal`,
    price: 15,
    isChecked: Boolean(getRandomInteger(0, 1))
  },
  {
    title: `Add luggage`,
    price: 50,
    isChecked: Boolean(getRandomInteger(0, 1))
  },
  {
    title: `Rent a car`,
    price: 200,
    isChecked: Boolean(getRandomInteger(0, 1))
  },
  {
    title: `Add breakfast`,
    price: 50,
    isChecked: Boolean(getRandomInteger(0, 1))
  },
  {
    title: `Book tickets`,
    price: 40,
    isChecked: Boolean(getRandomInteger(0, 1))
  },
  {
    title: `Lunch in city`,
    price: 30,
    isChecked: Boolean(getRandomInteger(0, 1))
  }
];

const getRandomDate = () => Date.now() + Math.floor(Math.random() * 7 * 24 * getRandomInteger(0, 60) * 60 * 1000);
const getDescription = (arr) => {
  return arr.slice(0, getRandomInteger(1, arr.length - 1)).join(``);
};
const getPhotos = () => new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);

const createTrip = () => {
  const startTime = getRandomDate();
  const endTime = getRandomDate();
  return {
    type: TRIP_TYPES[getRandomInteger(0, TRIP_TYPES.length - 1)],
    destination: CITIES[getRandomInteger(0, CITIES.length - 1)],
    description: getDescription(descriptionText),
    startTime: Math.min(startTime, endTime),
    endTime: Math.max(startTime, endTime),
    price: getRandomInteger(10, 500),
    photos: getPhotos(),
    offers: offers.slice(0, getRandomInteger(0, 5))
  };
};

export const trips = new Array(TRIPS_COUNT).fill().map(createTrip).sort((a, b) => a.startTime - b.startTime);
export const tripDays = [...new Set(trips.map((trip) => new Date(trip.startTime).toDateString()))];
