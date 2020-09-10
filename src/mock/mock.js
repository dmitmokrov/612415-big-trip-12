import {getRandomInteger} from '../utils/common.js';

const TRIP_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`, `London`, `Paris`];
const TRIPS_COUNT = 7;

const descriptionText = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `, `Cras aliquet varius magna, non porta ligula feugiat eget. `, `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. `, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `, `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. `, `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];

const offers = [
  {
    title: `Order Uber`,
    price: 20,
  },
  {
    title: `Switch to comfort class`,
    price: 100,
  },
  {
    title: `Choose seats`,
    price: 5,
  },
  {
    title: `Travel by train`,
    price: 40,
  },
  {
    title: `Add meal`,
    price: 15,
  },
  {
    title: `Add luggage`,
    price: 50,
  },
  {
    title: `Rent a car`,
    price: 200,
  },
  {
    title: `Add breakfast`,
    price: 50,
  },
  {
    title: `Book tickets`,
    price: 40,
  },
  {
    title: `Lunch in city`,
    price: 30,
  }
];

const getRandomDate = () => Date.now() + Math.floor(Math.random() * 7 * 24 * getRandomInteger(0, 60) * 60 * 1000 - 100000000);
const getDescription = (arr) => {
  return arr.slice(0, getRandomInteger(1, arr.length - 1)).join(``);
};
const getPhotos = () => new Array(getRandomInteger(1, 5)).fill().map(() => ({
  src: `http://picsum.photos/248/152?r=${Math.random()}`,
  description: `description photo text`
}));

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const createTrip = () => {
  const startTime = getRandomDate();
  const endTime = getRandomDate();
  return {
    id: generateId(),
    type: TRIP_TYPES[getRandomInteger(0, TRIP_TYPES.length - 1)],
    price: getRandomInteger(10, 500),
    startTime: Math.min(startTime, endTime),
    endTime: Math.max(startTime, endTime),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: offers.slice(0, getRandomInteger(0, 5)),
    destination: {
      name: CITIES[getRandomInteger(0, CITIES.length - 1)],
      description: getDescription(descriptionText),
      pictures: getPhotos()
    },
  };
};

export const trips = new Array(TRIPS_COUNT).fill().map(createTrip).sort((a, b) => a.startTime - b.startTime);
