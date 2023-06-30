import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header.jsx';
import Main from './Main.jsx'
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddCardPopup from './AddCardPopup.jsx';
import DeleteCardPopup from './DeleteCardPopup.jsx';

import ProtectedRouteElement from './ProtectedRoute.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import * as auth from '../utils/auth.js';

import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { CardContext } from '../contexts/CardContex.jsx';

export default function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditAddPlacePopupOpen, setEditAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});

  const isOpen = isEditProfilePopupOpen || isEditAvatarPopupOpen || isEditAddPlacePopupOpen || isImagePopupOpen || isDeleteCardPopupOpen;

  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [isRegister, setRegister] = useState(false);

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('userId');
    if (jwt) setToken(jwt)
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
    api.getCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err => console.log(err));

  }, [isLoggedIn])

  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', close)
    }
    return () => {
      document.removeEventListener('keydown', close)
    }
  }, [isOpen])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setEditAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setDeletedCard(card);
    setDeleteCardPopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setInfoTooltipPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== deletedCard._id))
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateUser(name, description) {
    setIsLoading(true);
    api.setUserInfo(name, description)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setNewAvatar(avatar)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddCard(card) {
    setIsLoading(true);
    api.addNewCard(card)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoTooltipPopupOpen(false);
  }

  function loginUser({ email, password }) {
    auth.authorize(email, password)
      .then((token) => {
        localStorage.setItem('userId', token._id);
        setToken(token);
      })
      .catch(err => console.log(err));
  }

  function registerUser({ email, password }) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setRegister({
            status: true,
            message: 'Вы успешно зарегистрировались!'
          })
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err)
        setRegister({
          status: false,
          message: 'Что-то пошло не так! Попробуйте еще раз.'
        })
      })
  }

  function signOut() {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', { replace: true });
  }

  useEffect(() => {
    handleTokenCheck();
  }, [token])

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('userId');
    if (jwt) {
      auth.checkToken(jwt)
        .then((data) => {
          setEmail(data.email)
          setLoggedIn(true);
          navigate('/', { replace: true })
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className='page'>
          <Header email={email} onSignOut={signOut} />
          <Routes>
            <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" replace />} />
            <Route path="/sign-in" element={<Login onLogin={loginUser} />} />
            <Route path="/sign-up" element={
              <Register
                onRegister={registerUser}
                onInfoTooltipClick={handleInfoTooltipClick}
              />}
            />
            <Route path="/" element={
              <ProtectedRouteElement element={Main}
                loggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleDeleteCardClick}
                onCardLike={handleCardLike}
              />}
            />
          </Routes>
          {isLoggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <AddCardPopup
            isOpen={isEditAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddCard}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            handleCardDelete={handleCardDelete}
            buttonText={isLoading ? 'Удаление...' : 'Да'}
          />
          <ImagePopup
            name={'image'}
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            name={'info-tooltip'}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegister={isRegister}
          />
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}
