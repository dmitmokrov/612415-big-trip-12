export const BLANK_EVENT = {
  type: `Bus`,
  destination: {
    name: ``,
    description: ``,
    pictures: []
  },
  startTime: Date.now(),
  endTime: Date.now(),
  price: 100,
  photos: [],
  offers: [],
  isFavorite: false
};

export const MenuItem = {
  TABLE: `TABLE`,
  STATS: `STATS`
};

export const Preposition = {
  'CHECK-IN': `in`,
  'SIGHTSEEING': `in`,
  'RESTAURANT': `in`,
  'TAXI': `to`,
  'BUS': `to`,
  'TRAIN': `to`,
  'SHIP': `to`,
  'TRANSPORT': `to`,
  'DRIVE': `to`,
  'FLIGHT': `to`
};

export const SortType = {
  DEFAULT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const UserAction = {
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`,
  EDIT_EVENT: `EDIT_EVENT`
};

export const FilterType = {
  EVERYTHING: `EVERYTHING`,
  FUTURE: `FUTURE`,
  PAST: `PAST`
};

export const EventEditMode = {
  EDIT_EVENT: `EDIT_EVENT`,
  ADD_EVENT: `ADD_EVENT`
};

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => event.startTime > Date.now()),
  [FilterType.PAST]: (events) => events.filter((event) => event.endTime < Date.now())
};

export const datePickerOptions = {
  enableTime: true,
  dateFormat: `d/m/y H:i`,
  // time_24hr: true,
};
