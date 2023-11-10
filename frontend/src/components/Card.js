import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like-button ${isLiked && 'card__like-button_active'}`
  );

  function handleClick () {
    props.onCardClick(props.card);
  }

  function handleLikeClick () {
    props.onCardLike(props.card);
  }

  function handleDeleteClick () {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      {isOwn &&
      <button type="button" title="Удалить" aria-label="Удалить" className="card__delete-button" onClick={handleDeleteClick}/>
      }
      <img className="card__image" alt={props.name} src={props.link} onClick={handleClick}/>
      <div className="card__description">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like-container">
          <button type="button" title="Нравится" aria-label="Нравится" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <p className="card__like-count">{props.likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
