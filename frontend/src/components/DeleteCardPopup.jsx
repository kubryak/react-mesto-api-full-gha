import PopupWithForm from "./PopupWithForm.jsx";

export default function DeleteCardPopup({ isOpen, onClose, handleCardDelete, buttonText }) {

  function handleDeleteCard(e) {
    e.preventDefault();
    handleCardDelete();
  }

  return (
    <PopupWithForm
      name={'delete-image'}
      title={'Вы уверены?'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteCard}
      buttonText={buttonText}
    />
  )
}
