import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen])

  function handleNameChange (e) {
    setName(e.target.value);
  }

  function handleLinkChange (e) {
    setLink(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();

    props.onUpdateCardList({
      name,
      link
    })
  }

  return (
    <PopupWithForm
      name = {'add'}
      title = {'Новое место'}
      ariaLabel = {'Попап для добавления нового места'}
      buttonText = {'Создать'}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      children = {(
        <>
          <label className="popup__label" htmlFor="title-input">
            <input id="title-input" name="name" type="text" placeholder="Название" value={name} onChange={handleNameChange} className="popup__input popup__input_type_place-name" minLength="2" maxLength="30" required />
            <span className="title-input-error"></span>
          </label>
          <label className="popup__label" htmlFor="link-input">
            <input id="link-input" name="link" type="url" placeholder="Ссылка на картинку" value={link} onChange={handleLinkChange} className="popup__input popup__input_type_place-link" required />
            <span className="link-input-error"></span>
          </label>
        </>
      )}
  />
  )
}

export default AddPlacePopup;
