import Observer from '../utils/observer.js';

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  getEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = events;
  }

  updateEvent(updatedEvent) {
    const index = this._events.findIndex((event) => event.id === updatedEvent.id);

    if (index === -1) {
      throw new Error(`Can't update unexistable event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      updatedEvent,
      ...this._events.slice(index + 1)
    ];
  }
}
