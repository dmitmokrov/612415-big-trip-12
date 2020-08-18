import {createElement} from '../utils.js';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Нельзя создавать экземпляр класса Astract, используйте наследование`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Нужно описать метод getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
