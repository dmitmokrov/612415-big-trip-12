const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccessHttpStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endpoint, authorization) {
    this._endpoint = endpoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: `points`})
    .then(Api.toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endpoint}/${url}`, {method, body, headers})
    .then(Api.checkStatus())
    .then(Api.catchError());
  }

  static checkStatus(response) {
    if (response.status < SuccessHttpStatusRange.MIN && response.status > SuccessHttpStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(err) {
    throw err;
  }

  static toJSON(response) {
    return response.json();
  }
}
