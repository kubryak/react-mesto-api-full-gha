export default function ImagePopup({ card, isOpen, onClose }) {

  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <section className={`popup popup_type_image ${isOpen && ('popup_opened')}`} onMouseDown={handleClickClose}>
      <div className="popup__figure-container">
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__image-description">{card.name}</figcaption>
        </figure>
        <button type="button" className="popup__close-btn popup__close-btn_type_image" onClick={onClose} />
      </div>
    </section>
  )
}
