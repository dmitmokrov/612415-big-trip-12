const TRIP_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`, `London`, `Paris`];

export const Offers = [
  {
    title: `Order Uber`,
    price: 20,
    tripTypes: [`Taxi`]
  },
  {
    title: `Add luggage`,
    price: 50,
    tripTypes: [`Taxi`, `Bus`, `Flight`]
  },
  {
    title: `Rent a car`,
    price: 200,
    tripTypes: [`Transport`, `Drive`]
  },
  {
    title: `Add breakfast`,
    price: 50,
    tripTypes: [`Train`, `Ship`, `Flight`, `Sightseeing`]
  },
  {
    title: `Book tickets`,
    price: 40,
    tripTypes: [`Bus`, `Train`, `Ship`, `Flight`]
  },
  {
    title: `Lunch in city`,
    price: 30,
    tripTypes: [`Bus`, `Sightseeing`]
  }
];

const descriptionText = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `, `Cras aliquet varius magna, non porta ligula feugiat eget. `, `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. `, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `, `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. `, `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];

const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const generateTripType = () => TRIP_TYPES[getRandomInteger(0, TRIP_TYPES.length - 1)];
const generateTripDestination = () => CITIES[getRandomInteger(0, CITIES.length - 1)];
const generateOffers = (type) => {
  const possibleOffers = Offers.filter((offer) => offer.tripTypes.includes(type));
  return possibleOffers.slice(0, getRandomInteger(0, possibleOffers.length - 1));
};
const generateDescription = () => {
  let description = ``;
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    description += descriptionText[i];
  }
  return description;
};
const generatePhotos = () => {
  const photos = new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
  return photos;
};
const generateTime = (startTime) => {
  const daysGap = 2;
  const newDate = getRandomInteger(-daysGap, daysGap);
  const newHour = getRandomInteger(0, 23);
  const newMinute = getRandomInteger(0, 59);
  let day = new Date();
  day.setDate(day.getDate() + newDate);
  day.setHours(newHour, newMinute, 0, 0);

  if (startTime) {
    while (day.getTime() < startTime.getTime()) {
      day.setHours(day.getHours() + 1);
    }
  }

  return day;
};

export const createTripItem = () => {
  const type = generateTripType();
  const startTime = generateTime();
  return {
    type,
    destination: generateTripDestination(),
    offers: generateOffers(type),
    destinationInfo: {
      description: generateDescription(),
      photos: generatePhotos()
    },
    startTime,
    endTime: generateTime(startTime),
    price: getRandomInteger(20, 500)
  };
};
