import succsessfull from '../images/info-tooltip-successfull.svg';
import unsuccsessfull from '../images/info-tooltip-unsuccessfully.svg';

export default function InfoTooltip({ isOpen, onClose, isRegister }) {

  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <section className={`popup popup_type_authorization ${isOpen && ('popup_opened')}`} onMouseDown={handleClickClose}>
      <div className="popup__container">
        <img className="popup__auth-image" src={isRegister.status ? succsessfull : unsuccsessfull} alt={isRegister.message} />
        <h3 className="popup__title popup__title_type_auth">{isRegister.message}</h3>
        <button type="button" className="popup__close-btn popup__close-btn_type_image" onClick={onClose}></button>
      </div>
    </section>
  )
}