import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup (props) {
  const avatarRef = React.useRef();

  function handleSubmit (e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
    name = {'avatar'}
    title = {'Обновить аватар'}
    ariaLabel = {'Попап для редактирования аватара'}
    buttonText = {'Сохранить'}
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    onSubmit = {handleSubmit}
    children = {(
      <>
        <label className="popup__label" htmlFor="avatarlink-input">
          <input ref={avatarRef} id="avatarlink-input" name="link" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_avatar-link" required />
          <span className="avatarlink-input-error"></span>
        </label>
      </>
    )}
  />
  )
}

export default EditAvatarPopup;
