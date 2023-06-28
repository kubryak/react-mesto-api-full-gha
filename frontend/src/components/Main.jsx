import { useContext } from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { CardContext } from '../contexts/CardContex.jsx';

export default function Main({ onEditAvatar, onEditProfile, onCardClick, onCardDelete, onAddPlace, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardContext);

  const userName = currentUser.name;
  const userDescription = currentUser.about;
  const userAvatar = currentUser.avatar;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit">
          <button className="profile__avatar-btn" onClick={onEditAvatar}>
            <img src={userAvatar} alt="Аватар" className="profile__avatar" />
          </button>
        </div>
        <div className="profile__profile-info">
          <h1 className="profile__profile-name">{userName}</h1>
          <button type="button" className="profile__edit-profile-info-btn" onClick={onEditProfile} />
          <p className="profile__profile-description">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-mesto-btn" onClick={onAddPlace} />
      </section>
      <section className="photo-grid" aria-label="Фотографии, добавленные пользователем">
        <ul className="photo-grid__list">
          {
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            ))
          }
        </ul>
      </section>
    </main >
  )
}
