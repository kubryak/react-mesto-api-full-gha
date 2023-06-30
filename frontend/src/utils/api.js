class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  _checkApi(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  setUserInfo({name, about}) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => this._checkApi(res))
  }

  setNewAvatar(avatarLink) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(avatarLink)
    })
      .then((res) => this._checkApi(res))
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => this._checkApi(res))
  }

  getCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => this._checkApi(res))
  }

  addNewCard(item) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(item)
    })
      .then((res) => this._checkApi(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._removeLike(cardId) : this._addLike(cardId);
  }

  _addLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._checkApi(res))
  }

  _removeLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._checkApi(res))
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._checkApi(res))
  }
}

export const api = new Api ({
  baseUrl:'https://api.qqbrk.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});
