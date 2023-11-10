import React from 'react';

function InfoTooltip (props) {
  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`} aria-label={props.ariaLabel}>
      <div className="popup__container">
        <button type="button" title="Закрыть" aria-label="Закрыть" className="popup__close-button" onClick={props.onClose}/>
        <img className="popup__info-image" src={props.image} alt={props.message}/>
        <h2 className="popup__info-heading">{props.message}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
