import { ICard } from "./interfaces/Card.interface";

class Api {
  private _url: RequestInfo;
  private _headers: HeadersInit;

  constructor(url: string, headers: HeadersInit) {
    this._url = url;
    this._headers = headers;
  }

  _getResponseData(res: Response) {
    if (!res.ok) {
      return Promise.reject(res);
    }

    return res.json();
  }

  getTasks() {
    return fetch(`${this._url}?_sort=priority&_order=DESC`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => res.json());
  }

  addTask(card: ICard) {
    return fetch(`${this._url}/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    }).then((res) => res.json());
  }

  deleteTask(id: number) {
    return fetch(`${this._url}/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => res.json());
  }

  editTask(id: number, card: ICard) {
    return fetch(`${this._url}/${id}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(card)
    }).then((res) => res.json());
  }
}

const api = new Api('http://localhost:3000/tasks', {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
)

export default api;