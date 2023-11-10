import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main (props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__user">
          <button type="button" title="Обновить аватар" aria-label="Обновить аватар" className="profile__edit-avatar" onClick={props.onEditAvatar}>
            <img alt="Аватар пользователя" className="profile__avatar" src={currentUser.avatar} />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" title="Редактировать" aria-label="Редактировать" className="profile__edit-button" onClick={props.onEditProfile}></button>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" title="Добавить" aria-label="Добавить" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements" aria-label="Фотокарточки пользователя">
        <ul className="elements__card-list">
          {props.cards.map(card =>
            <Card
              key = {card._id}
              card = {card}
              name = {card.name}
              link = {card.link}
              likes = {card.likes.length}
              onCardClick = {props.onCardClick}
              onCardLike = {props.onCardLike}
              onCardDelete = {props.onCardDelete}
            />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
