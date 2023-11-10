import React from 'react';

function PopupWithForm ({name, title, ariaLabel, isOpen, buttonText, onClose, onSubmit, children}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} aria-label={ariaLabel}>
      <div className="popup__container">
        <button type="button" title="Закрыть" aria-label="Закрыть" className="popup__close-button" onClick={onClose}/>
        <h2 className="popup__heading">{title}</h2>
        <form name={name} className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-button">{buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
