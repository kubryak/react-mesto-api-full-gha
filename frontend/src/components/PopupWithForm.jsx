export default function PopupWithForm({ name, isOpen, title, onClose, buttonText, onSubmit, onDisabled, children }) {

  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <section className={`popup ${isOpen && ('popup_opened')}`} onMouseDown={handleClickClose}>
      <div className={`popup__container popup__container_type_${name}`}>
        <h3 className="popup__title">{`${title}`}</h3>
        <form className="popup__form" onSubmit={onSubmit} name={`${name}-form`} noValidate>
          <fieldset className="popup__form-set">
            {children}
            <button
              type="submit"
              className={onDisabled ? 'popup__submit-popup-btn popup__submit-popup-btn_disabled' : 'popup__submit-popup-btn'}
              disabled={onDisabled}
            >
              {buttonText || 'Сохранить'}
            </button>
          </fieldset>
        </form>
        <button type="button" className="popup__close-btn" onClick={onClose}></button>
      </div>
    </section>
  )
}
