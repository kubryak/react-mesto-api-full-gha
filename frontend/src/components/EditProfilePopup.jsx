import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();

  const { name, description } = values;

  useEffect(() => {
    if (!name && !description) {
      setIsValid(false)
    }
  }, [name, description])

  useEffect(() => {
    resetForm();
  }, [onClose])

  useEffect(() => {
    setValues({ name: currentUser.name, description: currentUser.about });
  }, [isOpen])

  function handleSubmitProfile(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
    resetForm();
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitProfile}
      buttonText={buttonText}
      onDisabled={!isValid}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Введите имя"
        id="popup__name"
        value={name || ''}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error popup__name-error popup__input-error_active">
        {errors.name}
      </span>
      <input
        type="text"
        className="popup__input popup__input_type_description"
        name="description"
        placeholder="Введите описание"
        id="popup__description"
        value={description || ''}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error popup__description-error popup__input-error_active">
        {errors.description}
      </span>
    </PopupWithForm>
  )
}
