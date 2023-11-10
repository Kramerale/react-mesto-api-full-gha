class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse (res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  //получить список всех карточек в виде массива (GET)
  getUserInfo () {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  //получить данные пользователя (GET)
  getInitialCards () {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  //получить карточки и данные юзера одновременно
  getPageData () {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  //добавить карточку (POST)
  addCard (data) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  //заменить данные пользователя (PATCH)
  editUserInfo (data) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  //заменить аватар (PATCH)
  editUserAvatar (data) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  //удалить карточку (DELETE)
  deleteUserCard (cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  //“залайкать” карточку (PUT)
  addCardLike (cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  //удалить лайк карточки (DELETE)
  deleteCardLike (cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: '8fe60504-aa52-4743-868a-71782c18b288',
    'Content-Type': 'application/json'
  }
});

export default api;
