import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some(i => i === currentUser._id);
  const isOwn = card.owner === currentUser._id;

  function handleImageClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="photo-grid__list-item">
      <img className="photo-grid__item" src={card.link} alt={card.name} onClick={handleImageClick} />
      <div className="photo-grid__description">
        <h2 className="photo-grid__title">{card.name}</h2>
        <div className="photo-grid__like">
          <button type="button" className={`photo-grid__like-photo ${isLiked && 'photo-grid__like-photo_active'}`} onClick={handleLikeClick} />
          <p className="photo-grid__like-amount">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button type="button" className="photo-grid__delete-photo" onClick={handleCardDelete} />}
    </li>
  )
}
