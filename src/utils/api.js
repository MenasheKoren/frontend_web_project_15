import { token } from './auth';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.menashekoren.students.nomoreparties.sbs'
    : 'http://localhost:3001';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards/api`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  editUserInfo(data) {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  editAvatar(data) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data,
      }),
    });
  }

  createCard(data) {
    return customFetch(`${this._baseUrl}/cards/api`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return customFetch(`${this._baseUrl}/cards/api/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    });
  }

  addLikes(cardId) {
    return customFetch(`${this._baseUrl}/cards/api/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    });
  }

  removeLikes(cardId) {
    
    return customFetch(`${this._baseUrl}/cards/api/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    });
  }
}

const customFetch = (url, headers) =>
  fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export default api;
