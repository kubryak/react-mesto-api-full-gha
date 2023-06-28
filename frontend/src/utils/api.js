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
      headers: this._headers,
      body: JSON.stringify(avatarLink)
    })
      .then((res) => this._checkApi(res))
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._checkApi(res))
  }

  getCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._checkApi(res))
  }

  addNewCard(item) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(item)
    })
      .then((res) => this._checkApi(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._removeLike(cardId) : this._addLike(cardId);
  }

  _addLike(cardId) {
    return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => this._checkApi(res))
  }

  _removeLike(cardId) {
    return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkApi(res))
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkApi(res))
  }
}

export const api = new Api ({
  baseUrl:'https://mesto.nomoreparties.co/v1/cohort-61', 
  headers: {
    authorization: '1de8ce3c-b342-4a59-a2d8-65337a91a4f8',
    'Content-Type': 'application/json'
  }
});
