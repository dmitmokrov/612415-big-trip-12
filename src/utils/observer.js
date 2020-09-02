export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(removableObserver) {
    this._observers = this._observers.filter((observer) => observer !== removableObserver);
  }

  notify(data) {
    this._observers.forEach((observer) => observer(data));
  }
}
