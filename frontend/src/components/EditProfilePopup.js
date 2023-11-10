import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup (props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser])

  function handleNameChange (e) {
    setName(e.target.value);
  }

  function handleDescriptionChange (e) {
    setDescription(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name = {'profile'}
      title = {'Редактировать профиль'}
      ariaLabel = {'Попап для редактирования профиля'}
      buttonText = {'Сохранить'}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      children = {(
        <>
          <label className="popup__label" htmlFor="name-input">
            <input id="name-input" name="userName" type="text" placeholder="Имя" value={name || ''} onChange={handleNameChange} className="popup__input popup__input_type_name" minLength="2" maxLength="40" required />
            <span className="name-input-error"></span>
          </label>
          <label className="popup__label" htmlFor="occupation-input">
            <input id="occupation-input" name="userOccupation" type="text" placeholder="О себе" value={description || ''} onChange={handleDescriptionChange} className="popup__input popup__input_type_occupation" minLength="2" maxLength="200" required />
            <span className="occupation-input-error"></span>
          </label>
        </>
      )}
    />
  )
}

export default EditProfilePopup;
