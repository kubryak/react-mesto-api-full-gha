import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {

  const { values, handleChange, errors, isValid, resetForm, setIsValid } = useFormAndValidation();

  const { link } = values;

  useEffect(() => {
    if (!link) {
      setIsValid(false)
    }
  }, [link])

  useEffect(() => {
    resetForm();
  }, [onClose])

  function handleSubmitAvatar(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: link
    });
    resetForm();
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitAvatar}
      buttonText={buttonText}
      onDisabled={!isValid}
    >
      <input
        type="url"
        className="popup__input popup__input_type_avatar"
        name="link"
        placeholder="Ссылка на картинку"
        id="popup__avatar"
        value={link || ''}
        onChange={handleChange}
        required
      />
      <span className="popup__input-error popup__link-error popup__input-error_active">
        {errors.link}
      </span>
    </PopupWithForm>
  )
}
