import React from 'react';

function ImagePopup (props) {
  return (
    <section className={`popup popup_type_photo ${props.card ? 'popup_opened' : ''}`} aria-label="Попап c увеличенной фотографией">
      <figure className="popup__img-container">
        <button type="button" title="Закрыть" aria-label="Закрыть" className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
        <figcaption className="popup__image-title">{props.card ? props.card.name : ''}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
