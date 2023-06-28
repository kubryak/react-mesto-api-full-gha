import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

export default function AddCardPopup({ isOpen, onClose, onUpdateCard, buttonText }) {

  const { values, handleChange, errors, isValid, resetForm, setIsValid } = useFormAndValidation();

  const { name, link } = values;

  useEffect(() => {
    if (!name && !link) {
      setIsValid(false)
    }
  }, [name, link])

  useEffect(() => {
    resetForm();
  }, [onClose])

  function handleSubmitCard(e) {
    e.preventDefault();
    onUpdateCard({
      name: name,
      link: link
    });
    resetForm();
  }

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitCard}
      onDisabled={!isValid}
    >
      <input
        type="text"
        className="popup__input popup__input_type_img-name"
        name="name"
        value={name || ''}
        placeholder="Название"
        id="popup__img"
        onChange={handleChange}
        required
        minLength="2"
        maxLength="30" />
      <span className="popup__input-error popup__img-error popup__input-error_active">
        {errors.name}
      </span>
      <input
        type="url"
        className="popup__input popup__input_type_img-link"
        name="link"
        value={link || ''}
        placeholder="Ссылка на картинку"
        id="popup__link"
        onChange={handleChange}
        required />
      <span className="popup__input-error popup__link-error popup__input-error_active">
        {errors.link}
      </span>

    </PopupWithForm>
  )
}
